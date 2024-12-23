// login service
export const loginService = async (userCredentials) => {
  const res = await fetch(`${process.env.AUTH_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCredentials),
  });

  const user = await res.json();

  return user;
};
