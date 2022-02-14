import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleVerify = async (idToken: string) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  ticket.getPayload();

  const { picture: img, email: correo, given_name: nombre, family_name: apellido } = ticket.getPayload()!;

  return { nombre, img, correo, apellido };
};
