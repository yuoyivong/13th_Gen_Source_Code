import { uploadFileAction } from "@/actions/upload-file-action";

// function for handling upload file image
const handleUploadFile = async (file: File) => {
  const response = await uploadFileAction(file);
  return response;
};

// expose this method
export { handleUploadFile };
