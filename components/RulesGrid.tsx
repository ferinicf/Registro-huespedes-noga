import React from 'react';
import { HOTEL_NOGA_RULES } from '../constants';

interface RulesGridProps {
  onNext: () => void;
  onBack: () => void;
}

const RulesGrid: React.FC<RulesGridProps> = ({ onNext, onBack }) => {
  return (
    <div className="py-6 space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-noga-deepteal">COMUNIDAD NOGA / NOGA COMMUNITY</h3>
        <p className="text-sm text-noga-deepteal/60">Conoce nuestras normas para una estancia placentera.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {HOTEL_NOGA_RULES.map((rule) => (
          <div key={rule.id} className="bg-white border-2 border-noga-lightblue rounded-2xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
            <div className={`mb-3 p-3 rounded-full bg-noga-lightblue/50 ${rule.color.replace('text-', 'text-noga-')}`}>
              {rule.icon}
            </div>
            <h4 className="text-[10px] font-bold text-noga-brown uppercase tracking-wider mb-1">{rule.title}</h4>
            <p className="text-xs font-bold text-noga-deepteal mb-2">{rule.subtitle}</p>
            <div className="space-y-1">
              <p className="text-[10px] leading-tight text-noga-deepteal/80">{rule.descriptionEs}</p>
              <p className="text-[10px] leading-tight text-noga-teal/60 italic">{rule.descriptionEn}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-noga-brown/10 p-6 rounded-2xl border-2 border-noga-brown/20 space-y-4">
        <p className="text-xs text-noga-brown font-medium text-center">
          En caso de incumplir cualquiera de las reglas del hotel, se podrá cancelar su reserva sin ningún tipo de reembolso. En caso de daño o pérdida de toallas, llaves, o cualquier artículo del hotel se cobrará una penalización.
        </p>
        <p className="text-[10px] text-noga-deepteal italic text-center">
          In case of breaking any of the hotel rules, your reservation may be canceled without any refund. In case of damage or loss of towels, keys, or any hotel item a penalty will be charged.
        </p>
      </div>

      <div className="flex gap-4 no-print">
        <button 
          onClick={onBack}
          className="flex-1 border-2 border-noga-midteal/30 text-noga-deepteal py-4 rounded-xl font-bold hover:bg-noga-lightblue transition-all active:scale-95"
        >
          ATRÁS
        </button>
        <button 
          onClick={onNext}
          className="flex-[2] bg-noga-deepteal text-white py-4 rounded-xl font-bold hover:bg-noga-brown transition-all shadow-lg active:scale-95"
        >
          ACEPTO Y FIRMO
        </button>
      </div>
    </div>
  );
};

export default RulesGrid;