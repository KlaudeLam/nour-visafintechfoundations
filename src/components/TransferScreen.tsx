import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Check, ChevronDown, Info, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';

const currencies = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸', balance: '12,458.00' },
  { code: 'AED', name: 'UAE Dirham', flag: '🇦🇪', balance: '8,234.50' },
  { code: 'PHP', name: 'Philippine Peso', flag: '🇵🇭', balance: '145,890.00' },
  { code: 'USDC', name: 'USD Coin', symbol: '◈', balance: '5,000.00' },
  { code: 'CBDC', name: 'Central Bank Digital Currency', symbol: '◉', balance: '2,500.00' },
];

export function TransferScreen() {
  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [toCurrency, setToCurrency] = useState(currencies[1]);
  const [amount, setAmount] = useState('1000');
  const [step, setStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const exchangeRate = 3.67;
  const convertedAmount = (parseFloat(amount || '0') * exchangeRate).toFixed(2);
  const fee = (parseFloat(amount || '0') * 0.002).toFixed(2);

  const steps = ['Verify', 'Route', 'Execute', 'Confirm'];
  const progress = ((step + 1) / steps.length) * 100;

  const handleTransfer = () => {
    setIsProcessing(true);
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setIsProcessing(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl mb-2">Transfer & Payment</h1>
        <p className="text-cyan-400/70 text-sm">Your money, your identity — unified.</p>
      </motion.div>

      <div className="space-y-6 max-w-2xl mx-auto">
        {/* From Currency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0f1539] rounded-2xl p-6 border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
        >
          <label className="text-sm text-gray-400 mb-3 block">From</label>
          <div className="flex items-center justify-between mb-4">
            <button className="flex items-center gap-3 bg-[#0a0e27] px-4 py-3 rounded-xl hover:bg-[#0a0e27]/70 transition-colors border border-cyan-500/20">
              <span className="text-2xl">{fromCurrency.flag || fromCurrency.symbol}</span>
              <div className="text-left">
                <div className="text-sm">{fromCurrency.code}</div>
                <div className="text-xs text-gray-400">{fromCurrency.name}</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            <div className="text-xs text-gray-400">
              Balance: {fromCurrency.balance} {fromCurrency.code}
            </div>
          </div>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-[#0a0e27] border-cyan-500/20 h-14 text-2xl"
            placeholder="0.00"
          />
        </motion.div>

        {/* Swap Arrow */}
        <div className="flex justify-center -my-3 relative z-10">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          >
            <ArrowDown className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* To Currency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0f1539] rounded-2xl p-6 border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
        >
          <label className="text-sm text-gray-400 mb-3 block">To</label>
          <div className="flex items-center justify-between mb-4">
            <button className="flex items-center gap-3 bg-[#0a0e27] px-4 py-3 rounded-xl hover:bg-[#0a0e27]/70 transition-colors border border-cyan-500/20">
              <span className="text-2xl">{toCurrency.flag || toCurrency.symbol}</span>
              <div className="text-left">
                <div className="text-sm">{toCurrency.code}</div>
                <div className="text-xs text-gray-400">{toCurrency.name}</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            <div className="text-xs text-gray-400">
              Balance: {toCurrency.balance} {toCurrency.code}
            </div>
          </div>
          <div className="h-14 bg-[#0a0e27] border border-cyan-500/20 rounded-lg flex items-center px-4 text-2xl text-cyan-400">
            {convertedAmount}
          </div>
        </motion.div>

        {/* Exchange Rate & Fees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl p-5 border border-cyan-500/30"
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400">Real-time FX Rate</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Exchange Rate</span>
              <span className="text-sm">1 {fromCurrency.code} = {exchangeRate} {toCurrency.code}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Network Fee</span>
              <span className="text-sm">{fee} {fromCurrency.code}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-cyan-500/20">
              <span className="text-sm">You will receive</span>
              <span className="text-lg text-cyan-400">{convertedAmount} {toCurrency.code}</span>
            </div>
          </div>
        </motion.div>

        {/* Compliance Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0f1539] rounded-2xl p-5 border border-green-500/30"
        >
          <div className="flex items-center gap-2 mb-2">
            <Check className="w-5 h-5 text-green-400" />
            <span className="text-sm text-green-400">Verified via Smart Compliance Router ✅</span>
          </div>
          <p className="text-xs text-gray-400">Transaction meets all regulatory requirements for UAE ↔ Philippines corridor</p>
        </motion.div>

        {/* Progress Bar */}
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0f1539] rounded-2xl p-6 border border-cyan-500/20"
          >
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                {steps.map((stepName, index) => (
                  <div
                    key={stepName}
                    className={`flex flex-col items-center gap-2 ${
                      index <= step ? 'text-cyan-400' : 'text-gray-500'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                        index < step
                          ? 'bg-cyan-500 border-cyan-500'
                          : index === step
                          ? 'bg-cyan-500/20 border-cyan-500 animate-pulse'
                          : 'bg-transparent border-gray-500'
                      }`}
                    >
                      {index < step ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : (
                        <span className="text-xs">{index + 1}</span>
                      )}
                    </div>
                    <span className="text-xs">{stepName}</span>
                  </div>
                ))}
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <p className="text-sm text-center text-gray-400">
              {step < steps.length - 1 ? 'Processing your transaction...' : 'Transfer completed successfully!'}
            </p>
          </motion.div>
        )}

        {/* Transfer Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={handleTransfer}
            disabled={isProcessing || step >= steps.length - 1}
            className="w-full h-14 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing 
              ? 'Processing...' 
              : step >= steps.length - 1 
              ? 'Transfer Complete' 
              : 'Confirm Transfer'}
          </Button>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-cyan-500/5 rounded-xl p-4 border border-cyan-500/20 flex items-start gap-3"
        >
          <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-cyan-400/80">
            <p>Verified via AI Smart Compliance Layer.</p>
            <p className="mt-1">Your transaction is routed through CBDC → VisaNet → BSP Wallet for optimal compliance and speed.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
