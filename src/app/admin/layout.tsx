import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { 
  Users, 
  BookOpen, 
  MessageSquare, 
  Calendar, 
  LayoutDashboard, 
  LogOut, 
  ImageIcon,
  Briefcase
} from 'lucide-react'
import Link from 'next/link'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-white text-black flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-black flex-shrink-0 flex flex-col pt-10 sticky top-0 h-screen">
        {/* Logo */}
        <div className="px-8 mb-12">
          <p className="text-[10px] text-white/30 font-black tracking-[0.3em] uppercase mb-1">Command Center</p>
          <h2 className="text-xl font-black text-white tracking-tighter leading-none">
            WEBFOLIO<br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>SOLUTIONS</span>
          </h2>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <SidebarLink href="/admin" icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" />
          <SidebarLink href="/admin/blog" icon={<BookOpen className="w-4 h-4" />} label="Blog" />
          <SidebarLink href="/admin/case-studies" icon={<Briefcase className="w-4 h-4" />} label="Case Studies" />
          <SidebarLink href="/admin/bookings" icon={<Calendar className="w-4 h-4" />} label="Bookings" />
          <SidebarLink href="/admin/messages" icon={<MessageSquare className="w-4 h-4" />} label="Messages" />
          <SidebarLink href="/admin/team" icon={<ImageIcon className="w-4 h-4" />} label="Team Management" />
          <SidebarLink href="/admin/users" icon={<Users className="w-4 h-4" />} label="Access Control" />
        </nav>

        <div className="p-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-black text-black">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-xs font-bold text-white truncate">{user.email}</p>
              <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">CEO / Founder</p>
            </div>
          </div>
          
          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className="flex items-center gap-2 text-white/30 hover:text-white transition-colors text-xs font-black uppercase tracking-widest w-full"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-black/5 px-10 py-5 flex items-center justify-between">
          <div className="w-px h-6 bg-black/10" />
          <p className="text-[10px] font-black text-black/30 tracking-[0.3em] uppercase">
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="p-10">
          {children}
        </div>
      </main>
    </div>
  )
}

function SidebarLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      href={href}
      className="flex items-center gap-3 px-4 py-3 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all group w-full"
    >
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
      <span className="font-bold text-xs tracking-wider uppercase">{label}</span>
    </Link>
  )
}
