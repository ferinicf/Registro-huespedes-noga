
import React from 'react';
import { GuestData } from '../types';
import { Mail, Share2, Download, CheckCircle2, QrCode, PlusCircle } from 'lucide-react';

interface ConfirmationProps {
  data: GuestData;
  onReset: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ data, onReset }) => {
  const currentUrl = window.location.href;
  
  const handleShareWhatsApp = () => {
    const text = `Hola! Aquí tienes el registro de tu estancia en Hotel Noga. Nombre: ${data.firstName} ${data.lastName}. Consulta las reglas aquí: ${currentUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSendEmail = () => {
    const subject = "Tu Registro - Hotel Noga";
    const body = `Hola ${data.firstName},\n\nGracias por registrarte en Hotel Noga.\n\nFecha de Registro: ${data.acceptedAt}\n\nPuedes consultar las normas del hotel en cualquier momento escaneando el código QR en recepción o visitando: ${currentUrl}\n\n¡Disfruta tu estancia!`;
    window.location.href = `mailto:${data.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-6 space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-noga-brown/10 rounded-full mb-4">
          <CheckCircle2 className="w-8 h-8 text-noga-brown" />
        </div>
        <h2 className="text-2xl font-bold text-noga-deepteal">¡Registro Completado!</h2>
        <p className="text-sm text-noga-deepteal/60">Todo listo, {data.firstName}. ¡Bienvenido a nuestra comunidad!</p>
      </div>

      <div className="bg-white border-2 border-noga-midteal/20 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-noga-deepteal text-white p-4 flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-noga-brown">Resumen de Registro</span>
          <span className="text-[10px] text-noga-lightblue/60">{data.acceptedAt}</span>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-noga-brown uppercase font-bold text-[8px] mb-1">Huésped</p>
              <p className="font-bold text-noga-deepteal">{data.firstName} {data.lastName}</p>
            </div>
            <div>
              <p className="text-noga-brown uppercase font-bold text-[8px] mb-1">Nacionalidad</p>
              <p className="font-bold text-noga-deepteal">{data.nationality}</p>
            </div>
            <div>
              <p className="text-noga-brown uppercase font-bold text-[8px] mb-1">Check-in</p>
              <p className="font-bold text-noga-deepteal">{data.checkInDate}</p>
            </div>
            <div>
              <p className="text-noga-brown uppercase font-bold text-[8px] mb-1">Check-out</p>
              <p className="font-bold text-noga-deepteal">{data.checkOutDate}</p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-noga-lightblue flex flex-col items-center">
            <p className="text-[10px] text-noga-brown font-bold uppercase mb-4">Código QR de Normas</p>
            <div className="bg-noga-lightblue p-6 rounded-2xl border-2 border-noga-midteal/20 mb-2 relative">
               <QrCode className="w-32 h-32 text-noga-deepteal" />
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                  <span className="font-bold text-xl italic text-noga-brown">NOGA</span>
               </div>
            </div>
            <p className="text-[10px] text-noga-deepteal/50">Escanea para recordar las normas en tu celular</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 no-print">
        <button 
          onClick={handleSendEmail}
          className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-noga-midteal/20 hover:bg-noga-lightblue transition-all group"
        >
          <Mail className="w-6 h-6 text-noga-brown group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold text-noga-deepteal uppercase">Enviar a Email</span>
        </button>
        <button 
          onClick={handleShareWhatsApp}
          className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-noga-midteal/20 hover:bg-noga-lightblue transition-all group"
        >
          <Share2 className="w-6 h-6 text-noga-brown group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold text-noga-deepteal uppercase">Enviar WhatsApp</span>
        </button>
      </div>

      <div className="flex gap-4 no-print">
        <button 
          onClick={handlePrint}
          className="flex-1 flex items-center justify-center gap-2 bg-noga-deepteal text-white py-4 rounded-xl font-bold hover:bg-noga-brown transition-all shadow-lg active:scale-95"
        >
          <Download className="w-5 h-5" />
          PDF
        </button>
        <button 
          onClick={onReset}
          className="flex-1 flex items-center justify-center gap-2 bg-noga-brown text-white py-4 rounded-xl font-bold hover:bg-noga-deepteal transition-all shadow-lg active:scale-95"
        >
          <PlusCircle className="w-5 h-5" />
          NUEVO
        </button>
      </div>

      <div className="text-center text-[10px] text-noga-deepteal/40 pb-8 italic">
        "BIENVENIDO AL HOTEL NOGA / WELCOME TO HOTEL NOGA."
      </div>
    </div>
  );
};

export default Confirmation;
