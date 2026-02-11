import jwt from "jsonwebtoken";

export const generateToken = (id, res) => {
  const token = jwt.sign(
    { userId: id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,          // REQUIRED on Render (HTTPS)
    sameSite: "none",      // REQUIRED for cross-domain
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
