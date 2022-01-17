import path from 'path';
import { v4 } from 'uuid';

export const subirArchivo = (
  files: any,
  extensionesValidas = ['png', 'jpg', 'jpeg'],
  carpeta = ''
) => {
  return new Promise((resolve, reject) => {
    const { imagen }: any = files;
    const nombreCortado = imagen.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];

    //Validar la extensión
    if (!extensionesValidas.includes(extension)) {
      return reject(`La extensión ${extension} no es permitida`);
    }

    const nombreTemp = v4() + '.' + extension;
    const uploadPath = path.join(
      __dirname,
      '../public/uploads/',
      carpeta,
      nombreTemp
    );

    imagen.mv(uploadPath, (err: any) => {
      if (err) {
        reject(err);
      }

      resolve(nombreTemp);
    });
  });
};
