import { BASE_URL } from "@/const/constant";

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

  return fileResponse;
};

// expose method
export { uploadFile };
