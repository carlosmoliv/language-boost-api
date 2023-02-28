import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  return bcrypt.hash(password, salt);
};

export const comparePasswords = (
  plainPassword: string,
  hashedPassword: string
) => bcrypt.compare(plainPassword, hashedPassword);
