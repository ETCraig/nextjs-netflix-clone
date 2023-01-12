import { jwtVerify } from "jose";

export async function verifyToken(token) {
  try {
    if (token) {
      console.log("token", token);
      let properToken;
      if (typeof token !== 'string') {
        properToken = token.value;
      } else {
        properToken = token;
      }
      const verified = await jwtVerify(
        properToken,
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
