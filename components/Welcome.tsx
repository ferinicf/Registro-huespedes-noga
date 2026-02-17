import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-20 h-20 bg-noga-brown rounded-full flex items-center justify-center mb-6 shadow-lg">
        <CheckCircle2 className="w-10 h-10 text-noga-lightblue" />
      </div>
      <h2 className="text-2xl font-bold text-noga-deepteal mb-2">¡Bienvenido al Hotel Noga!</h2>
      <p className="text-noga-deepteal/70 mb-8 max-w-sm">
        Estamos felices de tenerte aquí. Por favor, completa tu registro digital y conoce nuestras normas de convivencia.
      </p>
      
      <button 
        onClick={onStart}
        className="group flex items-center gap-2 bg-noga-deepteal text-white px-8 py-4 rounded-full font-bold hover:bg-noga-brown transition-all shadow-lg active:scale-95"
      >
        COMENZAR REGISTRO
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="mt-12 grid grid-cols-2 gap-4 w-full">
        <div className="bg-white p-4 rounded-2xl border border-noga-midteal/30">
          <p className="text-2xl font-bold text-noga-brown">3 pm</p>
          <p className="text-xs text-noga-deepteal font-semibold uppercase">Check-in</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-noga-midteal/30">
          <p className="text-2xl font-bold text-noga-brown">11 am</p>
          <p className="text-xs text-noga-deepteal font-semibold uppercase">Check-out</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;