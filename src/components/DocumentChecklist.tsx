import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, AlertCircle, Upload, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const documentsByProfile = {
  resident: {
    mandatory: [
      { id: 1, name: 'National ID', status: 'completed', icon: '🪪' },
      { id: 2, name: 'Proof of Address', status: 'pending', icon: '🏠' },
      { id: 3, name: 'Passport', status: 'completed', icon: '🛂' },
    ],
    optional: [
      { id: 4, name: 'Driver\'s License', status: 'not_started', icon: '🚗' },
      { id: 5, name: 'Utility Bill', status: 'not_started', icon: '💡' },
    ]
  },
  nonResident: {
    mandatory: [
      { id: 1, name: 'Passport', status: 'completed', icon: '🛂' },
      { id: 2, name: 'Visa Document', status: 'rejected', icon: '✈️' },
      { id: 3, name: 'Employment Certificate', status: 'not_started', icon: '💼' },
      { id: 4, name: 'Salary Proof', status: 'not_started', icon: '💰' },
      { id: 5, name: 'Tax ID', status: 'not_started', icon: '📋' },
      { id: 6, name: 'Proof of Address', status: 'pending', icon: '🏠' },
    ],
    optional: [
      { id: 7, name: 'Bank Statement', status: 'not_started', icon: '🏦' },
      { id: 8, name: 'Reference Letter', status: 'not_started', icon: '📨' },
    ]
  }
};

