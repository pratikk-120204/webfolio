import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message, service, date, time } = body

    // 1. Save to Supabase (Leads Table)
    const { createClient: createSupabaseClient } = await import('@supabase/supabase-js')
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    
    const { data: insertData, error: dbError } = await supabase.from('leads').insert([
      { 
        name, 
        email, 
        message, 
        service: service || 'Contact Form', 
        booking_date: date ? `${date} ${time}` : null,
        status: 'New'
      }
    ]).select()

    if (dbError) {
      console.error('❌ Supabase Insert Failed:', dbError.message)
      return NextResponse.json({ error: 'Database Error', details: dbError.message }, { status: 500 })
    }

    // 2. Send Email via SMTP
    // Only attempt if keys are present
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 465,
          secure: Number(process.env.SMTP_PORT) === 465, // SSL for 465, TLS/STARTTLS for others
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        })

        const mailOptions = {
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: 'ceo@webfolio.solutions', // Direct to Pratik
          subject: `New Lead: ${service ? 'Booking' : 'Message'} from ${name}`,
          text: `
            Name: ${name}
            Email: ${email}
            ${service ? `Service: ${service}` : ''}
            ${date ? `Scheduled: ${date} at ${time}` : ''}
            Message: ${message}
          `,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #2563eb;">New Lead Captured</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
              ${date ? `<p><strong>Scheduled:</strong> ${date} at ${time}</p>` : ''}
              <div style="margin-top: 20px; padding: 15px; background: #f4f4f4; border-radius: 8px;">
                <strong>Message:</strong><br/>
                ${message.replace(/\n/g, '<br/>')}
              </div>
            </div>
          `,
        }

        await transporter.sendMail(mailOptions)
        console.log('✅ Agency Alert email sent successfully')

        // 3. Send Confirmation to the Client
        const clientMailOptions = {
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: email, // Sending back to the client
          subject: `Received: Your Request to Webfolio Solutions`,
          html: `
            <div style="font-family: sans-serif; padding: 40px; color: #000; background: #fff; border: 1px solid #eee;">
              <h1 style="font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase;">
                Webfolio<br/><span style="color: #666;">Solutions</span>
              </h1>
              <div style="margin-top: 30px; font-size: 16px; line-height: 1.6;">
                <p>Hello <strong>${name}</strong>,</p>
                <p>We've received your inquiry regarding <strong>${service || 'a new project'}</strong>.</p>
                <p>Our engineering team is currently reviewing your message: </p>
                <div style="padding: 15px; border-left: 4px solid #000; background: #f9f9f9; font-style: italic; margin: 20px 0;">
                  "${message}"
                </div>
                <p>We aim to respond within 24 hours to schedule a discovery session.</p>
                <p style="margin-top: 30px; font-weight: bold;">Stay Bold,</p>
                <p>The Webfolio Solutions Team</p>
              </div>
              <div style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; font-size: 10px; color: #999; letter-spacing: 1px; text-transform: uppercase;">
                Webfolio Solutions // Digital Experience Agency
              </div>
            </div>
          `,
        }

        await transporter.sendMail(clientMailOptions)
        console.log('✅ Client Confirmation email sent successfully')

      } catch (smtpError: any) {
        console.error('❌ SMTP Error:', smtpError.message)
        // We do NOT return a 500 error here because the lead is already saved in the DB
        // This makes the app more resilient
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('❌ API Global Error:', error.message)
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 })
  }
}
