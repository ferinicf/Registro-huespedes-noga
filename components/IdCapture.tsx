
import React, { useRef, useState, useEffect } from 'react';
import { Camera, ArrowLeft, Loader2, RefreshCw } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface IdCaptureProps {
  onCapture: (base64Image: string) => void;
  onBack: () => void;
  lang: Language;
}

const IdCapture: React.FC<IdCaptureProps> = ({ onCapture, onBack, lang }) => {
  const t = translations[lang];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

  // Sincronizar el stream con el elemento video de forma más robusta para Android
  useEffect(() => {
    let isMounted = true;

    const setupVideo = async () => {
      if (isCameraActive && stream && videoRef.current) {
        // Asegurar que el objeto se asigne
        if (videoRef.current.srcObject !== stream) {
          videoRef.current.srcObject = stream;
        }
        
        // Listener para cuando el video esté listo para reproducir
        const handleLoadedMetadata = async () => {
          if (!videoRef.current) return;
          try {
            await videoRef.current.play();
          } catch (err) {
            console.error("Autoplay failed:", err);
          }
        };

        videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

        try {
          // Intento de reproducción inmediata
          await videoRef.current.play();
        } catch (err) {
          console.warn("Initial play failed, waiting for metadata or retrying...");
          if (isMounted) {
            // Reintento con delay para dar tiempo al hardware de la tablet (común en Samsung)
            setTimeout(() => {
              if (isMounted && videoRef.current) {
                videoRef.current.play().catch(e => console.error("Final play attempt failed:", e));
              }
            }, 500);
          }
        }

        return () => {
          if (videoRef.current) {
            videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
          }
        };
      }
    };

    setupVideo();
    return () => { isMounted = false; };
  }, [isCameraActive, stream]);

  // Limpiar stream al desmontar
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async (mode: 'user' | 'environment' = facingMode) => {
    setIsLoading(true);
    
    // Detener tracks anteriores para liberar el hardware
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }

    // Pequeña pausa para permitir que el hardware se libere antes del nuevo acceso
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Cámara no soportada por el navegador");
      }

      // En tablets Android, a veces las restricciones de resolución causan fallos.
      // Intentamos primero con la cámara deseada pero sin forzar resolución estricta.
      const attempts = [
        // Intento 1: Modo deseado con resolución ideal
        { video: { facingMode: { ideal: mode }, width: { ideal: 1280 }, height: { ideal: 720 } } },
        // Intento 2: Solo modo deseado (más compatible)
        { video: { facingMode: mode } },
        // Intento 3: Cualquier cámara de video
        { video: true }
      ];

      let mediaStream: MediaStream | null = null;
      let lastError: any = null;

      for (const constraints of attempts) {
        try {
          mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
          if (mediaStream) break;
        } catch (e) {
          lastError = e;
          console.warn(`Intento de cámara fallido con: ${JSON.stringify(constraints)}`, e);
        }
      }

      if (!mediaStream) throw lastError || new Error("No se pudo obtener el stream de video");

      setStream(mediaStream);
      setFacingMode(mode);
      setIsCameraActive(true);
    } catch (err) {
      console.error("Error final de cámara:", err);
      const msg = lang === 'es' 
        ? "No se pudo acceder a la cámara. Por favor:\n1. Asegúrate de usar Google Chrome.\n2. Verifica que el sitio tenga permisos de cámara.\n3. Asegúrate de estar en una conexión segura (HTTPS)." 
        : "Could not access camera. Please:\n1. Use Google Chrome.\n2. Check site permissions.\n3. Ensure you're on a secure connection (HTTPS).";
      alert(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCamera = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    startCamera(nextMode);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !videoRef.current.videoWidth) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Dibujar el frame actual
      ctx.drawImage(videoRef.current, 0, 0);
      const base64 = canvas.toDataURL('image/jpeg', 0.8);
      stopCamera();
      onCapture(base64);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  };

  return (
    <div className="flex flex-col items-center justify-center py-4 md:py-8 space-y-6 animate-in fade-in duration-500 max-w-2xl mx-auto w-full">
      <div className="text-center space-y-2 px-4">
        <h3 className="text-xl md:text-2xl font-bold text-noga-deepteal uppercase tracking-widest">{t.idTitle}</h3>
        <p className="text-xs md:text-sm text-noga-deepteal/60">{t.idSub}</p>
      </div>

      {!isCameraActive ? (
        <div className="w-full aspect-[4/3] md:aspect-[3/2] bg-noga-lightblue/20 rounded-3xl border-2 border-dashed border-noga-midteal/40 flex flex-col items-center justify-center p-8 space-y-6 mx-4">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-sm text-noga-brown">
            {isLoading ? <Loader2 className="w-10 h-10 animate-spin" /> : <Camera className="w-10 h-10" />}
          </div>
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button 
              disabled={isLoading}
              onClick={() => startCamera('environment')}
              className="bg-noga-deepteal text-white px-6 py-4 rounded-2xl font-bold hover:bg-noga-brown transition-all shadow-xl active:scale-95 disabled:opacity-50 text-sm flex items-center justify-center gap-2"
            >
              {isLoading && facingMode === 'environment' ? <Loader2 className="w-4 h-4 animate-spin" /> : (lang === 'es' ? 'CÁMARA TRASERA' : 'BACK CAMERA')}
            </button>
            <button 
              disabled={isLoading}
              onClick={() => startCamera('user')}
              className="bg-white border-2 border-noga-deepteal text-noga-deepteal px-6 py-4 rounded-2xl font-bold hover:bg-noga-lightblue transition-all shadow-md active:scale-95 disabled:opacity-50 text-sm flex items-center justify-center gap-2"
            >
              {isLoading && facingMode === 'user' ? <Loader2 className="w-4 h-4 animate-spin" /> : (lang === 'es' ? 'CÁMARA FRONTAL' : 'FRONT CAMERA')}
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full space-y-4 px-4">
          <div className="relative rounded-3xl overflow-hidden border-4 border-noga-deepteal shadow-2xl aspect-[4/3] md:aspect-[3/2] bg-black">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`} 
            />
            {/* Guía visual */}
            <div className="absolute inset-0 border-[20px] md:border-[40px] border-black/40 pointer-events-none flex items-center justify-center">
               <div className="w-full h-full border-2 border-dashed border-white/40 rounded-xl"></div>
            </div>
            
            {/* Botón para rotar cámara mientras está activa */}
            <button 
              onClick={toggleCamera}
              className="absolute top-4 right-4 bg-black/60 text-white p-3 rounded-full hover:bg-noga-brown transition-colors shadow-lg active:scale-90"
              title="Cambiar Cámara"
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            {isLoading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={capturePhoto}
              className="flex-1 bg-noga-brown text-white py-5 rounded-2xl font-bold text-lg shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <Camera className="w-6 h-6" /> {t.captureBtn}
            </button>
            <button 
              onClick={stopCamera}
              className="px-6 border-2 border-noga-midteal/30 text-noga-deepteal py-4 rounded-2xl font-bold uppercase text-xs"
            >
              {t.cancel}
            </button>
          </div>
        </div>
      )}

      <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-bold text-noga-midteal uppercase tracking-widest hover:underline pt-2">
        <ArrowLeft className="w-3 h-3" /> {t.back}
      </button>
    </div>
  );
};

export default IdCapture;
