
import React, { useState, useCallback, useEffect } from 'react';
import { AppStep, GuestData } from './types';
import Header from './components/Header';
import Welcome from './components/Welcome';
import RegistrationForm from './components/RegistrationForm';
import RulesGrid from './components/RulesGrid';
import SignaturePad from './components/SignaturePad';
import Confirmation from './components/Confirmation';
import HistoryView from './components/HistoryView';
import { Settings } from 'lucide-react';

const STORAGE_KEY = 'noga_guest_history';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('welcome');
  const [history, setHistory] = useState<GuestData[]>([]);
  const [guestData, setGuestData] = useState<GuestData>({
    firstName: '',
    lastName: '',
    email: '',
    cellphone: '',
    nationality: '',
    birthday: '',
    travelingFrom: '',
    travelingNext: '',
    checkInDate: '',
    checkOutDate: '',
  });

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading history", e);
      }
    }
  }, []);

  const handleUpdateGuest = useCallback((newData: Partial<GuestData>) => {
    setGuestData(prev => ({ ...prev, ...newData }));
  }, []);

  const saveToHistory = (finalData: GuestData) => {
    const recordWithId = { ...finalData, id: crypto.randomUUID() };
    const updatedHistory = [recordWithId, ...history];
    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const goToStep = (step: AppStep) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(step);
  };

  const resetForm = () => {
    setGuestData({
      firstName: '',
      lastName: '',
      email: '',
      cellphone: '',
      nationality: '',
      birthday: '',
      travelingFrom: '',
      travelingNext: '',
      checkInDate: '',
      checkOutDate: '',
    });
    goToStep('welcome');
  };

  return (
    <div className="min-h-screen flex flex-col max-w-2xl mx-auto shadow-xl bg-white relative">
      <Header />
      
      <main className="flex-1 p-4 pb-32">
        {currentStep === 'welcome' && (
          <Welcome onStart={() => goToStep('registration')} />
        )}

        {currentStep === 'registration' && (
          <RegistrationForm 
            data={guestData} 
            onChange={handleUpdateGuest} 
            onNext={() => goToStep('rules')} 
          />
        )}

        {currentStep === 'rules' && (
          <RulesGrid 
            onNext={() => goToStep('signature')} 
            onBack={() => goToStep('registration')}
          />
        )}

        {currentStep === 'signature' && (
          <SignaturePad 
            data={guestData}
            onComplete={(signature) => {
              const finalData = { 
                ...guestData,
                signature, 
                acceptedAt: new Date().toLocaleString() 
              };
              handleUpdateGuest(finalData);
              saveToHistory(finalData);
              goToStep('confirmation');
            }}
            onBack={() => goToStep('rules')}
          />
        )}

        {currentStep === 'confirmation' && (
          <Confirmation data={guestData} onReset={resetForm} />
        )}

        {currentStep === 'history' && (
          <HistoryView history={history} onBack={() => goToStep('welcome')} />
        )}
      </main>

      {/* Persistent Footer */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto bg-white/90 backdrop-blur-sm border-t p-4 flex justify-between items-center z-50 no-print">
        <div className="flex flex-col">
          <p className="text-[10px] text-noga-deepteal font-bold uppercase tracking-tight">Hotel Noga</p>
          <p className="text-[8px] text-noga-midteal">Comunidad y Convivencia</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => goToStep('history')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-noga-midteal/30 text-noga-deepteal hover:bg-noga-lightblue transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase">Registros</span>
          </button>
          <div className="text-[10px] text-gray-400">© {new Date().getFullYear()}</div>
        </div>
      </footer>
    </div>
  );
};

export default App;
