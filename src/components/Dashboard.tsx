import { motion } from 'motion/react';
import { Bell, Upload, FileCheck, CheckSquare, Wallet, Share2, Shield, User, ChevronRight, Clock, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

const notifications = [
  { id: 1, title: 'Emirates NBD Application', status: 'In Review', color: 'yellow' },
  { id: 2, title: 'ADCB Account Opening', status: 'Approved', color: 'green' },
];

const todoItems = [
  { id: 1, task: 'Upload Salary Certificate for HSBC', priority: 'high', icon: '💰' },
  { id: 2, task: 'Update Address Proof (Expires in 15 days)', priority: 'medium', icon: '🏠' },
  { id: 3, task: 'Complete Emirates NBD verification', priority: 'high', icon: '🏦' },
];

const functions = [
  { id: 'upload', label: 'Upload Document', icon: Upload, color: 'from-[#22d3ee] to-[#06b6d4]' },
  { id: 'share', label: 'Share Identity', icon: Share2, color: 'from-[#a78bfa] to-[#8b5cf6]' },
  { id: 'wallet', label: 'My Wallet', icon: Wallet, color: 'from-[#22d3ee] to-[#a78bfa]' },
  { id: 'checklist', label: 'Checklist', icon: CheckSquare, color: 'from-[#10b981] to-[#059669]' },
  { id: 'progress', label: 'Track Progress', icon: Clock, color: 'from-[#f59e0b] to-[#d97706]' },
  { id: 'security', label: 'Security', icon: Shield, color: 'from-[#ef4444] to-[#dc2626]' },
];

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="min-h-screen bg-[#0a0e27] px-4 py-6">
      {/* Header with Notification */}
      <header className="mb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#a78bfa] flex items-center justify-center shadow-[0_0_25px_rgba(34,211,238,0.4)] ring-2 ring-[#22d3ee]/20">
              <User className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl text-white">Alex Rivera</h1>
              <p className="text-[#22d3ee] text-sm">Digital Nomad</p>
            </div>
          </div>
          
          <button 
            onClick={() => onNavigate('progress')}
            className="relative"
          >
            <div className="w-11 h-11 rounded-full bg-[#0f1539] border border-[#22d3ee]/30 flex items-center justify-center hover:bg-[#22d3ee]/10 transition-all">
              <Bell className="w-5 h-5 text-[#22d3ee]" />
              {notifications.length > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                  {notifications.length}
                </div>
              )}
            </div>
          </button>
        </motion.div>

        {/* Notification Cards */}
        {notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-2"
          >
            {notifications.map((notif, index) => (
              <div
                key={notif.id}
                className={`bg-[#0f1539] rounded-xl p-3 border ${
                  notif.color === 'yellow' 
                    ? 'border-yellow-500/30 bg-yellow-500/5' 
                    : 'border-green-500/30 bg-green-500/5'
                } cursor-pointer hover:border-[#22d3ee]/50 transition-all`}
                onClick={() => onNavigate('progress')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      notif.color === 'yellow' ? 'bg-yellow-400' : 'bg-green-400'
                    } animate-pulse`} />
                    <span className="text-sm text-white">{notif.title}</span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      notif.color === 'yellow' 
                        ? 'border-yellow-500/30 text-yellow-400' 
                        : 'border-green-500/30 text-green-400'
                    }`}
                  >
                    {notif.status}
                  </Badge>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </header>

      {/* To-Do Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg text-white">To-Do List</h2>
          <span className="text-xs text-gray-400">{todoItems.length} pending</span>
        </div>

        <div className="space-y-2">
          {todoItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className={`bg-[#0f1539] rounded-xl p-4 border cursor-pointer hover:border-[#22d3ee]/50 transition-all ${
                item.priority === 'high' 
                  ? 'border-red-500/30' 
                  : 'border-[#22d3ee]/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{item.icon}</div>
                <div className="flex-1">
                  <p className="text-sm text-white">{item.task}</p>
                  {item.priority === 'high' && (
                    <div className="flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 text-red-400" />
                      <span className="text-xs text-red-400">High Priority</span>
                    </div>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Functions Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-lg text-white mb-3">Quick Actions</h2>
        
        <div className="grid grid-cols-2 gap-3">
          {functions.map((func, index) => (
            <motion.button
              key={func.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.05 }}
              onClick={() => onNavigate(func.id)}
              className="relative group"
            >
              <div className={`bg-gradient-to-br ${func.color} rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all`}>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <func.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm text-white text-center">{func.label}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-gradient-to-br from-[#22d3ee]/10 to-[#a78bfa]/10 rounded-2xl p-5 border border-[#22d3ee]/30"
      >
        <h3 className="text-sm text-white mb-4">Your Progress</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl text-[#22d3ee] mb-1">4</div>
            <div className="text-xs text-gray-400">Verified Docs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-yellow-400 mb-1">2</div>
            <div className="text-xs text-gray-400">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-green-400 mb-1">2</div>
            <div className="text-xs text-gray-400">Banks</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
