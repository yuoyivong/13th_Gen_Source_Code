"use server";
import { uploadFile } from "@/services/file-upload-service";

const uploadFileAction = async (file: File) => {
  const response = await uploadFile(file);
  return response;
};

// expose method
export { uploadFileAction };
