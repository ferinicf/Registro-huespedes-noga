import React, { useRef, useState, useEffect } from 'react';
import { GuestData } from '../types';
import { RotateCcw } from 'lucide-react';

interface SignaturePadProps {
  data: GuestData;
  onComplete: (signature: string) => void;
  onBack: () => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ data, onComplete, onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#025159'; // noga-deepteal
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const pos = getPos(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }
    setHasSignature(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const pos = getPos(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      setHasSignature(false);
    }
  };

  const handleFinish = () => {
    if (hasSignature && canvasRef.current) {
      onComplete(canvasRef.current.toDataURL());
    }
  };

  return (
    <div className="py-6 space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-noga-deepteal">Firma Digital</h3>
        <p className="text-sm text-noga-deepteal/60">Por favor firme dentro del cuadro para completar su registro.</p>
      </div>

      <div className="bg-noga-lightblue p-4 rounded-2xl border-2 border-noga-midteal/30">
        <div className="bg-white rounded-lg border-2 border-dashed border-noga-midteal/30 overflow-hidden shadow-inner">
          <canvas
            ref={canvasRef}
            width={400}
            height={200}
            className="w-full h-48 signature-pad"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
        <div className="flex justify-between items-center mt-3 px-2">
          <div className="text-[10px] text-noga-brown font-bold uppercase tracking-widest">Firma de {data.firstName} {data.lastName}</div>
          <button onClick={clear} className="flex items-center gap-1 text-xs text-noga-brown font-bold hover:opacity-80 transition-opacity">
            <RotateCcw className="w-3 h-3" />
            LIMPIAR
          </button>
        </div>
      </div>

      <div className="text-[10px] text-noga-teal/50 text-center uppercase tracking-widest">
        Fecha: {new Date().toLocaleDateString()}
      </div>

      <div className="flex gap-4">
        <button 
          onClick={onBack}
          className="flex-1 border-2 border-noga-midteal/30 text-noga-deepteal py-4 rounded-xl font-bold hover:bg-noga-lightblue transition-all active:scale-95"
        >
          ATRÁS
        </button>
        <button 
          disabled={!hasSignature}
          onClick={handleFinish}
          className={`flex-[2] py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 ${hasSignature ? 'bg-noga-deepteal text-white hover:bg-noga-brown' : 'bg-noga-midteal/50 text-white cursor-not-allowed'}`}
        >
          FINALIZAR REGISTRO
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;