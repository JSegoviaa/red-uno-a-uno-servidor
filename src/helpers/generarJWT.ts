import jwt from 'jsonwebtoken';

export const generarJWT = (uid: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(payload, process.env.JWT!, { expiresIn: '30d' }, (err, token) => {
      if (err) {
        console.log(err);
        reject('No se pudo generar el token');
      } else {
        resolve(token);
      }
    });
  });
};

export const comprobarJWT = (token: any) => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT!) as any;

    return [true, uid];
  } catch (error) {
    console.log(error);
    return [false, null];
  }
};
