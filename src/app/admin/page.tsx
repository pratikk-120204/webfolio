import { createClient } from '@/utils/supabase/server'
import { Mail, Clock } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch live counts in parallel
  const [
    { count: leadsCount },
    { count: teamCount },
    { count: projectsCount },
    { count: postsCount },
    { data: recentLeads },
  ] = await Promise.all([
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('team_members').select('*', { count: 'exact', head: true }),
    supabase.from('case_studies').select('*', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('id, name, email, created_at, type').order('created_at', { ascending: false }).limit(5),
  ])

  const totalLeads = leadsCount ?? 0
  const totalTeam = teamCount ?? 1
  const totalProjects = projectsCount ?? 0
  const totalPosts = postsCount ?? 0

  return (
    <div className="space-y-12">
      <div className="border-b border-black/5 pb-8">
        <p className="text-[10px] font-black text-black/30 tracking-[0.3em] uppercase mb-3">Agency Overview</p>
        <h1 className="text-5xl font-black tracking-tighter text-black leading-none">
          Command<br/>
          <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Center</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Active Projects" value={String(totalProjects)} />
        <DashboardCard title="Total Leads" value={String(totalLeads)} />
        <DashboardCard title="Blog Posts" value={String(totalPosts)} />
        <DashboardCard title="Team Members" value={String(totalTeam)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Leads */}
        <div className="border border-black/5 rounded-3xl p-8 hover:border-black/10 transition-all">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-black/30">Recent Inquiries</h2>
            <Link href="/admin/messages" className="text-[10px] font-black uppercase tracking-widest text-black/20 hover:text-black transition-colors">
              View All →
            </Link>
          </div>

          {!recentLeads || recentLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-black/20">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-black/10 flex items-center justify-center mb-4">
                <span className="text-xl font-black">0</span>
              </div>
              <p className="text-sm font-bold">No leads yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentLeads.map((lead) => {
                const date = lead.created_at
                  ? new Date(lead.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
                  : ''
                return (
                  <div key={lead.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-black/[0.02] transition-colors">
                    <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center font-black text-white text-xs flex-shrink-0">
                      {(lead.name as string)?.[0]?.toUpperCase() ?? '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-black truncate">{lead.name ?? 'Anonymous'}</p>
                      <p className="text-xs text-black/40 font-medium flex items-center gap-1.5">
                        <Mail className="w-3 h-3" />{lead.email}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[10px] font-black uppercase tracking-widest text-black/20">{date}</p>
                      <span className={`text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full ${
                        lead.type === 'booking' ? 'bg-black text-white' : 'bg-black/5 text-black/40'
                      }`}>
                        {lead.type === 'booking' ? 'Booking' : 'Enquiry'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="border border-black/5 rounded-3xl p-8 hover:border-black/10 transition-all">
          <h2 className="text-xs font-black uppercase tracking-widest text-black/30 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: 'View All Messages', href: '/admin/messages', desc: `${totalLeads} total submissions` },
              { label: 'Case Studies', href: '/admin/case-studies', desc: `${totalProjects} published projects` },
              { label: 'Agency Blog', href: '/admin/blog', desc: `${totalPosts} live insights` },
              { label: 'Team Management', href: '/admin/team', desc: `${totalTeam} core members` },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center justify-between p-5 rounded-2xl border border-black/5 hover:border-black/20 hover:bg-black/[0.02] transition-all group"
              >
                <div>
                  <p className="font-bold text-sm text-black">{action.label}</p>
                  <p className="text-xs text-black/30 font-medium mt-0.5">{action.desc}</p>
                </div>
                <span className="text-black/20 group-hover:text-black transition-colors font-black">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="border border-black/5 p-8 rounded-3xl hover:border-black/20 transition-all group">
      <p className="text-[10px] font-black text-black/30 uppercase tracking-widest mb-4">{title}</p>
      <div className="text-5xl font-black tracking-tighter text-black group-hover:scale-105 transition-transform origin-left">
        {value}
      </div>
    </div>
  )
}
