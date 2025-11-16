import { motion } from 'motion/react';
import { Shield, Lock, Eye, Key, Cloud, Trash2, Download, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';

const securityFeatures = [
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'End-to-End Encryption',
    description: 'All your documents are encrypted using AES-256 before storage',
    status: 'active'
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Zero-Knowledge Proofs',
    description: 'Verify credentials without revealing actual data',
    status: 'active'
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: 'Secure Cloud Storage',
    description: 'Documents stored in encrypted, geo-redundant servers',
    status: 'active'
  },
  {
    icon: <Key className="w-6 h-6" />,
    title: 'Multi-Factor Authentication',
    description: 'Extra layer of security for account access',
    status: 'active'
  },
];

const privacyControls = [
  {
    title: 'Shared Credentials',
    description: 'Manage who can access your verified credentials',
    count: 2,
    action: 'Manage Access'
  },
  {
    title: 'Data Export',
    description: 'Download all your data in a portable format',
    count: null,
    action: 'Export Data'
  },
  {
    title: 'Revoke Permissions',
    description: 'Remove access from banks and fintechs',
    count: null,
    action: 'Manage'
  },
  {
    title: 'Delete Account',
    description: 'Permanently delete your account and all data',
    count: null,
    action: 'Delete',
    danger: true
  },
];

export function SecurityPrivacy() {
  return (
    <div className="min-h-screen bg-[#0a0e27] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl mb-2">Security & Privacy</h1>
        <p className="text-cyan-400/70 text-sm">Your data is protected and under your control</p>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Security Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-2xl p-6 border border-green-500/30"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center">
              <Shield className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h2 className="text-lg mb-1">Your Account is Secure</h2>
              <p className="text-sm text-gray-400">All security features are active</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#0a0e27]/50 rounded-xl p-3 border border-green-500/20">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-xs text-gray-400">2FA Enabled</span>
              </div>
            </div>
            <div className="bg-[#0a0e27]/50 rounded-xl p-3 border border-green-500/20">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-xs text-gray-400">Encrypted</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h2 className="text-lg">Security Features</h2>

          <div className="space-y-2">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="bg-[#0f1539] rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm">{feature.title}</h3>
                      {feature.status === 'active' && (
                        <div className="flex items-center gap-1 text-xs text-green-400">
                          <div className="w-2 h-2 rounded-full bg-green-400" />
                          Active
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data Privacy Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#0f1539] rounded-2xl p-6 border border-cyan-500/20"
        >
          <h3 className="text-sm mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-cyan-400" />
            How We Protect Your Data
          </h3>

          <div className="space-y-4 text-xs text-gray-400">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-400">1</span>
              </div>
              <div>
                <p className="text-white mb-1">Encryption at Rest & in Transit</p>
                <p>Your documents are encrypted using military-grade AES-256 encryption before being stored. They remain encrypted during transmission.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-400">2</span>
              </div>
              <div>
                <p className="text-white mb-1">Zero-Knowledge Architecture</p>
                <p>We can verify your credentials are valid without ever seeing the actual data. Only you have the keys to decrypt your information.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-400">3</span>
              </div>
              <div>
                <p className="text-white mb-1">Self-Sovereign Identity</p>
                <p>You own and control your identity. We never share your data without your explicit permission, and you can revoke access anytime.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-400">4</span>
              </div>
              <div>
                <p className="text-white mb-1">Compliance & Certifications</p>
                <p>Our platform is GDPR compliant and follows industry best practices for data protection and privacy.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Privacy Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <h2 className="text-lg">Privacy Controls</h2>

          <div className="space-y-2">
            {privacyControls.map((control, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                className={`bg-[#0f1539] rounded-xl p-4 border ${
                  control.danger 
                    ? 'border-red-500/20 hover:border-red-500/40' 
                    : 'border-cyan-500/20 hover:border-cyan-500/40'
                } transition-all`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`text-sm ${control.danger ? 'text-red-400' : ''}`}>
                        {control.title}
                      </h3>
                      {control.count !== null && (
                        <span className="text-xs text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">
                          {control.count}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{control.description}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className={`ml-4 ${
                      control.danger 
                        ? 'border-red-500/30 text-red-400 hover:bg-red-500/10' 
                        : 'border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10'
                    }`}
                  >
                    {control.action}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Download & Delete Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-2 gap-3"
        >
          <Button
            variant="outline"
            className="h-12 border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/10 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5 text-cyan-400" />
            Export My Data
          </Button>
          
          <Button
            variant="outline"
            className="h-12 border-red-500/30 hover:border-red-500/60 hover:bg-red-500/10 flex items-center justify-center gap-2"
          >
            <Trash2 className="w-5 h-5 text-red-400" />
            Delete Account
          </Button>
        </motion.div>

        {/* Security Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="bg-cyan-500/5 rounded-xl p-4 border border-cyan-500/20"
        >
          <h4 className="text-sm mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            Security Tips
          </h4>
          <ul className="text-xs text-cyan-400/80 space-y-2">
            <li>• Enable biometric authentication for quick and secure access</li>
            <li>• Regularly review which organizations have access to your credentials</li>
            <li>• Use a strong, unique password that you don't use elsewhere</li>
            <li>• Keep your 2FA method secure and up-to-date</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
