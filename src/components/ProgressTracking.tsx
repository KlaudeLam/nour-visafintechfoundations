import { motion } from 'motion/react';
import { CheckCircle2, Clock, XCircle, AlertCircle, TrendingUp, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';

const timeline = [
  {
    date: '2025-11-09',
    time: '10:30 AM',
    event: 'Proof of Address uploaded',
    status: 'pending',
    description: 'Document is under review by verification team'
  },
  {
    date: '2025-11-08',
    time: '2:15 PM',
    event: 'Visa Document rejected',
    status: 'rejected',
    description: 'Document image quality too low. Please re-upload.'
  },
  {
    date: '2025-11-05',
    time: '11:20 AM',
    event: 'National ID verified',
    status: 'verified',
    description: 'Successfully verified by AI validation system'
  },
  {
    date: '2025-10-28',
    time: '3:45 PM',
    event: 'Passport verified',
    status: 'verified',
    description: 'Successfully verified by AI validation system'
  },
  {
    date: '2025-10-25',
    time: '9:00 AM',
    event: 'Account created',
    status: 'verified',
    description: 'Welcome to nour digital identity platform'
  },
];

const alerts = [
  {
    type: 'warning',
    title: 'Action Required',
    message: 'Your Visa Document was rejected. Please re-upload a clearer image.',
    time: '2 hours ago'
  },
  {
    type: 'info',
    title: 'Document Expiring Soon',
    message: 'Your National ID will expire in 90 days. Consider uploading a renewed version.',
    time: '1 day ago'
  },
  {
    type: 'success',
    title: 'Verification Complete',
    message: 'Your National ID has been successfully verified.',
    time: '4 days ago'
  },
];

export function ProgressTracking() {
  const completedSteps = timeline.filter(t => t.status === 'verified').length;
  const pendingSteps = timeline.filter(t => t.status === 'pending').length;
  const rejectedSteps = timeline.filter(t => t.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-[#0a0e27] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl mb-2">Progress & Status</h1>
        <p className="text-cyan-400/70 text-sm">Track your verification journey</p>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl p-4 border border-green-500/30">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-xs text-gray-400">Verified</span>
            </div>
            <div className="text-2xl text-green-400">{completedSteps}</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 rounded-xl p-4 border border-yellow-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-gray-400">Pending</span>
            </div>
            <div className="text-2xl text-yellow-400">{pendingSteps}</div>
          </div>

          <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 rounded-xl p-4 border border-red-500/30">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-xs text-gray-400">Rejected</span>
            </div>
            <div className="text-2xl text-red-400">{rejectedSteps}</div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl p-6 border border-cyan-500/30"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg mb-1">Verification Progress</h3>
              <p className="text-sm text-gray-400">
                {completedSteps} completed • {pendingSteps} in review • {rejectedSteps} need attention
              </p>
            </div>
            <TrendingUp className="w-6 h-6 text-cyan-400" />
          </div>

          <div className="w-full bg-[#0a0e27] rounded-full h-3 overflow-hidden mb-2">
            <div className="h-full flex">
              <div
                className="bg-green-500"
                style={{ width: `${(completedSteps / timeline.length) * 100}%` }}
              />
              <div
                className="bg-yellow-500"
                style={{ width: `${(pendingSteps / timeline.length) * 100}%` }}
              />
              <div
                className="bg-red-500"
                style={{ width: `${(rejectedSteps / timeline.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="text-right text-sm text-gray-400">
            {Math.round((completedSteps / timeline.length) * 100)}% complete
          </div>
        </motion.div>

        {/* Active Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h2 className="text-lg">Active Alerts</h2>

          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className={`rounded-xl p-4 border ${
                  alert.type === 'warning'
                    ? 'bg-red-500/5 border-red-500/20'
                    : alert.type === 'success'
                    ? 'bg-green-500/5 border-green-500/20'
                    : 'bg-cyan-500/5 border-cyan-500/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  {alert.type === 'warning' && <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />}
                  {alert.type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />}
                  {alert.type === 'info' && <Clock className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />}
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm">{alert.title}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          alert.type === 'warning'
                            ? 'border-red-500/30 text-red-400'
                            : alert.type === 'success'
                            ? 'border-green-500/30 text-green-400'
                            : 'border-cyan-500/30 text-cyan-400'
                        }`}
                      >
                        {alert.type}
                      </Badge>
                    </div>
                    <p className={`text-xs mb-2 ${
                      alert.type === 'warning' ? 'text-red-400/90' :
                      alert.type === 'success' ? 'text-green-400/90' :
                      'text-cyan-400/90'
                    }`}>
                      {alert.message}
                    </p>
                    <div className="text-xs text-gray-500">{alert.time}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg">Activity Timeline</h2>
          </div>

          <div className="space-y-4">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                className="flex gap-4"
              >
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      item.status === 'verified'
                        ? 'bg-green-500/20 border-green-500'
                        : item.status === 'pending'
                        ? 'bg-yellow-500/20 border-yellow-500'
                        : 'bg-red-500/20 border-red-500'
                    }`}
                  >
                    {item.status === 'verified' && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                    {item.status === 'pending' && <Clock className="w-5 h-5 text-yellow-400" />}
                    {item.status === 'rejected' && <XCircle className="w-5 h-5 text-red-400" />}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-16 bg-gradient-to-b from-cyan-500/50 to-transparent" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="bg-[#0f1539] rounded-xl p-4 border border-cyan-500/20">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm">{item.event}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          item.status === 'verified'
                            ? 'border-green-500/30 text-green-400'
                            : item.status === 'pending'
                            ? 'border-yellow-500/30 text-yellow-400'
                            : 'border-red-500/30 text-red-400'
                        }`}
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{item.description}</p>
                    <div className="text-xs text-gray-500">
                      {item.date} at {item.time}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
