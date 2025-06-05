import { BASE_URL } from "@/const/constant";
import { APIResponse } from "@/types/response/api-response";
import { FileMetadata } from "@/types/response/file-response";

const uploadFile = async (file: File) => {
  console.log("FIle : ", file);
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/file/upload-file`, {
    method: "POST",
    body: formData,
  });

  const fileResponse = await response.json();
  console.log("File response ; ", fileResponse);

  return fileResponse as APIResponse<FileMetadata>;
};

// expose method
export { uploadFile };
