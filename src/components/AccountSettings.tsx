import { motion } from 'motion/react';
import { User, Mail, Phone, Globe, Key, Bell, Shield, ChevronRight, LogOut, Trash2, Edit2 } from 'lucide-react';
import { Button } from './ui/button';
import nourLogo from 'figma:asset/ff990690cdc61ad9076fa5a4ae768c279ad65993.png';

const accountInfo = {
  name: 'Alexandra Rivera',
  email: 'alexandra.rivera@email.com',
  phone: '+971 50 123 4567',
  language: 'English',
  country: 'United Arab Emirates',
  memberSince: 'October 2024',
};

const settingsSections = [
  {
    title: 'Account Information',
    items: [
      { icon: User, label: 'Full Name', value: accountInfo.name, action: 'edit' },
      { icon: Mail, label: 'Email Address', value: accountInfo.email, action: 'edit' },
      { icon: Phone, label: 'Phone Number', value: accountInfo.phone, action: 'edit' },
      { icon: Globe, label: 'Preferred Language', value: accountInfo.language, action: 'edit' },
    ]
  },
  {
    title: 'Security Settings',
    items: [
      { icon: Key, label: 'Change Password', value: '••••••••', action: 'edit' },
      { icon: Shield, label: 'Two-Factor Authentication', value: 'Enabled', action: 'toggle' },
      { icon: Key, label: 'Wallet PIN', value: '••••', action: 'edit' },
      { icon: Bell, label: 'Biometric Login', value: 'Face ID', action: 'toggle' },
    ]
  },
];

export function AccountSettings() {
  return (
    <div className="min-h-screen bg-[#0a0e27] px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <img 
          src={nourLogo} 
          alt="nour" 
          className="w-20 h-20 mx-auto mb-4 object-contain"
        />
        <h1 className="text-2xl text-white mb-2">Account Settings</h1>
        <p className="text-[#22d3ee] text-sm">Manage your profile and preferences</p>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#22d3ee]/10 to-[#a78bfa]/10 rounded-2xl p-6 border border-[#22d3ee]/30"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#a78bfa] flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.4)] ring-4 ring-[#22d3ee]/20">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl text-white mb-1">{accountInfo.name}</h2>
              <p className="text-sm text-gray-400">Member since {accountInfo.memberSince}</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-[#0f1539] border border-[#22d3ee]/30 flex items-center justify-center hover:bg-[#22d3ee]/10">
              <Edit2 className="w-5 h-5 text-[#22d3ee]" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0a0e27]/50 rounded-xl p-3 text-center">
              <div className="text-2xl text-[#22d3ee] mb-1">16</div>
              <div className="text-xs text-gray-400">Documents</div>
            </div>
            <div className="bg-[#0a0e27]/50 rounded-xl p-3 text-center">
              <div className="text-2xl text-green-400 mb-1">3</div>
              <div className="text-xs text-gray-400">Banks Connected</div>
            </div>
          </div>
        </motion.div>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + sectionIndex * 0.1 }}
            className="space-y-2"
          >
            <h3 className="text-sm text-gray-400 px-2">{section.title}</h3>
            <div className="bg-[#0f1539] rounded-2xl border border-[#22d3ee]/20 overflow-hidden">
              {section.items.map((item, index) => (
                <button
                  key={item.label}
                  className={`w-full p-4 flex items-center justify-between hover:bg-[#22d3ee]/5 transition-colors ${
                    index < section.items.length - 1 ? 'border-b border-[#22d3ee]/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#22d3ee]/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[#22d3ee]" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-white">{item.label}</div>
                      <div className="text-xs text-gray-400">{item.value}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <h3 className="text-sm text-gray-400 px-2">Notifications</h3>
          <div className="bg-[#0f1539] rounded-2xl border border-[#22d3ee]/20 overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-[#22d3ee]/10">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#22d3ee]" />
                <div>
                  <div className="text-sm text-white">Push Notifications</div>
                  <div className="text-xs text-gray-400">Get updates on applications</div>
                </div>
              </div>
              <button className="w-12 h-6 rounded-full bg-[#22d3ee] transition-all">
                <div className="w-5 h-5 bg-white rounded-full ml-6" />
              </button>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#22d3ee]" />
                <div>
                  <div className="text-sm text-white">Email Updates</div>
                  <div className="text-xs text-gray-400">Receive verification emails</div>
                </div>
              </div>
              <button className="w-12 h-6 rounded-full bg-[#22d3ee] transition-all">
                <div className="w-5 h-5 bg-white rounded-full ml-6" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-2"
        >
          <h3 className="text-sm text-red-400 px-2">Danger Zone</h3>
          <div className="bg-[#0f1539] rounded-2xl border border-red-500/20 overflow-hidden">
            <button className="w-full p-4 flex items-center justify-between hover:bg-red-500/5 transition-colors border-b border-red-500/10">
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-red-400" />
                <div className="text-left">
                  <div className="text-sm text-red-400">Log Out</div>
                  <div className="text-xs text-gray-400">Sign out from this device</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full p-4 flex items-center justify-between hover:bg-red-500/5 transition-colors">
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-red-400" />
                <div className="text-left">
                  <div className="text-sm text-red-400">Delete Account</div>
                  <div className="text-xs text-gray-400">Permanently delete all data</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </motion.div>

        {/* App Version */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-gray-500 py-4"
        >
          <p>nour Digital Identity Platform</p>
          <p className="mt-1">Version 1.0.0 • Built with security in mind</p>
        </motion.div>
      </div>
    </div>
  );
}
