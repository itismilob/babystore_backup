const emailRegex = /^\S+@\S+\.\S+$/;
export const checkEmail = (targetEmail) => {
  if (emailRegex.test(targetEmail)) return true;
  return false;
};

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const checkPassword = (targetPassword) => {
  if (passwordRegex.test(targetPassword)) return true;
  return false;
};
