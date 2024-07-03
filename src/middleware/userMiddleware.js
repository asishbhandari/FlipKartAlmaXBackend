import { verifyToken } from "../utilities/jwt.js";

export const authentication = async (req, res, next) => {
  try {
    // checking for access token
    const token = req.cookies.AccessToken;
    if (!token) return res.status(401).send({ message: "Un-Authenticate" });

    // verifying the access token and getting user if from it
    const decoded = verifyToken(token);
    if (!decoded)
      return res.status(401).send({ message: "Verification Failed" });
    res.locals.userId = decoded.userId;

    next();
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error while Authenticating", error: error.message });
  }
};
