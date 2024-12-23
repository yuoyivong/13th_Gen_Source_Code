"use server";
const { uploadFile } = require("@/service/fileUploadService");

// file upload action
const uploadFileAction = async (formData) => {
  const file = await uploadFile(formData);
  console.log("File action : ", file);
  return file;
};

// expose method
export { uploadFileAction };
