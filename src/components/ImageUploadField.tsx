import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2 } from "lucide-react";
import { useImageUpload } from "@/hooks/useImageUpload";
import { Progress } from "@/components/ui/progress";

interface ImageUploadFieldProps {
  value: string[];
  onChange: (urls: string[]) => void;
  bucketName: "place-images" | "event-images";
  maxImages?: number;
  label?: string;
}

export const ImageUploadField = ({
  value = [],
  onChange,
  bucketName,
  maxImages = 6,
  label = "Imágenes",
}: ImageUploadFieldProps) => {
  const { uploadImages, deleteImage, uploading, uploadProgress } = useImageUpload(bucketName);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + value.length > maxImages) {
      alert(`Podés subir hasta ${maxImages} imágenes`);
      return;
    }
    setPendingFiles(files);
  };

  const handleUpload = async () => {
    if (pendingFiles.length === 0) return;
    
    const urls = await uploadImages(pendingFiles);
    if (urls.length > 0) {
      onChange([...value, ...urls]);
      setPendingFiles([]);
      // Reset file input
      const input = document.getElementById("image-upload") as HTMLInputElement;
      if (input) input.value = "";
    }
  };

  const handleRemove = async (url: string) => {
    const success = await deleteImage(url);
    if (success) {
      onChange(value.filter((u) => u !== url));
    }
  };

  const canAddMore = value.length < maxImages;

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="image-upload">{label}</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Máximo {maxImages} imágenes. Tamaño máximo: 5MB por imagen.
        </p>
      </div>

      {/* Current images */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {value.map((url, idx) => (
            <div key={idx} className="relative group">
              <img
                src={url}
                alt={`Imagen ${idx + 1}`}
                className="w-full h-32 object-cover rounded-lg border"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemove(url)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Upload new images */}
      {canAddMore && (
        <div className="space-y-2">
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("image-upload")?.click()}
            disabled={uploading}
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            Seleccionar imágenes ({value.length}/{maxImages})
          </Button>

          {pendingFiles.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {pendingFiles.length} archivo(s) seleccionado(s)
              </p>
              <Button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
                className="w-full"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Subiendo...
                  </>
                ) : (
                  "Subir imágenes"
                )}
              </Button>
              {uploading && (
                <Progress value={uploadProgress} className="w-full" />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
