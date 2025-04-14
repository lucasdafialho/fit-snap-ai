
import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Camera, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageCapture: (file: File) => void;
  className?: string;
}

export function ImageUploader({ onImageCapture, className }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      // In a real app, we would implement camera functionality here
      // This is just a placeholder to show the design
      alert("Camera functionality would open here");
      
      // Clean up
      stream.getTracks().forEach(track => track.stop());
      
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please check permissions.");
    }
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
      alert("Please upload an image file");
    }
  };

  const clearImage = () => {
    setPreviewImage(null);
    if (inputRef.current) inputRef.current.value = "";
  };

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
              <p className="text-xl font-medium">Drop your food image here</p>
              <p className="text-sm text-muted-foreground">
                Or click to browse from your device
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Button 
              onClick={handleButtonClick} 
              className="bg-neon text-background hover:bg-neon/90"
            >
              <Upload className="mr-2 h-4 w-4" /> Browse Files
            </Button>
            <Button 
              variant="outline" 
              className="border-neon text-neon hover:bg-neon/10"
              onClick={takePicture}
            >
              <Camera className="mr-2 h-4 w-4" /> Take Picture
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