export function DocumentChecklist() {
  const [profile, setProfile] = useState<'resident' | 'nonResident'>('nonResident');
  const [country, setCountry] = useState('ae');

  const documents = documentsByProfile[profile];
  const totalMandatory = documents.mandatory.length;
  const completedMandatory = documents.mandatory.filter(d => d.status === 'completed').length;
  const progress = (completedMandatory / totalMandatory) * 100;

  return (
    <div className="min-h-screen bg-[#0a0e27] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl mb-2">Document Checklist</h1>
        <p className="text-cyan-400/70 text-sm">Track your verification progress</p>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile & Country Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0f1539] rounded-2xl p-6 border border-cyan-500/20"
        >
          <h3 className="text-sm mb-4">Your Profile</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-2 block">Residency Status</label>
              <Select value={profile} onValueChange={(value: any) => setProfile(value)}>
                <SelectTrigger className="bg-[#0a0e27] border-cyan-500/20 mt-2 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0f1539] border-cyan-500/20 text-white">
                  <SelectItem value="resident" className="text-white hover:bg-[#22d3ee]/10 cursor-pointer">Resident</SelectItem>
                  <SelectItem value="nonResident" className="text-white hover:bg-[#22d3ee]/10 cursor-pointer">Non-Resident</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-2 block">Country</label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="bg-[#0a0e27] border-cyan-500/20 mt-2 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0f1539] border-cyan-500/20 text-white">
                  <SelectItem value="ae" className="text-white hover:bg-[#22d3ee]/10 cursor-pointer">🇦🇪 UAE</SelectItem>
                  <SelectItem value="sa" className="text-white hover:bg-[#22d3ee]/10 cursor-pointer">🇸🇦 Saudi Arabia</SelectItem>
                  <SelectItem value="kw" className="text-white hover:bg-[#22d3ee]/10 cursor-pointer">🇰🇼 Kuwait</SelectItem>
                  <SelectItem value="bh" className="text-white hover:bg-[#22d3ee]/10 cursor-pointer">🇧🇭 Bahrain</SelectItem>
                  <SelectItem value="om" className="text-white hover:bg-[#22d3ee]/10 cursor-pointer">🇴🇲 Oman</SelectItem>
                  <SelectItem value="qa" className="text-white hover:bg-[#22d3ee]/10 cursor-pointer">🇶🇦 Qatar</SelectItem>
                  <SelectItem value="ph" className="text-white hover:bg-[#22d3ee]/10 cursor-pointer">🇵🇭 Philippines</SelectItem>
                  <SelectItem value="in" className="text-white hover:bg-[#22d3ee]/10 cursor-pointer">🇮🇳 India</SelectItem>
                  <SelectItem value="us" className="text-white hover:bg-[#22d3ee]/10 cursor-pointer">🇺🇸 USA</SelectItem>
                  <SelectItem value="uk" className="text-white hover:bg-[#22d3ee]/10 cursor-pointer">🇬🇧 UK</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl p-6 border border-cyan-500/30"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg mb-1">Overall Progress</h3>
              <p className="text-sm text-gray-400">{completedMandatory} of {totalMandatory} mandatory documents</p>
            </div>
            <div className="text-3xl text-cyan-400">{Math.round(progress)}%</div>
          </div>

          <div className="w-full bg-[#0a0e27] rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Non-Resident Notice */}
        {profile === 'nonResident' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-cyan-500/5 rounded-xl p-4 border border-cyan-500/20 flex items-start gap-3"
          >
            <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-cyan-400/90">
              <p className="mb-1">Non-Resident Requirements</p>
              <p>As a non-resident, you'll need additional documents including employment verification and financial proof.</p>
            </div>
          </motion.div>
        )}

        {/* Mandatory Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <h2 className="text-lg">Mandatory Documents</h2>
            <Badge variant="outline" className="border-red-500/30 text-red-400 text-xs">
              Required
            </Badge>
          </div>

          <div className="space-y-2">
            {documents.mandatory.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className={`bg-[#0f1539] rounded-xl p-4 border transition-all ${
                  doc.status === 'completed'
                    ? 'border-green-500/20'
                    : doc.status === 'pending'
                    ? 'border-yellow-500/20'
                    : doc.status === 'rejected'
                    ? 'border-red-500/20'
                    : 'border-cyan-500/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{doc.icon}</div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm">{doc.name}</h3>
                      {doc.status === 'completed' && (
                        <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">
                          ✓ Verified
                        </Badge>
                      )}
                      {doc.status === 'pending' && (
                        <Badge variant="outline" className="border-yellow-500/30 text-yellow-400 text-xs">
                          Pending
                        </Badge>
                      )}
                      {doc.status === 'rejected' && (
                        <Badge variant="outline" className="border-red-500/30 text-red-400 text-xs">
                          Rejected
                        </Badge>
                      )}
                    </div>
                    
                    {doc.status === 'not_started' && (
                      <p className="text-xs text-gray-400">Not uploaded yet</p>
                    )}
                    {doc.status === 'rejected' && (
                      <p className="text-xs text-red-400">Document needs to be re-uploaded</p>
                    )}
                    {doc.status === 'pending' && (
                      <p className="text-xs text-yellow-400">Under review (2-3 days)</p>
                    )}
                  </div>

                  {doc.status === 'completed' ? (
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  ) : doc.status === 'not_started' ? (
                    <Circle className="w-6 h-6 text-gray-500" />
                  ) : doc.status === 'rejected' ? (
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  ) : (
                    <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                  )}
                </div>

                {(doc.status === 'not_started' || doc.status === 'rejected') && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-3 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    {doc.status === 'rejected' ? 'Re-upload Document' : 'Upload Document'}
                  </Button>
                )}

                {/* Inline Guidance */}
                {doc.status === 'not_started' && profile === 'nonResident' && (
                  <div className="mt-3 pt-3 border-t border-cyan-500/10">
                    <p className="text-xs text-gray-400">
                      {doc.name === 'Employment Certificate' && '📄 Letter from employer confirming employment status and position'}
                      {doc.name === 'Salary Proof' && '💵 Last 3 months salary slips or bank statements'}
                      {doc.name === 'Tax ID' && '🆔 Tax identification number from your country of residence'}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Optional Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <h2 className="text-lg">Optional Documents</h2>
            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 text-xs">
              Recommended
            </Badge>
          </div>

          <div className="space-y-2">
            {documents.optional.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.05 }}
                className="bg-[#0f1539] rounded-xl p-4 border border-cyan-500/20 opacity-75 hover:opacity-100 transition-opacity"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{doc.icon}</div>
                  
                  <div className="flex-1">
                    <h3 className="text-sm mb-1">{doc.name}</h3>
                    <p className="text-xs text-gray-400">Helps speed up verification</p>
                  </div>

                  <Circle className="w-6 h-6 text-gray-500" />
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full mt-3 text-cyan-400 hover:bg-cyan-500/10 flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload Document
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}