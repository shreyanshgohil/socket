import bcrypt from 'bcrypt';
// For genrate the password in hashed formate
export const gerateHasedPassword = async (passwordInPlainText) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(passwordInPlainText, salt);
};

export const compareDbAndHasedPasswoed = async (
  dbpassword,
  passwordInPlainText
) => {
  return await bcrypt.compare(passwordInPlainText, dbpassword)
};
