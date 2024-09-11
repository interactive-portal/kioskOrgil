import axios from "axios";
import { useState } from "react";

export default function useCloudinaryImageUploadV2() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const uploadImageToCloudinary = async ({
    imageFile,
    subfolder = "",
    cloudinaryProvider = "motonews",
  }: {
    imageFile: any;
    subfolder?: string;
    cloudinaryProvider?:
      | "motonews"
      | "motoautozar1"
      | "motoautozar2"
      | "motoautozar3";
  }) => {
    const cloudinaryProviderList: any = {
      motonews: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_MOTONEWS_CLOUDNAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_MOTONEWS_UPLOADPRESET,
      },
      motoautozar1: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_MOTOAUTOZAR1_CLOUDNAME,
        uploadPreset:
          process.env.NEXT_PUBLIC_CLOUDINARY_MOTOAUTOZAR1_UPLOADPRESET,
      },
      motoautozar2: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_MOTOAUTOZAR2_CLOUDNAME,
        uploadPreset:
          process.env.NEXT_PUBLIC_CLOUDINARY_MOTOAUTOZAR2_UPLOADPRESET,
      },
      motoautozar3: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_MOTOAUTOZAR3_CLOUDNAME,
        uploadPreset:
          process.env.NEXT_PUBLIC_CLOUDINARY_MOTOAUTOZAR3_UPLOADPRESET,
      },
    };

    const cloudName =
      cloudinaryProviderList?.[cloudinaryProvider]?.cloudName || "";
    const uploadPreset =
      cloudinaryProviderList?.[cloudinaryProvider]?.uploadPreset || "";

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", uploadPreset || "");
      formData.append("public_id", `${subfolder}/${imageFile.name}`);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        {
          // onUploadProgress: (progressEvent) => {
          //   const progress = Math.round(
          //     (progressEvent.loaded * 100) / progressEvent.total
          //   );
          //   setUploadProgress(progress);
          // },
          // auth: {
          //   username: apiKey,
          //   password: apiSecret,
          // },
        }
      );

      const result = response.data.secure_url;

      setIsLoading(false);

      return result;
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsLoading(false);
      return null;
    }
  };

  return {
    uploadProgress,
    isLoading,
    uploadImageToCloudinary,
  };
}
