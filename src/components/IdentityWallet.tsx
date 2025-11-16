import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, EyeOff, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

const documentCategories = {
  identification: {
    label: 'Identification Documents',
    icon: '🪪',
    docs: [
      { id: 1, type: 'Passport', status: 'verified', issuer: 'Government of Philippines', expiryDate: '2030-03-15', icon: '🛂' },
      { id: 2, type: 'National ID', status: 'verified', issuer: 'UAE Ministry of Interior', expiryDate: '2031-01-10', icon: '🪪' },
      { id: 3, type: 'Driver License', status: 'verified', issuer: 'UAE RTA', expiryDate: '2028-06-20', icon: '🚗' },
    ]
  },
  residence: {
    label: 'Residence & Address',
    icon: '🏠',
    docs: [
      { id: 4, type: 'Visa Document', status: 'verified', issuer: 'UAE Immigration', expiryDate: '2026-10-25', icon: '✈️' },
      { id: 5, type: 'Proof of Address', status: 'verified', issuer: 'DEWA Utility', expiryDate: null, icon: '🏠' },
      { id: 6, type: 'Tenancy Contract', status: 'verified', issuer: 'Ejari', expiryDate: '2025-12-31', icon: '📄' },
    ]
  },
  employment: {
    label: 'Employment Documents',
    icon: '💼',
    docs: [
      { id: 7, type: 'Employment Certificate', status: 'verified', issuer: 'Emirates Tech Solutions', expiryDate: null, icon: '💼' },
      { id: 8, type: 'Salary Certificate', status: 'verified', issuer: 'Emirates Tech Solutions', expiryDate: null, icon: '💰' },
      { id: 9, type: 'Offer Letter', status: 'verified', issuer: 'Emirates Tech Solutions', expiryDate: null, icon: '📨' },
    ]
  },
  financial: {
    label: 'Financial Documents',
    icon: '💰',
    docs: [
      { id: 10, type: 'Bank Statement', status: 'verified', issuer: 'Emirates NBD', expiryDate: null, icon: '🏦' },
      { id: 11, type: 'Tax ID', status: 'verified', issuer: 'Federal Tax Authority', expiryDate: null, icon: '📋' },
      { id: 12, type: 'Salary Slip', status: 'verified', issuer: 'Emirates Tech Solutions', expiryDate: null, icon: '💵' },
    ]
  },
  education: {
    label: 'Education & Certificates',
    icon: '🎓',
    docs: [
      { id: 13, type: 'Degree Certificate', status: 'verified', issuer: 'University of Manila', expiryDate: null, icon: '🎓' },
      { id: 14, type: 'Transcript', status: 'verified', issuer: 'University of Manila', expiryDate: null, icon: '📚' },
    ]
  },
  personal: {
    label: 'Personal Records',
    icon: '👤',
    docs: [
      { id: 15, type: 'Birth Certificate', status: 'verified', issuer: 'PSA Philippines', expiryDate: null, icon: '👶' },
      { id: 16, type: 'Marriage Certificate', status: 'verified', issuer: 'NSO Philippines', expiryDate: null, icon: '💍' },
    ]
  },
};

