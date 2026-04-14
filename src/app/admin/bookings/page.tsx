import { createClient } from '@/utils/supabase/server'
import BookingsTabs from './BookingsTabs'

export default async function BookingsAdminPage() {
  const supabase = await createClient()

  const { data: leads } = await supabase
    .from('leads')
    .select('id, name, email, service, date, time, message, type, created_at')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-10">
      <div className="border-b border-black/5 pb-8">
        <p className="text-[10px] font-black text-black/30 tracking-[0.3em] uppercase mb-3">Management</p>
        <h1 className="text-5xl font-black tracking-tighter text-black leading-none">
          Agency<br/>
          <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Leads</span>
        </h1>
        <p className="text-black/40 font-medium mt-4 text-sm">
          {leads?.length ?? 0} total lead{(leads?.length ?? 0) !== 1 ? 's' : ''} captured.
        </p>
      </div>

      <BookingsTabs leads={(leads ?? []) as any} />
    </div>
  )
}
