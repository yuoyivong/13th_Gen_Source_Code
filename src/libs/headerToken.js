const { auth } = require("@/auth");

// header for normal service
const headerToken = async () => {
  const session = await auth();
  return {
    Authorization: `Bearer ${session.accessToken}`,
    "Content-Type": "application/json",
  };
};

// header for file upload
const fileUploadHeader = async () => {
  const session = await auth();
  return {
    accept: "*/*",
    Authorization: `Bearer ${session?.accessToken}`,
  };
};

export { headerToken, fileUploadHeader };
