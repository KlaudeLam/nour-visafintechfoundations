import { useState } from 'react';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { Dashboard } from './components/Dashboard';
import { DocumentUpload } from './components/DocumentUpload';
import { DocumentChecklist } from './components/DocumentChecklist';
import { IdentityWallet } from './components/IdentityWallet';
import { ProgressTracking } from './components/ProgressTracking';
import { SecurityPrivacy } from './components/SecurityPrivacy';
import { HelpSupport } from './components/HelpSupport';
import { ShareCredentials } from './components/ShareCredentials';
import { ENBDIntegration } from './components/ENBDIntegration';
import { AccountSettings } from './components/AccountSettings';
import { Home, Upload, CheckSquare, Wallet, HelpCircle, Share2, User } from 'lucide-react';

type Screen = 'signup' | 'signin' | 'dashboard' | 'upload' | 'checklist' | 'wallet' | 'progress' | 'security' | 'help' | 'share' | 'enbd-integration' | 'account';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('signup');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => {
    setIsAuthenticated(true);
    setActiveScreen('dashboard');
  };

  const handleSignUp = () => {
    setIsAuthenticated(true);
    setActiveScreen('dashboard');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0e27]">
        {activeScreen === 'signup' ? (
          <SignUp onSignUp={handleSignUp} onSwitchToSignIn={() => setActiveScreen('signin')} />
        ) : (
          <SignIn onSignIn={handleSignIn} onSwitchToSignUp={() => setActiveScreen('signup')} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white">
      {/* Main Content */}
      <div className="pb-20">
        {activeScreen === 'dashboard' && <Dashboard onNavigate={setActiveScreen} />}
        {activeScreen === 'upload' && <DocumentUpload />}
        {activeScreen === 'checklist' && <DocumentChecklist />}
        {activeScreen === 'wallet' && <IdentityWallet />}
        {activeScreen === 'progress' && <ProgressTracking />}
        {activeScreen === 'security' && <SecurityPrivacy />}
        {activeScreen === 'help' && <HelpSupport />}
        {activeScreen === 'share' && <ShareCredentials onNavigate={setActiveScreen} />}
        {activeScreen === 'enbd-integration' && <ENBDIntegration onComplete={() => setActiveScreen('dashboard')} />}
        {activeScreen === 'account' && <AccountSettings />}
      </div>

      {/* Bottom Navigation */}
      {activeScreen !== 'enbd-integration' && (
        <nav className="fixed bottom-0 left-0 right-0 bg-[#0f1539]/90 backdrop-blur-xl border-t border-[#22d3ee]/20">
          <div className="max-w-7xl mx-auto px-2">
            <div className="flex justify-around items-center h-16">
              <NavButton
                icon={<Home className="w-5 h-5" />}
                label="Home"
                active={activeScreen === 'dashboard'}
                onClick={() => setActiveScreen('dashboard')}
              />
              <NavButton
                icon={<Share2 className="w-5 h-5" />}
                label="Share"
                active={activeScreen === 'share'}
                onClick={() => setActiveScreen('share')}
              />
              <NavButton
                icon={<Wallet className="w-5 h-5" />}
                label="Wallet"
                active={activeScreen === 'wallet'}
                onClick={() => setActiveScreen('wallet')}
              />
              <NavButton
                icon={<HelpCircle className="w-5 h-5" />}
                label="Help"
                active={activeScreen === 'help'}
                onClick={() => setActiveScreen('help')}
              />
              <NavButton
                icon={<User className="w-5 h-5" />}
                label="Account"
                active={activeScreen === 'account'}
                onClick={() => setActiveScreen('account')}
              />
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}

function NavButton({ 
  icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all ${
        active 
          ? 'text-[#22d3ee]' 
          : 'text-gray-400 hover:text-[#22d3ee]'
      }`}
    >
      <div className={`${active ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''}`}>
        {icon}
      </div>
      <span className="text-xs">{label}</span>
    </button>
  );
}