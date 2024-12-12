export const getUserToken = () => {
  const token = JSON.parse(localStorage.getItem("userInfo") || null);
  //? user token
  return token?.token;
};
