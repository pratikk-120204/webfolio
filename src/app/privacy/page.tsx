import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Webfolio Solutions — how we collect, use and protect your personal data.',
}

export default function PrivacyPage() {
  const lastUpdated = 'April 15, 2026'

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <div className="mb-16 border-b border-black/5 pb-10">
          <p className="text-[10px] font-black text-black/30 tracking-[0.3em] uppercase mb-3">Legal</p>
          <h1 className="text-5xl font-black tracking-tighter text-black leading-none mb-4">
            Privacy<br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Policy</span>
          </h1>
          <p className="text-black/40 text-sm font-medium">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-sm max-w-none space-y-10 text-black/70 font-medium leading-relaxed">

          <section>
            <h2 className="text-xl font-black text-black tracking-tighter mb-3">1. Who We Are</h2>
            <p>
              Webfolio Solutions ("we", "our", or "us") is a digital experience agency based in India. We build high-performance web applications for clients globally. Our website is <strong className="text-black">webfoliosolutions.com</strong>.
            </p>
            <p className="mt-3">
              For questions about this policy, contact us at:{' '}
              <a href="mailto:pratik@webfoliosolutions.com" className="text-black underline font-bold">
                pratik@webfoliosolutions.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-black tracking-tighter mb-3">2. What Data We Collect</h2>
            <p>When you use our website, we may collect the following:</p>
            <ul className="mt-3 space-y-2 list-none">
              {[
                'Name and email address (when you submit a contact or booking form)',
                'Message content (the details of your enquiry)',
                'Browser and device information (anonymously via analytics)',
                'IP address (for security purposes only)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">We do <strong className="text-black">not</strong> collect payment information directly — any payments are handled by third-party processors.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-black tracking-tighter mb-3">3. How We Use Your Data</h2>
            <p>We use the data we collect to:</p>
            <ul className="mt-3 space-y-2 list-none">
              {[
                'Respond to your enquiries and project requests',
                'Schedule calls and meetings you have booked',
                'Send you a one-time booking or contact confirmation email',
                'Improve our website and services',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">We do <strong className="text-black">not</strong> sell, rent, or share your personal data with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-black tracking-tighter mb-3">4. Data Storage & Security</h2>
            <p>
              Your data is stored securely in <strong className="text-black">Supabase</strong> (PostgreSQL), hosted on servers in the EU (Frankfurt). We use industry-standard encryption in transit (TLS) and at rest. Access to your data is restricted to authorised Webfolio Solutions team members only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-black tracking-tighter mb-3">5. How Long We Keep Your Data</h2>
            <p>
              We retain your enquiry and booking data for up to <strong className="text-black">24 months</strong> from the date of submission, after which it is permanently deleted unless a project relationship exists that requires longer retention.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-black tracking-tighter mb-3">6. Your Rights</h2>
            <p>Under the DPDP Act (India) and GDPR (if applicable), you have the right to:</p>
            <ul className="mt-3 space-y-2 list-none">
              {[
                'Access the personal data we hold about you',
                'Request correction of inaccurate data',
                'Request deletion of your data ("right to be forgotten")',
                'Object to our processing of your data',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email us at{' '}
              <a href="mailto:pratik@webfoliosolutions.com" className="text-black underline font-bold">
                pratik@webfoliosolutions.com
              </a>{' '}
              and we will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-black tracking-tighter mb-3">7. Cookies</h2>
            <p>
              This website uses only <strong className="text-black">functional cookies</strong> (for session authentication). We do not use tracking or advertising cookies. No cookie consent banner is required for functional-only cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-black tracking-tighter mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. The "Last updated" date at the top of this page will always reflect the most recent version. Continued use of our site after changes constitutes your acceptance of the new policy.
            </p>
          </section>

        </div>

        <div className="mt-16 pt-10 border-t border-black/5">
          <p className="text-[10px] font-black text-black/20 uppercase tracking-widest">
            © {new Date().getFullYear()} Webfolio Solutions. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
