const { fileUploadHeader } = require("@/libs/headerToken");

// upload file to api
const uploadFile = async (formData) => {
  const headerReq = await fileUploadHeader();
  const response = await fetch(`${process.env.AUTH_BASE_URL}/file`, {
    method: "POST",
    headers: headerReq,
    body: formData,
  });

  const res = await response.json();
  console.log("file response : ", res);
  return res;
};

// expose each method to the outside
export { uploadFile };
