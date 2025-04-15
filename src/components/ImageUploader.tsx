import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Camera, Upload, X, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageCapture: (file: File) => void;
  className?: string;
}

export function ImageUploader({ onImageCapture, className }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Limpar o stream quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const takePicture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Erro ao acessar câmera:", err);
      alert("Não foi possível acessar a câmera. Verifique as permissões.");
    }
  };

  const capturePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Configurar o canvas com as dimensões do vídeo
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Desenhar o quadro atual do vídeo no canvas
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Converter para blob
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `food-snap-${Date.now()}.jpg`, { type: 'image/jpeg' });
          processFile(file);
          stopCamera();
        }
      }, 'image/jpeg', 0.95);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const processFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
        onImageCapture(file);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Por favor, envie um arquivo de imagem");
    }
  };

  const clearImage = () => {
    setPreviewImage(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  // Renderização condicional baseada no estado
  if (isCameraActive) {
    return (
      <div className={cn("relative w-full", className)}>
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline
          className="w-full h-auto rounded-2xl border border-border"
        />
        <canvas ref={canvasRef} className="hidden" />
        
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
          <Button 
            onClick={stopCamera} 
            variant="destructive"
            size="icon"
            className="rounded-full w-12 h-12"
          >
            <X className="h-6 w-6" />
          </Button>
          
          <Button 
            onClick={capturePicture} 
            className="bg-neon text-background hover:bg-neon/90 rounded-full w-16 h-16 flex items-center justify-center"
          >
            <div className="w-12 h-12 rounded-full border-4 border-background flex items-center justify-center">
              <div className="w-10 h-10 bg-neon rounded-full"></div>
            </div>
          </Button>
          
          <Button 
            onClick={() => {
              if (streamRef.current) {
                // Alternar entre câmeras frontal e traseira
                stopCamera();
                setTimeout(() => takePicture(), 300);
              }
            }} 
            variant="secondary"
            size="icon"
            className="rounded-full w-12 h-12"
          >
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {!previewImage ? (
        <div
          className={cn(
            "relative flex flex-col items-center justify-center w-full min-h-[300px] border-2 border-dashed rounded-2xl p-8 transition-all duration-300",
            dragActive ? "border-neon bg-neon/5" : "border-border bg-card/50",
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="rounded-full bg-muted p-6">
              <Upload className="h-10 w-10 text-neon" />
            </div>
            <div className="space-y-1">
              <p className="text-xl font-medium">Arraste sua imagem aqui</p>
              <p className="text-sm text-muted-foreground">
                Ou clique para escolher do seu dispositivo
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Button 
              onClick={handleButtonClick} 
              className="bg-neon text-background hover:bg-neon/90"
            >
              <Upload className="mr-2 h-4 w-4" /> Escolher Arquivo
            </Button>
            <Button 
              variant="outline" 
              className="border-neon text-neon hover:bg-neon/10"
              onClick={takePicture}
            >
              <Camera className="mr-2 h-4 w-4" /> Tirar Foto
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden">
          <img 
            src={previewImage} 
            alt="Preview" 
            className="w-full h-auto object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button 
              variant="secondary" 
              size="icon"
              className="absolute top-4 right-4 rounded-full bg-background/80 backdrop-blur-sm hover:bg-destructive"
              onClick={clearImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
