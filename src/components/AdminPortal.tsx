import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Users, Globe2, Code, CheckCircle2, AlertCircle, Activity } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from './ui/button';

const transactionData = [
  { month: 'Jan', transactions: 4200, volume: 1200000 },
  { month: 'Feb', transactions: 5100, volume: 1450000 },
  { month: 'Mar', transactions: 4800, volume: 1380000 },
  { month: 'Apr', transactions: 6200, volume: 1820000 },
  { month: 'May', transactions: 7500, volume: 2150000 },
  { month: 'Jun', transactions: 8900, volume: 2580000 },
];

const corridorStats = [
  { route: 'UAE → Philippines', transactions: 12450, volume: '$3.2M', success: '99.8%', trend: '+12%' },
  { route: 'Philippines → UAE', transactions: 8920, volume: '$2.1M', success: '99.5%', trend: '+8%' },
  { route: 'UAE → USA', transactions: 5630, volume: '$1.8M', success: '99.9%', trend: '+15%' },
  { route: 'USA → Philippines', transactions: 4210, volume: '$1.2M', success: '99.7%', trend: '+6%' },
];

const integrationPartners = [
  { name: 'Emirates NBD', status: 'active', connections: 1240, apiCalls: '156k/mo' },
  { name: 'HSBC UAE', status: 'active', connections: 890, apiCalls: '98k/mo' },
  { name: 'BPI Philippines', status: 'active', connections: 2100, apiCalls: '245k/mo' },
  { name: 'UnionBank PH', status: 'active', connections: 1560, apiCalls: '178k/mo' },
];

export function AdminPortal() {
  return (
    <div className="min-h-screen bg-[#0a0e27] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl mb-2">Partner Portal</h1>
        <p className="text-cyan-400/70 text-sm">Analytics & Integration Dashboard for Banks & Fintechs</p>
      </motion.div>

      <div className="space-y-6 max-w-7xl mx-auto">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 rounded-xl p-4 border border-cyan-500/30"
          >
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              <span className="text-xs text-green-400">+12%</span>
            </div>
            <div className="text-2xl text-cyan-400 mb-1">48.2k</div>
            <div className="text-xs text-gray-400">Total Transactions</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl p-4 border border-purple-500/30"
          >
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span className="text-xs text-green-400">+8%</span>
            </div>
            <div className="text-2xl text-purple-400 mb-1">12.8k</div>
            <div className="text-xs text-gray-400">Active Users</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl p-4 border border-green-500/30"
          >
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-xs text-green-400">+18%</span>
            </div>
            <div className="text-2xl text-green-400 mb-1">$8.3M</div>
            <div className="text-xs text-gray-400">Transaction Volume</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-xl p-4 border border-orange-500/30"
          >
            <div className="flex items-center justify-between mb-2">
              <Globe2 className="w-5 h-5 text-orange-400" />
              <span className="text-xs text-green-400">+5%</span>
            </div>
            <div className="text-2xl text-orange-400 mb-1">15</div>
            <div className="text-xs text-gray-400">Active Corridors</div>
          </motion.div>
        </div>

        {/* Transaction Heatmap & Volume Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0f1539] rounded-2xl p-6 border border-cyan-500/20"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg">Transaction Analytics</h2>
            </div>
            <Button variant="outline" size="sm" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
              Export Data
            </Button>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={transactionData}>
                <defs>
                  <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f1539', 
                    border: '1px solid rgba(34, 211, 238, 0.2)',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="transactions" 
                  stroke="#22d3ee" 
                  strokeWidth={2}
                  fill="url(#colorTransactions)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Corridor Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0f1539] rounded-2xl p-6 border border-cyan-500/20"
        >
          <div className="flex items-center gap-2 mb-6">
            <Globe2 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg">Corridor Performance</h2>
          </div>

          <div className="space-y-3">
            {corridorStats.map((corridor, index) => (
              <motion.div
                key={corridor.route}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="bg-[#0a0e27]/50 rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-500/40 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm mb-1">{corridor.route}</h3>
                    <p className="text-xs text-gray-400">{corridor.transactions.toLocaleString()} transactions</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-cyan-400 mb-1">{corridor.volume}</div>
                    <div className="text-xs text-green-400">{corridor.trend}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Success Rate</span>
                  <span className="text-xs text-green-400">{corridor.success}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SDK Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-2xl p-6 border border-purple-500/30"
        >
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg">Connect via UDWL SDK</h2>
          </div>

          <p className="text-sm text-gray-400 mb-6">
            Integrate Universal Digital Wallet Layer into your platform in minutes with our developer-friendly SDK.
          </p>

          <div className="bg-[#0a0e27]/50 rounded-xl p-4 border border-cyan-500/20 mb-4 overflow-x-auto">
            <code className="text-xs text-cyan-400 font-mono">
              npm install @udwl/sdk<br/>
              <span className="text-purple-400">import</span> {"{ UDWLClient }"} <span className="text-purple-400">from</span> <span className="text-green-400">'@udwl/sdk'</span>;<br/>
              <br/>
              <span className="text-purple-400">const</span> client = <span className="text-purple-400">new</span> <span className="text-cyan-400">UDWLClient</span>({"{"}<br/>
              &nbsp;&nbsp;apiKey: <span className="text-green-400">'your-api-key'</span>,<br/>
              &nbsp;&nbsp;environment: <span className="text-green-400">'production'</span><br/>
              {"}"});
            </code>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
              Documentation
            </Button>
            <Button variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
              API Reference
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
              Get API Key
            </Button>
          </div>
        </motion.div>

        {/* Partner Integrations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-[#0f1539] rounded-2xl p-6 border border-cyan-500/20"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg">Active Integrations</h2>
            </div>
            <span className="text-sm text-green-400">{integrationPartners.length} partners</span>
          </div>

          <div className="space-y-3">
            {integrationPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.05 }}
                className="bg-[#0a0e27]/50 rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-lg">
                      🏦
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm">{partner.name}</h3>
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      </div>
                      <p className="text-xs text-gray-400">{partner.connections.toLocaleString()} active connections</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-cyan-400 mb-1">{partner.apiCalls}</div>
                    <div className="text-xs text-green-400">{partner.status}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Compliance Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-[#0f1539] rounded-2xl p-6 border border-cyan-500/20"
        >
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <h2 className="text-lg">Compliance Insights</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20 text-center">
              <div className="text-2xl text-green-400 mb-1">99.9%</div>
              <div className="text-xs text-gray-400">KYC Pass Rate</div>
            </div>
            <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20 text-center">
              <div className="text-2xl text-green-400 mb-1">100%</div>
              <div className="text-xs text-gray-400">AML Compliance</div>
            </div>
            <div className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-500/20 text-center">
              <div className="text-2xl text-cyan-400 mb-1">0.8s</div>
              <div className="text-xs text-gray-400">Avg. Verification</div>
            </div>
            <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20 text-center">
              <div className="text-2xl text-red-400 mb-1">0.02%</div>
              <div className="text-xs text-gray-400">Fraud Rate</div>
            </div>
          </div>

          <div className="mt-6 bg-cyan-500/5 rounded-xl p-4 border border-cyan-500/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-cyan-400/90">
                <p className="mb-1">Regulatory Updates</p>
                <p>New BSP regulations for Philippines remittances will take effect on Dec 1, 2025. SDK update v2.4.0 includes compliance changes.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
