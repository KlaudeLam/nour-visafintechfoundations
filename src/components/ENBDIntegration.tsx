import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, Shield, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface ENBDIntegrationProps {
  onComplete: () => void;
}

const verificationSteps = [
  { id: 1, label: 'Secure Connection', duration: 1000 },
  { id: 2, label: 'Identity Verification', duration: 1500 },
  { id: 3, label: 'Document Validation', duration: 2000 },
  { id: 4, label: 'Risk Assessment', duration: 1500 },
  { id: 5, label: 'Account Setup', duration: 1000 },
];

export function ENBDIntegration({ onComplete }: ENBDIntegrationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentStep < verificationSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setProgress(((currentStep + 1) / verificationSteps.length) * 100);
      }, verificationSteps[currentStep]?.duration || 1000);

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
    }
  }, [currentStep, isComplete]);

  return (
    <div className="min-h-screen bg-[#0a0e27] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Bank Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 mb-4 shadow-[0_0_40px_rgba(16,185,129,0.4)]"
          >
            <Building2 className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-2xl mb-2 text-white">Emirates NBD</h1>
          <p className="text-[#22d3ee] text-sm">Account Opening via nour Digital Identity</p>
        </div>

        {!isComplete ? (
          <div className="space-y-6">
            {/* Progress Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0f1539] rounded-2xl p-6 border border-[#22d3ee]/30"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg text-white">Verification in Progress</h2>
                <span className="text-[#22d3ee]">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3 mb-2" />
              <p className="text-xs text-gray-400">
                Processing your verified credentials...
              </p>
            </motion.div>

            {/* Verification Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#0f1539] rounded-2xl p-6 border border-[#22d3ee]/20"
            >
              <div className="space-y-4">
                {verificationSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                        index < currentStep
                          ? 'bg-green-500/20 border-green-500'
                          : index === currentStep
                          ? 'bg-[#22d3ee]/20 border-[#22d3ee] animate-pulse'
                          : 'bg-gray-500/10 border-gray-500/30'
                      }`}
                    >
                      {index < currentStep ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      ) : index === currentStep ? (
                        <Clock className="w-5 h-5 text-[#22d3ee] animate-pulse" />
                      ) : (
                        <span className="text-xs text-gray-500">{step.id}</span>
                      )}
                    </div>

                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          index <= currentStep ? 'text-white' : 'text-gray-500'
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>

                    {index < currentStep && (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    )}
                    {index === currentStep && (
                      <div className="w-5 h-5 border-2 border-[#22d3ee] border-t-transparent rounded-full animate-spin" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Security Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#22d3ee]/10 to-purple-500/10 rounded-xl p-5 border border-[#22d3ee]/30"
            >
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#22d3ee] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-gray-300">
                  <p className="text-white mb-1">Secure Data Transfer</p>
                  <p>Your credentials are being securely transmitted using end-to-end encryption. Emirates NBD only receives verification proofs, not your raw documents.</p>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Success Message */}
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-3xl p-8 border border-green-500/30 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.6 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
              >
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl mb-3 text-white flex items-center justify-center gap-2">
                  <Sparkles className="w-6 h-6 text-[#22d3ee]" />
                  Verification Complete!
                </h2>
                <p className="text-gray-300 mb-6">
                  Your identity has been successfully verified with Emirates NBD
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-[#0f1539] rounded-2xl p-6 border border-green-500/20 mb-6"
              >
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl mb-2">⚡</div>
                    <div className="text-xs text-gray-400 mb-1">Processing Time</div>
                    <div className="text-lg text-[#22d3ee]">8.2 sec</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🎉</div>
                    <div className="text-xs text-gray-400 mb-1">Status</div>
                    <div className="text-lg text-green-400">Approved</div>
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Account Number</span>
                    <span className="text-white font-mono">1012345678901</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Account Type</span>
                    <span className="text-white">Premium Savings</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Verification Method</span>
                    <span className="text-[#22d3ee]">nour Digital Identity</span>
                  </div>
                </div>
              </motion.div>

              {/* Next Steps */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-[#22d3ee]/5 rounded-xl p-4 border border-[#22d3ee]/20 mb-6 text-left"
              >
                <h3 className="text-sm mb-3 text-white">Next Steps</h3>
                <div className="space-y-2 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Identity verified and account created
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-[#22d3ee]" />
                    Check your email for account activation link
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-[#22d3ee]" />
                    Set up your Emirates NBD mobile banking
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-[#22d3ee]" />
                    Visit any branch to activate your debit card
                  </div>
                </div>
              </motion.div>

              <Button
                onClick={onComplete}
                className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-[0_0_30px_rgba(16,185,129,0.4)] text-white"
              >
                Return to Dashboard
              </Button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-[#0f1539] rounded-xl p-4 border border-[#22d3ee]/20"
            >
              <p className="text-center text-xs text-gray-400">
                🚀 <span className="text-[#22d3ee]">95% faster</span> than traditional verification • <span className="text-green-400">Powered by nour</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
