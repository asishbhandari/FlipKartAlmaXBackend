import jwt from "jsonwebtoken";

export const generateToken = (data) => {
  return jwt.sign(data, process.env.JSON_WEB_SECRET, {
    expiresIn: 2 * 3600000,
  });
};

export const verifyToken = (accessToken) => {
  return jwt.verify(accessToken, process.env.JSON_WEB_SECRET);
};
