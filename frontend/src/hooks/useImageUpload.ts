import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useImageUpload = (bucketName: "place-images" | "event-images") => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadImages = async (files: File[]): Promise<string[]> => {
    if (!files || files.length === 0) {
      return [];
    }

    setUploading(true);
    setUploadProgress(0);

    const uploadedUrls: string[] = [];
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast({
        title: "Error de autenticación",
        description: "Necesitás iniciar sesión para subir imágenes",
        variant: "destructive",
      });
      setUploading(false);
      return [];
    }

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast({
            title: "Archivo inválido",
            description: `${file.name} no es una imagen válida`,
            variant: "destructive",
          });
          continue;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "Archivo muy grande",
            description: `${file.name} supera el tamaño máximo de 5MB`,
            variant: "destructive",
          });
          continue;
        }

        const fileExt = file.name.split(".").pop();
        const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          console.error("Upload error:", error);
          toast({
            title: "Error al subir imagen",
            description: error.message,
            variant: "destructive",
          });
          continue;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from(bucketName)
          .getPublicUrl(data.path);

        uploadedUrls.push(publicUrl);
        setUploadProgress(((i + 1) / files.length) * 100);
      }

      if (uploadedUrls.length > 0) {
        toast({
          title: "Imágenes subidas",
          description: `${uploadedUrls.length} imagen(es) subida(s) exitosamente`,
        });
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Error al subir imágenes",
        description: error.message || "Ocurrió un error inesperado",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }

    return uploadedUrls;
  };

  const deleteImage = async (imageUrl: string): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error de autenticación",
          description: "Necesitás iniciar sesión para eliminar imágenes",
          variant: "destructive",
        });
        return false;
      }

      // Extract path from URL
      const urlParts = imageUrl.split(`/storage/v1/object/public/${bucketName}/`);
      if (urlParts.length !== 2) {
        toast({
          title: "URL inválida",
          description: "No se pudo extraer la ruta de la imagen",
          variant: "destructive",
        });
        return false;
      }

      const filePath = urlParts[1];

      const { error } = await supabase.storage
        .from(bucketName)
        .remove([filePath]);

      if (error) {
        console.error("Delete error:", error);
        toast({
          title: "Error al eliminar imagen",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      return true;
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({
        title: "Error al eliminar imagen",
        description: error.message || "Ocurrió un error inesperado",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    uploadImages,
    deleteImage,
    uploading,
    uploadProgress,
  };
};