export function IdentityWallet() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<number | null>(null);

  const handleUnlock = () => {
    if (pin === '1234') { // Demo PIN
      setIsUnlocked(true);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#a78bfa] flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.4)]">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl text-white mb-2">Wallet Locked</h1>
            <p className="text-gray-400 text-sm">Enter your secure PIN to access documents</p>
          </div>

          <div className="bg-[#0f1539] rounded-2xl p-8 border border-[#22d3ee]/30">
            <div className="mb-6">
              <Input
                type="password"
                placeholder="Enter 4-digit PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value.slice(0, 4))}
                className="bg-[#0a0e27] border-[#22d3ee]/20 h-14 text-center text-2xl tracking-widest text-white"
                maxLength={4}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && pin.length === 4) {
                    handleUnlock();
                  }
                }}
              />
            </div>

            <Button
              onClick={handleUnlock}
              disabled={pin.length !== 4}
              className="w-full h-14 bg-gradient-to-r from-[#22d3ee] to-[#a78bfa] hover:from-[#06b6d4] hover:to-[#8b5cf6] text-white disabled:opacity-50"
            >
              Unlock Wallet
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Demo PIN: 1234
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const totalDocs = Object.values(documentCategories).reduce((sum, cat) => sum + cat.docs.length, 0);
  const verifiedDocs = Object.values(documentCategories).reduce(
    (sum, cat) => sum + cat.docs.filter(d => d.status === 'verified').length, 
    0
  );

  return (
    <div className="min-h-screen bg-[#0a0e27] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-white mb-2">Identity Wallet</h1>
            <p className="text-[#22d3ee] text-sm">Your secure document vault</p>
          </div>
          <button
            onClick={() => setIsUnlocked(false)}
            className="w-10 h-10 rounded-full bg-[#0f1539] border border-[#22d3ee]/30 flex items-center justify-center hover:bg-[#22d3ee]/10"
          >
            <Lock className="w-5 h-5 text-[#22d3ee]" />
          </button>
        </div>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#22d3ee]/10 to-[#a78bfa]/10 rounded-2xl p-6 border border-[#22d3ee]/30"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#22d3ee] to-[#a78bfa] flex items-center justify-center shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-lg text-white">Document Collection</h2>
              <p className="text-sm text-gray-400">{verifiedDocs} of {totalDocs} verified</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl text-[#22d3ee] mb-1">{totalDocs}</div>
              <div className="text-xs text-gray-400">Total Docs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-green-400 mb-1">{verifiedDocs}</div>
              <div className="text-xs text-gray-400">Verified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-purple-400 mb-1">{Object.keys(documentCategories).length}</div>
              <div className="text-xs text-gray-400">Categories</div>
            </div>
          </div>
        </motion.div>

        {/* Document Categories */}
        {Object.entries(documentCategories).map(([key, category], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            className="bg-[#0f1539] rounded-2xl border border-[#22d3ee]/20 overflow-hidden"
          >
            <button
              onClick={() => setExpandedCategory(expandedCategory === key ? null : key)}
              className="w-full p-5 flex items-center justify-between hover:bg-[#22d3ee]/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#22d3ee]/10 flex items-center justify-center text-2xl">
                  {category.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-white">{category.label}</h3>
                  <p className="text-xs text-gray-400">{category.docs.length} documents</p>
                </div>
              </div>
              {expandedCategory === key ? (
                <ChevronUp className="w-5 h-5 text-[#22d3ee]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedCategory === key && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="border-t border-[#22d3ee]/20 p-4"
              >
                <div className="space-y-2">
                  {category.docs.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-[#0a0e27] rounded-xl p-4 border border-[#22d3ee]/10 hover:border-[#22d3ee]/30 transition-all cursor-pointer"
                      onClick={() => setSelectedDoc(selectedDoc === doc.id ? null : doc.id)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-2xl">{doc.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-white">{doc.type}</span>
                            {doc.status === 'verified' && (
                              <Badge variant="outline" className="text-xs border-green-500/30 text-green-400">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-400">{doc.issuer}</p>
                        </div>
                      </div>

                      {selectedDoc === doc.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-3 pt-3 border-t border-[#22d3ee]/10 text-xs space-y-2"
                        >
                          <div className="flex justify-between text-gray-400">
                            <span>Issued by:</span>
                            <span className="text-white">{doc.issuer}</span>
                          </div>
                          {doc.expiryDate && (
                            <div className="flex justify-between text-gray-400">
                              <span>Expires:</span>
                              <span className="text-white">{doc.expiryDate}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-gray-400">
                            <span>Document ID:</span>
                            <span className="text-white font-mono">AB1234567</span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
