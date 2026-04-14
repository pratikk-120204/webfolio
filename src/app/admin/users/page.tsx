'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserPlus, Shield, User, Mail, Search, Trash2, X } from 'lucide-react'

export default function UsersPage() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  
  const employees = [
    { id: 1, email: 'pratik@webfolio.com', role: 'Founder / Admin', status: 'Active' },
  ]

  return (
    <div className="space-y-10">
      <div className="border-b border-black/5 pb-8 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-black text-black/30 tracking-[0.3em] uppercase mb-3">Administration</p>
          <h1 className="text-5xl font-black tracking-tighter text-black leading-none">
            Access<br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Control</span>
          </h1>
        </div>
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="bg-black hover:bg-black/80 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-black text-xs tracking-widest uppercase transition-all active:scale-95"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Team Members" value="1" icon={<User className="w-5 h-5 text-black" />} />
        <StatCard label="Admins" value="1" icon={<Shield className="w-5 h-5 text-black" />} />
        <StatCard label="Pending Invites" value="0" icon={<Mail className="w-5 h-5 text-black" />} />
      </div>

      <div className="border border-black/5 rounded-3xl overflow-hidden">
        <div className="px-8 py-6 border-b border-black/5 flex items-center justify-between bg-black/[0.02]">
          <h2 className="text-xs font-black uppercase tracking-widest text-black/40">All Members</h2>
          <div className="relative w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-black/5 border border-transparent rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-black/20 transition-all font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-widest text-black/30 border-b border-black/5">
                <th className="px-8 py-4">User</th>
                <th className="px-8 py-4">Role</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-black/[0.02] transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center font-black text-white text-sm">
                        {emp.email[0].toUpperCase()}
                      </div>
                      <span className="text-sm font-bold text-black">{emp.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-black text-white border border-black">
                      {emp.role}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-black/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                      <span className="text-sm font-bold">{emp.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-black/20 hover:text-black transition-colors p-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isInviteModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md bg-white border border-black/10 rounded-3xl p-10 shadow-2xl"
          >
            <div className="flex items-start justify-between mb-8">
              <div>
                <h3 className="text-2xl font-black tracking-tighter text-black mb-1">Invite Member</h3>
                <p className="text-black/40 text-sm font-medium">Add an employee or co-founder.</p>
              </div>
              <button onClick={() => setIsInviteModalOpen(false)} className="text-black/20 hover:text-black transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-black/30">Email Address</label>
                <input
                  type="email"
                  className="w-full bg-black/5 border border-transparent rounded-2xl py-4 px-5 text-black font-medium focus:outline-none focus:border-black transition-all"
                  placeholder="person@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-black/30">Role</label>
                <select className="w-full bg-black/5 border border-transparent rounded-2xl py-4 px-5 text-black font-medium focus:outline-none focus:border-black transition-all">
                  <option>Editor</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="flex-1 bg-black/5 hover:bg-black/10 py-4 rounded-2xl font-black text-xs tracking-widest uppercase transition-colors text-black"
              >
                Cancel
              </button>
              <button className="flex-1 bg-black hover:bg-black/80 py-4 rounded-2xl font-black text-xs tracking-widest uppercase text-white transition-all">
                Send Invite
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="border border-black/5 p-8 rounded-3xl hover:border-black/20 transition-all group">
      <div className="flex justify-between items-start mb-6">
        <p className="text-[10px] font-black text-black/30 uppercase tracking-widest">{label}</p>
        <div className="p-2 bg-black/5 rounded-xl">{icon}</div>
      </div>
      <div className="text-5xl font-black tracking-tighter text-black group-hover:scale-105 transition-transform origin-left">{value}</div>
    </div>
  )
}
