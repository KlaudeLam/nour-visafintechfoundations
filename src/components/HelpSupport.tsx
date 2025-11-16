import { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle, Mail, Phone, Book, Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const faqsByLanguage = {
  en: [
    {
      question: 'How do I upload a document?',
      answer: 'Navigate to the Upload tab, select your document type, then either take a photo or choose a file from your device. Our AI will automatically validate your document.'
    },
    {
      question: 'Why was my document rejected?',
      answer: 'Documents may be rejected due to poor image quality, missing information, expiry, or authentication issues. Check the validation results for specific reasons and re-upload a clear image.'
    },
    {
      question: 'How long does verification take?',
      answer: 'Most documents are verified within 2-3 business days. Some documents may require manual review and can take up to 5 business days.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes! All documents are encrypted using AES-256 encryption. We use zero-knowledge proofs and never share your data without your explicit permission.'
    },
    {
      question: 'Can I share my credentials with multiple banks?',
      answer: 'Absolutely! Once verified, you can share your credentials with any bank or fintech. You maintain full control and can revoke access anytime.'
    },
    {
      question: 'What documents do non-residents need?',
      answer: 'Non-residents typically need: passport, visa, employment certificate, salary proof, tax ID, and proof of address. Requirements may vary by country.'
    },
    {
      question: 'How do I delete my account?',
      answer: 'Go to Security & Privacy > Privacy Controls > Delete Account. This will permanently delete all your data and cannot be undone.'
    },
    {
      question: 'What file formats are supported?',
      answer: 'We support JPG, PNG, and PDF files. For best results, use clear, high-resolution images where all text is readable.'
    },
  ],
  hi: [
    {
      question: 'मैं दस्तावेज़ कैसे अपलोड करूं?',
      answer: 'अपलोड टैब पर जाएं, अपना दस्तावेज़ प्रकार चुनें, फिर या तो फोटो लें या अपने डिवाइस से फ़ाइल चुनें। हमारा AI स्वचालित रूप से आपके दस्तावेज़ को मान्य करेगा।'
    },
    {
      question: 'मेरा दस्तावेज़ क्यों अस्वीकार किया गया?',
      answer: 'खराब छवि गुणवत्ता, जानकारी गायब होने, समाप्ति, या प्रमाणीकरण समस्याओं के कारण दस्तावेज़ अस्वीकार किए जा सकते हैं।'
    },
    {
      question: 'सत्यापन में कितना समय लगता है?',
      answer: 'अधिकांश दस्तावेज़ 2-3 कार्य दिवसों के भीतर सत्यापित हो जाते हैं।'
    },
  ],
  tl: [
    {
      question: 'Paano mag-upload ng dokumento?',
      answer: 'Pumunta sa Upload tab, piliin ang uri ng dokumento, pagkatapos ay kumuha ng larawan o pumili ng file mula sa iyong device. Awtomatikong babalidahin ng aming AI ang iyong dokumento.'
    },
    {
      question: 'Bakit tinanggihan ang aking dokumento?',
      answer: 'Maaaring tanggihan ang mga dokumento dahil sa masamang kalidad ng larawan, nawawalang impormasyon, pag-expire, o mga isyu sa pagpapatunay.'
    },
    {
      question: 'Gaano katagal ang verification?',
      answer: 'Karamihan ng mga dokumento ay nabeberipika sa loob ng 2-3 araw ng negosyo.'
    },
  ],
};

const uploadTips = [
  {
    title: 'Good Lighting',
    description: 'Take photos in well-lit areas. Avoid shadows and glare.',
    icon: '💡'
  },
  {
    title: 'Clear Focus',
    description: 'Ensure all text is sharp and readable. Avoid blurry images.',
    icon: '📸'
  },
  {
    title: 'Full Document',
    description: 'Capture all four corners. Don\'t cut off any part.',
    icon: '🖼️'
  },
  {
    title: 'Flat Surface',
    description: 'Place document on a flat surface to avoid distortion.',
    icon: '📄'
  },
];

export function HelpSupport() {
  const [language, setLanguage] = useState<'en' | 'hi' | 'tl'>('en');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = faqsByLanguage[language];
  const filteredFaqs = searchQuery
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div className="min-h-screen bg-[#0a0e27] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl mb-2">Help & Support</h1>
        <p className="text-cyan-400/70 text-sm">We're here to help you succeed</p>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Language Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0f1539] rounded-2xl p-6 border border-cyan-500/20"
        > 
          <label className="text-sm text-gray-400 mb-3 block">Select Language</label>
          <Select value={language} onValueChange={(value: any) => setLanguage(value)}>
            <SelectTrigger className="bg-[#0a0e27] border-cyan-500/20 mt-2 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#0f1539] border-cyan-500/20 text-white">
              <SelectItem value="en" className="text-white hover:bg-[#22d3ee]/10 cursor-pointer">English</SelectItem>
              <SelectItem value="hi" className="text-white hover:bg-[#22d3ee]/10 cursor-pointer">Hindi (हिंदी)</SelectItem>
              <SelectItem value="tl" className="text-white hover:bg-[#22d3ee]/10 cursor-pointer">Tagalog</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Quick Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-3"
        >
          <button className="bg-[#0f1539] rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-500/40 transition-all text-center">
            <MessageCircle className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-xs">Live Chat</div>
          </button>

          <button className="bg-[#0f1539] rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-500/40 transition-all text-center">
            <Mail className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-xs">Email Us</div>
          </button>

          <button className="bg-[#0f1539] rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-500/40 transition-all text-center">
            <Phone className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-xs">Call</div>
          </button>
        </motion.div>

        {/* Upload Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h2 className="text-lg flex items-center gap-2">
            <Book className="w-5 h-5 text-cyan-400" />
            Tips for Uploading Documents
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {uploadTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="bg-[#0f1539] rounded-xl p-4 border border-cyan-500/20"
              >
                <div className="text-3xl mb-2">{tip.icon}</div>
                <h3 className="text-sm mb-1">{tip.title}</h3>
                <p className="text-xs text-gray-400">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <h2 className="text-lg flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            Frequently Asked Questions
          </h2>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#0f1539] border-cyan-500/20 pl-10 h-12"
            />
          </div>

          <div className="space-y-2">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.03 }}
                className="bg-[#0f1539] rounded-xl border border-cyan-500/20 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-cyan-500/5 transition-colors"
                >
                  <span className="text-sm pr-4">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>

                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-cyan-500/10"
                  >
                    <div className="p-4 text-sm text-gray-400 bg-[#0a0e27]/50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No results found. Try different keywords.</p>
            </div>
          )}
        </motion.div>

        {/* Still Need Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl p-6 border border-cyan-500/30 text-center"
        >
          <MessageCircle className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h3 className="text-lg mb-2">Still Need Help?</h3>
          <p className="text-sm text-gray-400 mb-6">
            Our support team is available 24/7 to assist you
          </p>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 h-12 border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/10"
            >
              <Mail className="w-5 h-5 mr-2 text-cyan-400" />
              Email Support
            </Button>
            <Button
              className="flex-1 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Chat
            </Button>
          </div>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="bg-cyan-500/5 rounded-xl p-4 border border-cyan-500/20"
        >
          <h4 className="text-sm mb-3">Additional Resources</h4>
          <div className="space-y-2 text-xs">
            <a href="#" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
              <Book className="w-4 h-4" />
              User Guide & Documentation
            </a>
            <a href="#" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
              <HelpCircle className="w-4 h-4" />
              Video Tutorials
            </a>
            <a href="#" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
              <MessageCircle className="w-4 h-4" />
              Community Forum
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
