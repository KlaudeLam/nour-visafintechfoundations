import { motion } from 'motion/react';
import { Send, Download, Repeat, ShieldCheck, Plus, ChevronRight, TrendingUp, Globe2, Zap } from 'lucide-react';
import { Button } from './ui/button';

interface HomeScreenProps {
  onNavigate: (screen: 'transfer' | 'identity' | 'compliance' | 'admin') => void;
}

const currencies = [
  { code: 'USD', amount: '12,458.00', flag: '🇺🇸', change: '+2.4%' },
  { code: 'AED', amount: '8,234.50', flag: '🇦🇪', change: '+1.8%' },
  { code: 'PHP', amount: '145,890.00', flag: '🇵🇭', change: '+0.5%' },
  { code: 'USDC', amount: '5,000.00', symbol: '◈', change: '+0.0%' },
  { code: 'CBDC', amount: '2,500.00', symbol: '◉', change: '+0.1%' },
];

const transactions = [
  { id: 1, type: 'Received', from: 'Maria Santos', amount: '+$450.00', time: '2 hours ago', status: 'completed' },
  { id: 2, type: 'Sent', from: 'Freelance Payment', amount: '-$1,200.00', time: '5 hours ago', status: 'completed' },
  { id: 3, type: 'Swap', from: 'USD → AED', amount: '$500.00', time: '1 day ago', status: 'completed' },
  { id: 4, type: 'Received', from: 'Salary Deposit', amount: '+$3,500.00', time: '2 days ago', status: 'completed' },
];

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-[#0a0e27]">
      {/* Header */}
      <header className="px-4 pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-sm">Active</span>
          </div>
          <h1 className="text-2xl">
            Your Universal Money Identity is Active 🌐
          </h1>
          <p className="text-cyan-400/70 text-sm">Carry your financial identity anywhere.</p>
        </motion.div>
      </header>

      <div className="px-4 space-y-6">
        {/* DID Verification Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl p-4 border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-300">Digital Identity</span>
                  <span className="text-xs text-green-400">✓ Verified</span>
                </div>
                <p className="text-xs text-gray-500">DID: did:udwl:0x7a9f...3c2e</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('identity')}
              className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
            >
              View
            </Button>
          </div>
        </motion.div>

        {/* Multi-Currency Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg">Multi-Currency Balance</h2>
            <button className="text-cyan-400 text-sm hover:text-cyan-300">
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {currencies.map((currency, index) => (
              <motion.div
                key={currency.code}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="bg-[#0f1539] rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-500/40 transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{currency.flag || currency.symbol}</span>
                  <span className={`text-xs ${currency.change.startsWith('+') ? 'text-green-400' : 'text-gray-400'}`}>
                    {currency.change}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mb-1">{currency.code}</div>
                <div className="text-lg">{currency.amount}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <h2 className="text-lg">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-3">
            <QuickAction
              icon={<Send className="w-5 h-5" />}
              label="Send"
              onClick={() => onNavigate('transfer')}
            />
            <QuickAction
              icon={<Download className="w-5 h-5" />}
              label="Receive"
            />
            <QuickAction
              icon={<Repeat className="w-5 h-5" />}
              label="Swap"
            />
            <QuickAction
              icon={<ShieldCheck className="w-5 h-5" />}
              label="Verify"
              onClick={() => onNavigate('identity')}
            />
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3 pb-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg">Recent Transactions</h2>
            <button className="text-cyan-400 text-sm hover:text-cyan-300">
              View All
            </button>
          </div>

          <div className="space-y-2">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                className="bg-[#0f1539] rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-500/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'Received' 
                        ? 'bg-green-500/20 text-green-400' 
                        : transaction.type === 'Sent'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-cyan-500/20 text-cyan-400'
                    }`}>
                      {transaction.type === 'Received' ? <Download className="w-5 h-5" /> : 
                       transaction.type === 'Sent' ? <Send className="w-5 h-5" /> : 
                       <Repeat className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="text-sm">{transaction.from}</div>
                      <div className="text-xs text-gray-400">{transaction.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`text-sm ${
                      transaction.amount.startsWith('+') 
                        ? 'text-green-400' 
                        : 'text-white'
                    }`}>
                      {transaction.amount}
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Add Asset Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transition-shadow"
      >
        <Plus className="w-6 h-6 text-white" />
      </motion.button>

      {/* Floating Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="fixed bottom-24 left-6 right-6 pointer-events-none"
      >
        <div className="bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-xl p-3 border border-cyan-500/20 backdrop-blur-sm flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-400" />
          <p className="text-xs text-cyan-400/90">Seamless. Compliant. Borderless.</p>
        </div>
      </motion.div>
    </div>
  );
}

function QuickAction({ 
  icon, 
  label, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="bg-[#0f1539] rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-500/40 transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] flex flex-col items-center gap-2"
    >
      <div className="text-cyan-400">
        {icon}
      </div>
      <span className="text-xs text-gray-300">{label}</span>
    </motion.button>
  );
}
