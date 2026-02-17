import React from 'react';
import { 
  LogIn, LogOut, CreditCard, Dog, Vault, 
  WineOff, Footprints, Volume2, Waves, 
  Wind, Key, Ban, AlertTriangle, Users, 
  Cigarette, UtensilsCrossed 
} from 'lucide-react';
import { Rule } from './types';

export const HOTEL_NOGA_RULES: Rule[] = [
  {
    id: 'check-in',
    title: 'CHECK IN',
    subtitle: 'Entrada 3 pm',
    descriptionEs: 'Entrada 3 pm.',
    descriptionEn: 'Entry 3pm.',
    icon: <LogIn className="w-8 h-8" />,
    color: 'text-brown'
  },
  {
    id: 'check-out',
    title: 'CHECK OUT',
    subtitle: 'Salida 11 am',
    descriptionEs: 'Salida 11 am.',
    descriptionEn: 'Exit 11 am.',
    icon: <LogOut className="w-8 h-8" />,
    color: 'text-deepteal'
  },
  {
    id: 'payment',
    title: 'PAGOS - PAYMENT',
    subtitle: 'Al llegar realizar el pago',
    descriptionEs: 'Al llegar realizar el pago.',
    descriptionEn: 'Payment is due on arrival.',
    icon: <CreditCard className="w-8 h-8" />,
    color: 'text-brown'
  },
  {
    id: 'pets',
    title: 'MASCOTAS - PETS',
    subtitle: 'Solo excepciones',
    descriptionEs: 'Solo excepciones.',
    descriptionEn: 'Only exceptions upon request.',
    icon: <Dog className="w-8 h-8" />,
    color: 'text-teal'
  },
  {
    id: 'safe',
    title: 'CAJA FUERTE - SAFE',
    subtitle: 'En todos los cuartos',
    descriptionEs: 'En todos los cuartos.',
    descriptionEn: 'In every room.',
    icon: <Vault className="w-8 h-8" />,
    color: 'text-deepteal'
  },
  {
    id: 'alcohol',
    title: 'ALCOHOL',
    subtitle: 'Prohibido ingreso',
    descriptionEs: 'El ingreso de bebidas alcohólicas está estrictamente prohibido.',
    descriptionEn: 'Do not enter alcoholic beverages into our facilities.',
    icon: <WineOff className="w-8 h-8" />,
    color: 'text-brown'
  },
  {
    id: 'dont-run',
    title: "DON'T RUN",
    subtitle: 'No corra',
    descriptionEs: 'No corra dentro de las instalaciones.',
    descriptionEn: "Please don't run inside the facilities.",
    icon: <Footprints className="w-8 h-8" />,
    color: 'text-teal'
  },
  {
    id: 'noise',
    title: 'RUIDO - NOISE',
    subtitle: 'Volumen moderado',
    descriptionEs: 'Mantén un volumen moderado ¡Siempre!',
    descriptionEn: 'Keep the noise level reasonable at all times.',
    icon: <Volume2 className="w-8 h-8" />,
    color: 'text-brown'
  },
  {
    id: 'towels',
    title: 'TOALLAS - TOWELS',
    subtitle: 'Cuida las toallas',
    descriptionEs: 'Cuida las toallas de playa y de habitación.',
    descriptionEn: 'Take care of the beach and room towels.',
    icon: <Waves className="w-8 h-8" />,
    color: 'text-teal'
  },
  {
    id: 'ac',
    title: 'AIRE ACONDICIONADO',
    subtitle: 'Apágalo al salir',
    descriptionEs: 'Apágalo al salir del cuarto.',
    descriptionEn: 'Turn the A/C off when you leave the room.',
    icon: <Wind className="w-8 h-8" />,
    color: 'text-teal'
  },
  {
    id: 'keys',
    title: 'LLAVES - KEYS',
    subtitle: 'No las pierdas',
    descriptionEs: 'Llévalas siempre contigo, no las pierdas.',
    descriptionEn: "Always keep it with you, don't lose them.",
    icon: <Key className="w-8 h-8" />,
    color: 'text-brown'
  },
  {
    id: 'drugs',
    title: 'DROGAS - DRUGS',
    subtitle: 'Totalmente prohibidos',
    descriptionEs: 'Compra, venta y consumo están totalmente prohibidos.',
    descriptionEn: 'Strictly prohibited.',
    icon: <Ban className="w-8 h-8" />,
    color: 'text-brown'
  },
  {
    id: 'damages',
    title: 'DAÑOS- DAMAGES',
    subtitle: 'Daños serán penalizados',
    descriptionEs: 'Disfruta responsablemente. Daños serán penalizados.',
    descriptionEn: 'Enjoy responsibly. Fees can apply in case of damage.',
    icon: <AlertTriangle className="w-8 h-8" />,
    color: 'text-brown'
  },
  {
    id: 'visitors',
    title: 'VISITANTES',
    subtitle: 'Solo zonas sociales',
    descriptionEs: 'Visitantes sólo en las zonas sociales, no en los cuartos.',
    descriptionEn: 'Your guests are welcome in our common areas, not in the rooms.',
    icon: <Users className="w-8 h-8" />,
    color: 'text-deepteal'
  },
  {
    id: 'tobacco',
    title: 'TABACO - TOBACCO',
    subtitle: 'Prohibido fumar',
    descriptionEs: 'Estrictamente prohibido fumar en las habitaciones.',
    descriptionEn: 'It is strictly forbidden to smoke inside the rooms.',
    icon: <Cigarette className="w-8 h-8" />,
    color: 'text-brown'
  },
  {
    id: 'food',
    title: 'ALIMENTOS - FOOD',
    subtitle: 'Solo restaurante',
    descriptionEs: 'No se puede introducir alimentos ajenos al restaurante.',
    descriptionEn: 'External food not allowed. Restaurant consumption only.',
    icon: <UtensilsCrossed className="w-8 h-8" />,
    color: 'text-brown'
  }
];