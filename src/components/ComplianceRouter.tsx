import { useState } from 'react';
import { motion } from 'motion/react';
import { Network, Shield, Zap, Eye, EyeOff, Activity, CheckCircle2, ArrowRight } from 'lucide-react';
import { Switch } from './ui/switch';

const routingSteps = [
  { id: 1, name: 'User Wallet', type: 'origin', status: 'completed' },
  { id: 2, name: 'CBDC Gateway', type: 'processing', status: 'active' },
  { id: 3, name: 'VisaNet Bridge', type: 'processing', status: 'pending' },
  { id: 4, name: 'BSP Wallet', type: 'destination', status: 'pending' },
];

const complianceChecks = [
  { name: 'KYC Verification', status: 'passed', time: '0.2s' },
  { name: 'AML Screening', status: 'passed', time: '0.4s' },
  { name: 'Sanctions Check', status: 'passed', time: '0.3s' },
  { name: 'Regional Compliance', status: 'passed', time: '0.5s' },
  { name: 'Smart Contract Audit', status: 'passed', time: '0.6s' },
];

export function ComplianceRouter() {
  const [privacyMode, setPrivacyMode] = useState(true);
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="min-h-screen bg-[#0a0e27] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl mb-2">Smart Compliance Router</h1>
        <p className="text-cyan-400/70 text-sm">AI-powered transaction routing with real-time compliance.</p>
      </motion.div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Privacy Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-2xl p-6 border border-purple-500/30 shadow-[0_0_20px_rgba(147,51,234,0.1)]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {privacyMode ? (
                <EyeOff className="w-6 h-6 text-purple-400" />
              ) : (
                <Eye className="w-6 h-6 text-gray-400" />
              )}
              <div>
                <h3 className="text-sm mb-1">Privacy Mode</h3>
                <p className="text-xs text-gray-400">
                  {privacyMode 
                    ? 'Zero-knowledge verification enabled' 
                    : 'Standard verification mode'}
                </p>
              </div>
            </div>
            <Switch
              checked={privacyMode}
              onCheckedChange={setPrivacyMode}
              className="data-[state=checked]:bg-purple-500"
            />
          </div>
        </motion.div>

        {/* Transaction Flow Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0f1539] rounded-2xl p-6 border border-cyan-500/20"
        >
          <div className="flex items-center gap-2 mb-6">
            <Network className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg">Transaction Route</h2>
          </div>

          <div className="space-y-4">
            {routingSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-center gap-4">
                  {/* Step Circle */}
                  <div className={`relative flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    step.status === 'completed'
                      ? 'bg-green-500/20 border-green-500'
                      : step.status === 'active'
                      ? 'bg-cyan-500/20 border-cyan-500 animate-pulse'
                      : 'bg-gray-500/10 border-gray-500/30'
                  }`}>
                    {step.status === 'completed' ? (
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                    ) : step.status === 'active' ? (
                      <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-gray-500" />
                    )}
                  </div>

                  {/* Step Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className={`text-sm ${
                          step.status === 'completed' || step.status === 'active'
                            ? 'text-white'
                            : 'text-gray-500'
                        }`}>
                          {step.name}
                        </h3>
                        <p className={`text-xs ${
                          step.status === 'completed'
                            ? 'text-green-400'
                            : step.status === 'active'
                            ? 'text-cyan-400'
                            : 'text-gray-500'
                        }`}>
                          {step.status === 'completed' 
                            ? 'Completed' 
                            : step.status === 'active'
                            ? 'Processing...'
                            : 'Pending'}
                        </p>
                      </div>
                      {step.type !== 'destination' && (
                        <ArrowRight className={`w-5 h-5 ${
                          step.status === 'completed' || step.status === 'active'
                            ? 'text-cyan-400'
                            : 'text-gray-500'
                        }`} />
                      )}
                    </div>

                    {/* Progress Bar for Active Step */}
                    {step.status === 'active' && (
                      <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                          initial={{ width: '0%' }}
                          animate={{ width: '70%' }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Connector Line */}
                {index < routingSteps.length - 1 && (
                  <div className="ml-6 h-8 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Compliance Checks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#0f1539] rounded-2xl p-6 border border-cyan-500/20"
        >
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-green-400" />
            <h2 className="text-lg">Compliance Verification</h2>
          </div>

          <div className="space-y-3">
            {complianceChecks.map((check, index) => (
              <motion.div
                key={check.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                className="flex items-center justify-between bg-green-500/5 rounded-xl p-4 border border-green-500/20"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-sm">{check.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{check.time}</span>
                  <span className="text-xs text-green-400">Passed</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 bg-green-500/10 rounded-xl p-4 border border-green-500/30"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="text-sm text-green-400">All compliance checks passed ✅</span>
            </div>
          </motion.div>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl p-6 border border-cyan-500/30"
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg">AI Routing Insights</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0a0e27]/50 rounded-xl p-4 border border-cyan-500/20">
              <p className="text-xs text-gray-400 mb-1">Optimal Route</p>
              <p className="text-sm text-cyan-400">CBDC → VisaNet</p>
            </div>
            <div className="bg-[#0a0e27]/50 rounded-xl p-4 border border-cyan-500/20">
              <p className="text-xs text-gray-400 mb-1">Est. Time</p>
              <p className="text-sm text-cyan-400">~2.3 seconds</p>
            </div>
            <div className="bg-[#0a0e27]/50 rounded-xl p-4 border border-cyan-500/20">
              <p className="text-xs text-gray-400 mb-1">Fee Savings</p>
              <p className="text-sm text-green-400">-68%</p>
            </div>
            <div className="bg-[#0a0e27]/50 rounded-xl p-4 border border-cyan-500/20">
              <p className="text-xs text-gray-400 mb-1">Compliance Score</p>
              <p className="text-sm text-green-400">100%</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
            <p className="text-xs text-cyan-400/90">
              💡 AI detected this is a UAE → Philippines remittance. Routing optimized for BSP compliance and lowest fees.
            </p>
          </div>
        </motion.div>

        {/* Corridor Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-[#0f1539] rounded-2xl p-6 border border-cyan-500/20"
        >
          <h2 className="text-lg mb-4">Corridor Performance: UAE ↔ Philippines</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Transaction Success Rate</span>
                <span className="text-green-400">99.8%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-cyan-500" style={{ width: '99.8%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Avg. Processing Time</span>
                <span className="text-cyan-400">2.1s</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500" style={{ width: '85%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Cost Efficiency</span>
                <span className="text-green-400">92%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-cyan-500" style={{ width: '92%' }} />
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-xl text-cyan-400 mb-1">24/7</div>
              <div className="text-xs text-gray-400">Availability</div>
            </div>
            <div className="text-center">
              <div className="text-xl text-cyan-400 mb-1">156k+</div>
              <div className="text-xs text-gray-400">Transactions</div>
            </div>
            <div className="text-center">
              <div className="text-xl text-cyan-400 mb-1">$8.2M</div>
              <div className="text-xs text-gray-400">Volume</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
