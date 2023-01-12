import { jwtVerify } from "jose";

export async function verifyToken(token) {
  try {
    if (token) {
      console.log("token", token);
      const verified = await jwtVerify(
       token,
        new TextEncoder().encode("terceStIpeek2001keepItSecret1996")
      );
      console.log("verified", verified);
      return verified.payload && verified.payload?.issuer;
    }
    return null;
  } catch (err) {
    console.error({ err });
    return null;
  }
}