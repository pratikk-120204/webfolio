import { createClient } from '@/utils/supabase/server'
import { Mail, Clock, Calendar, MessageSquare } from 'lucide-react'

export default async function MessagesPage() {
  const supabase = await createClient()

  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  const allLeads = leads ?? []
  const enquiries = allLeads.filter((l: { type: string }) => l.type === 'enquiry' || !l.type)
  const bookings = allLeads.filter((l: { type: string }) => l.type === 'booking')

  return (
    <div className="space-y-10">
      <div className="border-b border-black/5 pb-8">
        <p className="text-[10px] font-black text-black/30 tracking-[0.3em] uppercase mb-3">Inbox</p>
        <h1 className="text-5xl font-black tracking-tighter text-black leading-none">
          Messages<br/>
          <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>& Leads</span>
        </h1>
        <p className="text-black/40 font-medium mt-4 text-sm">
          {allLeads.length} total submission{allLeads.length !== 1 ? 's' : ''} from your contact forms.
        </p>
      </div>

      {error && (
        <div className="border border-red-100 bg-red-50 rounded-2xl p-6 text-red-600 text-sm font-bold">
          Could not load messages: {error.message}
        </div>
      )}

      {/* Enquiries Section */}
      <div className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-widest text-black/30 flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Enquiries ({enquiries.length})
        </h2>

        {enquiries.length === 0 ? (
          <EmptyState label="No enquiries yet." />
        ) : (
          enquiries.map((lead: Record<string, string>) => (
            <LeadCard key={lead.id} lead={lead} />
          ))
        )}
      </div>

      {/* Bookings Section */}
      <div className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-widest text-black/30 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Booking Requests ({bookings.length})
        </h2>

        {bookings.length === 0 ? (
          <EmptyState label="No booking requests yet." />
        ) : (
          bookings.map((lead: Record<string, string>) => (
            <LeadCard key={lead.id} lead={lead} isBooking />
          ))
        )}
      </div>
    </div>
  )
}

function LeadCard({ lead, isBooking = false }: { lead: Record<string, string>; isBooking?: boolean }) {
  const date = lead.created_at
    ? new Date(lead.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : 'Unknown date'

  return (
    <div className="border border-black/5 rounded-3xl p-8 hover:border-black/15 transition-all">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-black tracking-tighter text-black mb-1">
                {lead.name || 'Anonymous'}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-xs text-black/40 font-bold">
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{lead.email}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{date}</span>
                {lead.service && <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{lead.service}</span>}
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
              isBooking
                ? 'bg-black text-white border-black'
                : 'border-black/10 text-black/40'
            }`}>
              {isBooking ? 'Booking' : 'Enquiry'}
            </span>
          </div>

          {lead.message && (
            <div className="bg-black/[0.03] rounded-2xl p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-2">Message</p>
              <p className="text-sm text-black/60 font-medium leading-relaxed">"{lead.message}"</p>
            </div>
          )}

          {(lead.date || lead.time) && (
            <div className="bg-black/[0.03] rounded-2xl p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-2">Requested Schedule</p>
              <p className="text-sm font-bold text-black">{lead.date} {lead.time && `· ${lead.time}`}</p>
            </div>
          )}
        </div>

        <div className="flex md:flex-col gap-3 items-start md:items-end justify-end">
          <a
            href={`mailto:${lead.email}?subject=Re: Your enquiry – Webfolio Solutions`}
            className="px-5 py-3 bg-black hover:bg-black/80 rounded-2xl text-white font-black text-xs tracking-widest uppercase transition-all flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Reply
          </a>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="py-16 text-center border border-dashed border-black/10 rounded-3xl">
      <div className="w-12 h-12 border-2 border-dashed border-black/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <MessageSquare className="w-5 h-5 text-black/20" />
      </div>
      <p className="text-sm font-bold text-black/30">{label}</p>
    </div>
  )
}
