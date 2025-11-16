import { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Shield, Fingerprint, Smartphone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import nourLogo from 'figma:asset/ff990690cdc61ad9076fa5a4ae768c279ad65993.png';

interface SignInProps {
  onSignIn: () => void;
  onSwitchToSignUp: () => void;
}

export function SignIn({ onSignIn, onSwitchToSignUp }: SignInProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [needs2FA, setNeeds2FA] = useState(false);
  const [useBiometric, setUseBiometric] = useState(false);

  const handleSignIn = () => {
    if (!needs2FA) {
      setNeeds2FA(true);
    } else {
      onSignIn();
    }
  };

  const handleBiometric = () => {
    onSignIn();
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <img 
            src={nourLogo} 
            alt="nour" 
            className="w-24 h-24 mx-auto mb-4 object-contain"
          />
          <p className="text-[#22d3ee] text-sm">Welcome back</p>
        </motion.div>

        <div className="bg-[#0f1539] rounded-2xl p-6 border border-cyan-500/20 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
          {!needs2FA ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-xl mb-1">Sign In</h2>
                <p className="text-sm text-gray-400">Access your digital identity</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email or Phone</Label>
                  <Input
                    id="email"
                    placeholder="your.email@example.com"
                    className="bg-[#0a0e27] border-cyan-500/20 mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative mt-2">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="bg-[#0a0e27] border-cyan-500/20 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                  Forgot password?
                </button>
              </div>

              {/* Security Badge */}
              <div className="bg-green-500/5 rounded-xl p-4 border border-green-500/20 flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-green-400/90">
                  <p>Secure Login</p>
                  <p className="text-gray-400 mt-1">Your connection is encrypted and protected</p>
                </div>
              </div>

              <Button
                onClick={handleSignIn}
                className="w-full h-12 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                Continue
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-cyan-500/20" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-[#0f1539] px-2 text-gray-400">or</span>
                </div>
              </div>

              {/* Biometric Login */}
              <Button
                onClick={handleBiometric}
                variant="outline"
                className="w-full h-12 border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/10 flex items-center gap-2"
              >
                <Fingerprint className="w-5 h-5 text-cyan-400" />
                Sign in with Biometrics
              </Button>

              <button
                onClick={onSwitchToSignUp}
                className="w-full text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Don't have an account? <span className="underline">Sign Up</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-xl mb-1">Two-Factor Authentication</h2>
                <p className="text-sm text-gray-400">Enter the verification code</p>
              </div>

              <div className="bg-[#0a0e27] rounded-xl p-6 border border-cyan-500/20">
                <div className="flex items-center justify-center mb-6">
                  <Smartphone className="w-12 h-12 text-cyan-400" />
                </div>
                <p className="text-center text-sm text-gray-400 mb-6">
                  We sent a verification code to your phone ending in ••••89
                </p>

                {/* OTP Input */}
                <div className="flex gap-2 justify-center mb-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      className="w-12 h-12 text-center bg-[#0a0e27] border border-cyan-500/20 rounded-lg focus:border-cyan-500 focus:outline-none text-lg"
                    />
                  ))}
                </div>

                <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors w-full text-center">
                  Didn't receive the code? Resend
                </button>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setNeeds2FA(false)}
                  variant="outline"
                  className="flex-1 h-12 border-cyan-500/30 hover:border-cyan-500/60"
                >
                  Back
                </Button>
                <Button
                  onClick={onSignIn}
                  className="flex-1 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                >
                  Verify
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}