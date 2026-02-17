import React from 'react';
import { GuestData } from '../types';

interface RegistrationFormProps {
  data: GuestData;
  onChange: (data: Partial<GuestData>) => void;
  onNext: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ data, onChange, onNext }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const inputClass = "w-full border-b-2 border-noga-midteal/30 py-2 px-1 focus:border-noga-brown outline-none transition-colors text-sm font-medium text-noga-deepteal bg-transparent";
  const labelClass = "text-[10px] font-bold text-noga-brown uppercase tracking-wider mb-1 block";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Nombre - First Name</label>
          <input required type="text" value={data.firstName} onChange={e => onChange({ firstName: e.target.value })} className={inputClass} placeholder="Ej. Juan" />
        </div>
        <div>
          <label className={labelClass}>Apellido - Last Name</label>
          <input required type="text" value={data.lastName} onChange={e => onChange({ lastName: e.target.value })} className={inputClass} placeholder="Ej. Perez" />
        </div>
      </div>

      <div>
        <label className={labelClass}>Email</label>
        <input required type="email" value={data.email} onChange={e => onChange({ email: e.target.value })} className={inputClass} placeholder="correo@ejemplo.com" />
      </div>

      <div>
        <label className={labelClass}>Celular - Cellphone</label>
        <input required type="tel" value={data.cellphone} onChange={e => onChange({ cellphone: e.target.value })} className={inputClass} placeholder="+1 234 567 890" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Nacionalidad</label>
          <input required type="text" value={data.nationality} onChange={e => onChange({ nationality: e.target.value })} className={inputClass} placeholder="Nacionalidad" />
        </div>
        <div>
          <label className={labelClass}>Nacimiento - Birthday</label>
          <input required type="date" value={data.birthday} onChange={e => onChange({ birthday: e.target.value })} className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Procedencia - From</label>
          <input required type="text" value={data.travelingFrom} onChange={e => onChange({ travelingFrom: e.target.value })} className={inputClass} placeholder="Ciudad/País" />
        </div>
        <div>
          <label className={labelClass}>Destino - Next</label>
          <input required type="text" value={data.travelingNext} onChange={e => onChange({ travelingNext: e.target.value })} className={inputClass} placeholder="Ciudad/País" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Llegada - Check In</label>
          <input required type="date" value={data.checkInDate} onChange={e => onChange({ checkInDate: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Salida - Check Out</label>
          <input required type="date" value={data.checkOutDate} onChange={e => onChange({ checkOutDate: e.target.value })} className={inputClass} />
        </div>
      </div>

      <div className="bg-noga-midteal/10 p-4 rounded-xl text-[10px] text-noga-deepteal/70 leading-relaxed italic border border-noga-midteal/20">
        AUTORIZO al Hotel Noga, bajo la nueva ley DOF 05-07-2010 sobre protección de datos personales, para que realice el tratamiento de los datos que suministro...
        <br/><br/>
        According to the law DOF 05-07-2010 concerning protection of personal data, I authorize Hotel Noga to incorporate them in its database...
      </div>

      <button 
        type="submit" 
        className="w-full bg-noga-deepteal text-white py-4 rounded-xl font-bold hover:bg-noga-brown transition-all shadow-lg active:scale-95"
      >
        CONTINUAR A LAS NORMAS
      </button>
    </form>
  );
};

export default RegistrationForm;