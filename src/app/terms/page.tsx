import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Webfolio Solutions — the rules governing use of our website and services.',
}

export default function TermsPage() {
  const lastUpdated = 'April 15, 2026'

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <div className="mb-16 border-b border-black/5 pb-10">
          <p className="text-[10px] font-black text-black/30 tracking-[0.3em] uppercase mb-3">Legal</p>
          <h1 className="text-5xl font-black tracking-tighter text-black leading-none mb-4">
            Terms of<br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Service</span>
          </h1>
          <p className="text-black/40 text-sm font-medium">Last updated: {lastUpdated}</p>
        </div>

        <div className="space-y-10 text-black/70 font-medium leading-relaxed">
          {[
            {
              title: '1. Acceptance of Terms',
              body: 'By accessing and using the Webfolio Solutions website (webfoliosolutions.com), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.',
            },
            {
              title: '2. Services',
              body: 'Webfolio Solutions provides digital agency services including web application development, UI/UX design, e-commerce development, and technical consulting. Specific terms for client engagements are agreed upon separately via project contracts or statements of work.',
            },
            {
              title: '3. Use of This Website',
              body: 'You may use this website for lawful purposes only. You must not use it in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website. You must not use this website to transmit or solicit unsolicited commercial communications.',
            },
            {
              title: '4. Intellectual Property',
              body: 'All content on this website — including text, graphics, logos, images, and code — is the property of Webfolio Solutions and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without express written permission.',
            },
            {
              title: '5. Enquiries and Data',
              body: 'When you submit a contact form or booking request, you consent to us storing and processing your information for the purpose of responding to your enquiry. Refer to our Privacy Policy for full details on data handling.',
            },
            {
              title: '6. Disclaimer of Warranties',
              body: 'This website is provided "as is" without any representations or warranties, express or implied. Webfolio Solutions makes no representations or warranties in relation to this website or the information and materials provided on this website.',
            },
            {
              title: '7. Limitation of Liability',
              body: 'Webfolio Solutions will not be liable to you in respect of any business losses — including loss of or damage to profits, income, revenue, use, production, anticipated savings, business, contracts, commercial opportunities or goodwill — arising from or related to the use of this website.',
            },
            {
              title: '8. Governing Law',
              body: 'These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts of India.',
            },
            {
              title: '9. Changes to These Terms',
              body: 'We reserve the right to modify these terms at any time. The "Last updated" date will always reflect the most recent version. Continued use of the website after changes constitutes your acceptance of the new terms.',
            },
            {
              title: '10. Contact',
              body: 'If you have any questions about these Terms, please contact us at pratik@webfoliosolutions.com.',
            },
          ].map(section => (
            <section key={section.title}>
              <h2 className="text-xl font-black text-black tracking-tighter mb-3">{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-black/5 flex items-center justify-between">
          <p className="text-[10px] font-black text-black/20 uppercase tracking-widest">
            © {new Date().getFullYear()} Webfolio Solutions. All Rights Reserved.
          </p>
          <Link href="/privacy" className="text-[10px] font-black uppercase tracking-widest text-black/30 hover:text-black transition-colors">
            Privacy Policy →
          </Link>
        </div>
      </div>
    </div>
  )
}
