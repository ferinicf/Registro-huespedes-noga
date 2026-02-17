
import React, { useState } from 'react';
import { GuestData } from '../types';
import { Search, ChevronDown, ChevronUp, Mail, Share2, Printer, Calendar, User, ArrowLeft, Download } from 'lucide-react';

interface HistoryViewProps {
  history: GuestData[];
  onBack: () => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ history, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredHistory = history.filter(guest => 
    `${guest.firstName} ${guest.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShareWhatsApp = (guest: GuestData) => {
    const text = `Registro Hotel Noga - Huésped: ${guest.firstName} ${guest.lastName}. Registrado el: ${guest.acceptedAt}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSendEmail = (guest: GuestData) => {
    const subject = `Registro Hotel Noga - ${guest.firstName} ${guest.lastName}`;
    const body = `Resumen de Registro:\nNombre: ${guest.firstName} ${guest.lastName}\nEmail: ${guest.email}\nCheck-in: ${guest.checkInDate}\nCheck-out: ${guest.checkOutDate}\nFirmado el: ${guest.acceptedAt}`;
    window.location.href = `mailto:${guest.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={onBack} className="p-2 hover:bg-noga-lightblue rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-noga-deepteal" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-noga-deepteal">Histórico de Registros</h2>
          <p className="text-xs text-noga-midteal uppercase font-bold tracking-widest">Panel de Administración</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-noga-midteal" />
        <input 
          type="text" 
          placeholder="Buscar por nombre o email..."
          className="w-full pl-10 pr-4 py-3 bg-noga-lightblue/30 border border-noga-midteal/20 rounded-xl outline-none focus:border-noga-brown transition-colors text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-12 text-noga-midteal italic">
            No se encontraron registros.
          </div>
        ) : (
          filteredHistory.map((guest) => (
            <div key={guest.id} className="bg-white border border-noga-midteal/20 rounded-2xl overflow-hidden shadow-sm">
              <button 
                onClick={() => setExpandedId(expandedId === guest.id ? null : guest.id || null)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-noga-lightblue/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-noga-brown/10 rounded-full flex items-center justify-center text-noga-brown font-bold">
                    {guest.firstName[0]}{guest.lastName[0]}
                  </div>
                  <div>
                    <p className="font-bold text-noga-deepteal text-sm">{guest.firstName} {guest.lastName}</p>
                    <p className="text-[10px] text-noga-midteal">{guest.acceptedAt}</p>
                  </div>
                </div>
                {expandedId === guest.id ? <ChevronUp className="w-4 h-4 text-noga-midteal" /> : <ChevronDown className="w-4 h-4 text-noga-midteal" />}
              </button>

              {expandedId === guest.id && (
                <div className="px-4 pb-4 pt-2 border-t border-noga-midteal/10 animate-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="space-y-3">
                      <div>
                        <p className="text-[8px] font-bold text-noga-brown uppercase">Email</p>
                        <p className="text-[10px] font-medium text-noga-deepteal truncate">{guest.email}</p>
                      </div>
                      <div>
                        <p className="text-[8px] font-bold text-noga-brown uppercase">Celular</p>
                        <p className="text-[10px] font-medium text-noga-deepteal">{guest.cellphone}</p>
                      </div>
                      <div>
                        <p className="text-[8px] font-bold text-noga-brown uppercase">Estancia</p>
                        <p className="text-[10px] font-medium text-noga-deepteal">{guest.checkInDate} / {guest.checkOutDate}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-noga-lightblue/20 rounded-xl p-2 border border-dashed border-noga-midteal/30">
                      <p className="text-[8px] font-bold text-noga-brown uppercase mb-1">Firma Digital</p>
                      {guest.signature ? (
                        <img src={guest.signature} alt="Firma" className="max-h-16 w-auto grayscale mix-blend-multiply" />
                      ) : (
                        <p className="text-[8px] text-noga-midteal italic">Sin firma</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 no-print">
                    <button 
                      onClick={() => handleSendEmail(guest)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-noga-deepteal text-white rounded-lg text-[10px] font-bold uppercase hover:bg-noga-brown transition-all"
                    >
                      <Mail className="w-3 h-3" />
                      Email
                    </button>
                    <button 
                      onClick={() => handleShareWhatsApp(guest)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-white border border-noga-deepteal text-noga-deepteal rounded-lg text-[10px] font-bold uppercase hover:bg-noga-lightblue transition-all"
                    >
                      <Share2 className="w-3 h-3" />
                      WhatsApp
                    </button>
                    <button 
                      onClick={handlePrint}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-noga-brown text-white rounded-lg text-[10px] font-bold uppercase hover:bg-noga-deepteal transition-all"
                    >
                      <Download className="w-3 h-3" />
                      PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      <div className="text-center pt-8 opacity-50">
        <p className="text-[10px] text-noga-midteal">Los registros se guardan localmente en este dispositivo.</p>
      </div>
    </div>
  );
};

export default HistoryView;
