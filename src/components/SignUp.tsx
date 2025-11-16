import { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Shield, Globe, Check, Smartphone, Mail, Key } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import nourLogo from 'figma:asset/ff990690cdc61ad9076fa5a4ae768c279ad65993.png';

interface SignUpProps {
  onSignUp: () => void;
  onSwitchToSignIn: () => void;
}

export function SignUp({ onSignUp, onSwitchToSignIn }: SignUpProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [twoFAMethod, setTwoFAMethod] = useState<'sms' | 'email' | 'app'>('sms');
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const handleContinue = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      onSignUp();
    }
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
          <p className="text-[#22d3ee] text-sm">Your Digital Identity, Secured</p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`h-2 w-16 rounded-full transition-all ${step >= 1 ? 'bg-cyan-500' : 'bg-gray-700'}`} />
          <div className={`h-2 w-16 rounded-full transition-all ${step >= 2 ? 'bg-cyan-500' : 'bg-gray-700'}`} />
        </div>

        <div className="bg-[#0f1539] rounded-2xl p-6 border border-cyan-500/20 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
          {step === 1 ? (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-xl mb-1">Create Account</h2>
                <p className="text-sm text-gray-400">Join nour to manage your digital identity</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input
                    id="fullname"
                    placeholder="Enter your full name"
                    className="bg-[#0a0e27] border-cyan-500/20 mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="bg-[#0a0e27] border-cyan-500/20 mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="bg-[#0a0e27] border-cyan-500/20 mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative mt-2">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
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

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative mt-2">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Re-enter your password"
                      className="bg-[#0a0e27] border-cyan-500/20 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="language">Preferred Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="bg-[#0a0e27] border-cyan-500/20 mt-2 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0f1539] border-cyan-500/20 text-white">
                      <SelectItem value="en" className="text-white hover:bg-[#22d3ee]/10 cursor-pointer">English</SelectItem>
                      <SelectItem value="hi" className="text-white hover:bg-[#22d3ee]/10 cursor-pointer">Hindi (हिंदी)</SelectItem>
                      <SelectItem value="tl" className="text-white hover:bg-[#22d3ee]/10 cursor-pointer">Tagalog</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-xl mb-1">Security Setup</h2>
                <p className="text-sm text-gray-400">Protect your account with additional security</p>
              </div>

              <div className="space-y-4">
                {/* 2FA Setup */}
                <div className="bg-[#0a0e27] rounded-xl p-4 border border-cyan-500/20">
                  <Label className="mb-3 block">Two-Factor Authentication</Label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setTwoFAMethod('sms')}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                        twoFAMethod === 'sms'
                          ? 'border-cyan-500 bg-cyan-500/10'
                          : 'border-cyan-500/20 hover:border-cyan-500/40'
                      }`}
                    >
                      <Smartphone className="w-5 h-5 text-cyan-400" />
                      <div className="text-left flex-1">
                        <div className="text-sm">SMS Verification</div>
                        <div className="text-xs text-gray-400">Receive codes via text</div>
                      </div>
                      {twoFAMethod === 'sms' && <Check className="w-5 h-5 text-cyan-400" />}
                    </button>

                    <button
                      onClick={() => setTwoFAMethod('email')}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                        twoFAMethod === 'email'
                          ? 'border-cyan-500 bg-cyan-500/10'
                          : 'border-cyan-500/20 hover:border-cyan-500/40'
                      }`}
                    >
                      <Mail className="w-5 h-5 text-cyan-400" />
                      <div className="text-left flex-1">
                        <div className="text-sm">Email Verification</div>
                        <div className="text-xs text-gray-400">Receive codes via email</div>
                      </div>
                      {twoFAMethod === 'email' && <Check className="w-5 h-5 text-cyan-400" />}
                    </button>

                    <button
                      onClick={() => setTwoFAMethod('app')}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                        twoFAMethod === 'app'
                          ? 'border-cyan-500 bg-cyan-500/10'
                          : 'border-cyan-500/20 hover:border-cyan-500/40'
                      }`}
                    >
                      <Key className="w-5 h-5 text-cyan-400" />
                      <div className="text-left flex-1">
                        <div className="text-sm">Authenticator App</div>
                        <div className="text-xs text-gray-400">Use Google Authenticator</div>
                      </div>
                      {twoFAMethod === 'app' && <Check className="w-5 h-5 text-cyan-400" />}
                    </button>
                  </div>
                </div>

                {/* Biometric Setup */}
                <div className="bg-[#0a0e27] rounded-xl p-4 border border-cyan-500/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-sm">Biometric Login</div>
                        <div className="text-xs text-gray-400">Face ID / Touch ID</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setBiometricEnabled(!biometricEnabled)}
                      className={`w-12 h-6 rounded-full transition-all ${
                        biometricEnabled ? 'bg-cyan-500' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-all ${
                          biometricEnabled ? 'ml-6' : 'ml-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Privacy Statement */}
          <div className="mt-6 bg-cyan-500/5 rounded-xl p-4 border border-cyan-500/20 flex items-start gap-3">
            <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-cyan-400/90">
              <p className="mb-1">Your Privacy is Our Priority</p>
              <p>Your data is encrypted end-to-end and controlled by you. We never share your information without your explicit permission.</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            {step === 1 ? (
              <Button
                onClick={handleContinue}
                className="w-full h-12 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                Continue
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 h-12 border-cyan-500/30 hover:border-cyan-500/60"
                >
                  Back
                </Button>
                <Button
                  onClick={handleContinue}
                  className="flex-1 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                >
                  Create Account
                </Button>
              </div>
            )}

            <button
              onClick={onSwitchToSignIn}
              className="w-full text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Already have an account? <span className="underline">Sign In</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}