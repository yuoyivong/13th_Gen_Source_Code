const { headerToken } = require("@/libs/headerToken");

// get user info
const getUserInfo = async () => {
  const headerReq = await headerToken();
  const userInfo = await fetch(`${process.env.AUTH_BASE_URL}/author`, {
    headers: headerReq,
  });
  const res = await userInfo.json();
  return res;
};

// expose method
export { getUserInfo };
