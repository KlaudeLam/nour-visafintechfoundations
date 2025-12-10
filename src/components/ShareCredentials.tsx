import { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, CheckCircle2, Share2, Search, ChevronRight, Clock, XCircle, FileCheck, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface ShareCredentialsProps {
  onNavigate: (screen: string) => void;
}

const gccBanks = [
  { id: 'enbd', name: 'Emirates NBD', country: '🇦🇪', logo: '🏦', category: 'existing' },
  { id: 'adcb', name: 'Abu Dhabi Commercial Bank', country: '🇦🇪', logo: '🏛️', category: 'existing' },
  { id: 'hsbc', name: 'HSBC UAE', country: '🇦🇪', logo: '🏦', category: 'preparing' },
  { id: 'fab', name: 'First Abu Dhabi Bank', country: '🇦🇪', logo: '🏢', category: null },
  { id: 'rakbank', name: 'RAK Bank', country: '🇦🇪', logo: '🏦', category: null },
  { id: 'sabb', name: 'SABB Bank', country: '🇸🇦', logo: '🏛️', category: null },
  { id: 'alrajhi', name: 'Al Rajhi Bank', country: '🇸🇦', logo: '🏦', category: null },
  { id: 'nbk', name: 'National Bank of Kuwait', country: '🇰🇼', logo: '🏢', category: null },
];

const commonDocuments = [
  'Passport',
  'National ID',
  'Proof of Address',
];

const bankRequirements: Record<string, string[]> = {
  enbd: ['Employment Certificate', 'Salary Certificate', 'Student ID (if student)', 'University Letter (if student)'],
  adcb: ['Bank Statement (6 months)', 'Student ID (if student)', 'Enrollment Letter (if student)'],
  hsbc: ['Visa Document', 'Salary Proof', 'Tax ID', 'Student Status Letter (if student)', 'Scholarship Letter (if applicable)'],
  fab: ['Employment Letter', 'Bank Statement (3 months)', 'Trade License Copy', 'Salary Transfer Letter', 'University Enrollment (if student)', 'Parent/Guardian Consent (if student under 21)'],
  rakbank: ['Salary Certificate', 'Employment Contract', 'Bank Statement (6 months)', 'Company Letter', 'Student ID Card (if student)', 'University Letter (if student)', 'Parent Income Proof (if student)'],
  sabb: ['Residence Proof', 'Employment Letter', 'Salary Slip (3 months)', 'IBAN Certificate', 'Tax Registration', 'University ID (if student)', 'Enrollment Certificate (if student)', 'Guardian Details (if student)'],
  alrajhi: ['Salary Certificate', 'Employer Letter', 'Saudi ID/Iqama', 'Utility Bill', 'HR Letter', 'Student ID (if student)', 'University Letter (if student)', 'Family Book (if Saudi student)'],
  nbk: ['Bank Reference Letter', 'Salary Transfer Document', 'Civil ID', 'Employment Contract', 'Company Stamp Letter', 'Student Card (if student)', 'University Certificate (if student)', 'Parent Signature (if student under 21)'],
};

const bankApplications = {
  enbd: {
    status: 'In Review',
    submitted: ['Passport', 'National ID', 'Proof of Address', 'Employment Certificate'],
    remaining: ['Salary Certificate'],
    lastUpdate: 'Received by bank - 2 days ago',
    color: 'yellow'
  },
  adcb: {
    status: 'Approved',
    submitted: ['Passport','National ID','Proof of Address','Bank Statement (6 months)', 'Student ID (if student)', 'Enrollment Letter (if student)'],
    remaining: [],
    lastUpdate: 'Account opened successfully - 5 days ago',
    color: 'green'
  },
  hsbc: {
    status: 'Preparing',
    submitted: ['Passport', 'Visa Document'],
    remaining: ['National ID', 'Proof of Address', 'Salary Proof', 'Tax ID'],
    lastUpdate: 'Draft saved - 1 day ago',
    color: 'blue'
  }
};

export function ShareCredentials({ onNavigate }: ShareCredentialsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  const filteredBanks = searchQuery
    ? gccBanks.filter(bank => 
        bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bank.country.includes(searchQuery)
      )
    : gccBanks;

  const existingBanks = filteredBanks.filter(b => b.category === 'existing');
  const preparingBanks = filteredBanks.filter(b => b.category === 'preparing');
  const availableBanks = filteredBanks.filter(b => !b.category);

  return (
    <div className="min-h-screen bg-[#0a0e27] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl mb-2 text-white">Share Your Identity</h1>
        <p className="text-[#22d3ee] text-sm">Connect with banks across the GCC</p>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search for banks in the GCC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#0f1539] border-[#22d3ee]/20 pl-12 h-14 text-white placeholder:text-gray-500"
            />
          </div>
        </motion.div>

        {/* Banks You Have Accounts With */}
        {existingBanks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <h2 className="text-lg text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              Active Accounts
            </h2>
            
            <div className="space-y-2">
              {existingBanks.map((bank) => {
                const app = bankApplications[bank.id as keyof typeof bankApplications];
                return (
                  <BankCard
                    key={bank.id}
                    bank={bank}
                    application={app}
                    onClick={() => setSelectedBank(selectedBank === bank.id ? null : bank.id)}
                    isExpanded={selectedBank === bank.id}
                    onNavigate={onNavigate}
                  />
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Banks You're Preparing Documents For */}
        {preparingBanks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <h2 className="text-lg text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              In Progress
            </h2>
            
            <div className="space-y-2">
              {preparingBanks.map((bank) => {
                const app = bankApplications[bank.id as keyof typeof bankApplications];
                return (
                  <BankCard
                    key={bank.id}
                    bank={bank}
                    application={app}
                    onClick={() => setSelectedBank(selectedBank === bank.id ? null : bank.id)}
                    isExpanded={selectedBank === bank.id}
                    onNavigate={onNavigate}
                  />
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Available Banks */}
        {availableBanks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <h2 className="text-lg text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#22d3ee]" />
              Available Banks
            </h2>
            
            <div className="grid grid-cols-1 gap-2">
              {availableBanks.map((bank) => (
                <AvailableBankCard
                  key={bank.id}
                  bank={bank}
                  onClick={() => setSelectedBank(selectedBank === bank.id ? null : bank.id)}
                  isExpanded={selectedBank === bank.id}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function BankCard({ 
  bank, 
  application, 
  onClick, 
  isExpanded,
  onNavigate 
}: { 
  bank: any; 
  application: any; 
  onClick: () => void; 
  isExpanded: boolean;
  onNavigate: (screen: string) => void;
}) {
  const allDocs = [...commonDocuments, ...(bankRequirements[bank.id] || [])];
  const progress = (application.submitted.length / allDocs.length) * 100;

  return (
    <div
      className={`bg-[#0f1539] rounded-2xl border-2 transition-all cursor-pointer ${
        application.color === 'green'
          ? 'border-green-500/30 bg-green-500/5'
          : application.color === 'yellow'
          ? 'border-yellow-500/30 bg-yellow-500/5'
          : 'border-blue-500/30 bg-blue-500/5'
      } ${isExpanded ? 'shadow-[0_0_30px_rgba(34,211,238,0.2)]' : ''}`}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#22d3ee] to-[#a78bfa] flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
            {bank.logo}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white">{bank.name}</h3>
                  <span className="text-sm">{bank.country}</span>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    application.color === 'green'
                      ? 'border-green-500/30 text-green-400'
                      : application.color === 'yellow'
                      ? 'border-yellow-500/30 text-yellow-400'
                      : 'border-blue-500/30 text-blue-400'
                  }`}
                >
                  {application.status}
                </Badge>
              </div>
              <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            </div>

            <div className="mb-2">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-[#0a0e27] rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full ${
                    application.color === 'green' ? 'bg-green-500' :
                    application.color === 'yellow' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <p className="text-xs text-gray-400">{application.lastUpdate}</p>
          </div>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pt-4 border-t border-[#22d3ee]/20"
          >
            {/* Common Documents */}
            <div className="mb-4">
              <h4 className="text-sm text-white mb-2">Common Documents</h4>
              <div className="grid grid-cols-2 gap-2">
                {commonDocuments.map((doc) => (
                  <div
                    key={doc}
                    className={`flex items-center gap-2 text-xs p-2 rounded-lg ${
                      application.submitted.includes(doc)
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-[#0a0e27] text-gray-400'
                    }`}
                  >
                    {application.submitted.includes(doc) ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                    {doc}
                  </div>
                ))}
              </div>
            </div>

            {/* Bank-Specific Documents */}
            {bankRequirements[bank.id] && (
              <div className="mb-4">
                <h4 className="text-sm text-white mb-2">Bank-Specific Documents</h4>
                <div className="grid grid-cols-2 gap-2">
                  {bankRequirements[bank.id].map((doc) => (
                    <div
                      key={doc}
                      className={`flex items-center gap-2 text-xs p-2 rounded-lg ${
                        application.submitted.includes(doc)
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-[#0a0e27] text-gray-400'
                      }`}
                    >
                      {application.submitted.includes(doc) ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : application.remaining.includes(doc) ? (
                        <Upload className="w-4 h-4 text-yellow-400" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                      {doc}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            {application.remaining.length > 0 && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('upload');
                }}
                className="w-full h-12 bg-gradient-to-r from-[#22d3ee] to-[#a78bfa] hover:from-[#06b6d4] hover:to-[#8b5cf6] text-white"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Remaining Documents ({application.remaining.length})
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function AvailableBankCard({ bank, onClick, isExpanded }: { bank: any; onClick: () => void; isExpanded: boolean }) {
  const allDocs = [...commonDocuments, ...(bankRequirements[bank.id] || [])];

  return (
    <div
      className="bg-[#0f1539] rounded-xl p-4 border border-[#22d3ee]/20 hover:border-[#22d3ee]/40 transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{bank.logo}</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white">{bank.name}</span>
              <span className="text-sm">{bank.country}</span>
            </div>
            <p className="text-xs text-gray-400">{allDocs.length} documents required</p>
          </div>
        </div>
        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-[#22d3ee]/20"
        >
          <h4 className="text-sm text-white mb-2">Required Documents</h4>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {allDocs.map((doc) => (
              <div
                key={doc}
                className="flex items-center gap-2 text-xs p-2 rounded-lg bg-[#0a0e27] text-gray-400"
              >
                <FileCheck className="w-4 h-4" />
                {doc}
              </div>
            ))}
          </div>

          <Button
            className="w-full h-12 bg-gradient-to-r from-[#22d3ee] to-[#a78bfa] hover:from-[#06b6d4] hover:to-[#8b5cf6] text-white"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Start Application
          </Button>
        </motion.div>
      )}
    </div>
  );
}
