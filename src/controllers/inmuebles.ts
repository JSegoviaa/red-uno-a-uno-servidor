import { Response, Request } from 'express';
import { v2 } from 'cloudinary';
import { Inmueble } from '../models/inmuebles';

export const obtenerInmuebles = async (req: Request, res: Response) => {
  const { limite = 20, desde = 0 } = req.query;
  const query = { publicado: true };

  const [total, inmuebles] = await Promise.all([
    Inmueble.countDocuments(query),
    Inmueble.find(query)
      .populate('usuario', ['nombre', 'apellido', 'correo'])
      .populate('categoria', 'nombre')
      .populate('tipoPropiedad', 'nombre')
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({ ok: true, total, inmuebles });
};

export const obtenerInmueblePorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const inmueble = await Inmueble.findById(id)
    .populate('usuario', ['nombre', 'apellido', 'correo', 'telefonoPersonal', 'telefonoOficina'])
    .populate('categoria', 'nombre')
    .populate('tipoPropiedad', 'nombre');

  res.json({ ok: true, inmueble });
};

export const obtenerInmueblesLista = async (req: Request, res: Response) => {
  const { direccion, limite = 20 } = req.query;
  const query = { publicado: true, direccion: { $regex: direccion } };

  const [total, inmuebles] = await Promise.all([
    Inmueble.countDocuments(query),
    Inmueble.find(query).populate('categoria', 'nombre').populate('tipoPropiedad', 'nombre').limit(Number(limite)),
  ]);

  res.json({ ok: true, total, inmuebles });
};

export const obtenerInmueblePorDir = async (req: Request, res: Response) => {
  const { direccion } = req.query;

  const inmuebles = await Inmueble.find({
    direccion: { $regex: direccion },
  })
    .populate('categoria', 'nombre')
    .populate('tipoPropiedad', 'nombre');
  res.json({ ok: true, inmuebles });
};

export const obtenerInmueblePorURL = async (req: Request, res: Response) => {
  const { id } = req.params;

  const inmueble = await Inmueble.findOne({ slug: id })
    .populate('usuario', [
      'nombre',
      'apellido',
      'correo',
      'telefonoPersonal',
      'telefonoOficina',
      'facebookpage',
      'instagram',
      'twitter',
      'img',
      'direccionFisica',
    ])
    .populate('categoria', 'nombre')
    .populate('tipoPropiedad', 'nombre');

  res.json({ ok: true, inmueble });
};

export const crearInmuebles = async (req: any, res: Response) => {
  const { publicado, estado, usuario, ...body } = req.body;

  const data = {
    ...body,
    titulo: body.titulo,
    usuario: req.usuario._id,
  };

  const inmueble = new Inmueble(data);

  await inmueble.save();

  res.json({
    ok: true,
    msg: 'Se ha creado el inmueble exitosamente',
    inmueble,
  });
};

export const actualizarInmueble = async (req: any, res: Response) => {
  const { id } = req.params;
  const { usuario, estado, ...data } = req.body;

  data.usuario = req.usuario._id;

  const inmueble = await Inmueble.findByIdAndUpdate(id, data, { new: true });
  res.json({ ok: true, msg: 'Inmueble actualizado exitosamente', inmueble });
};

export const eliminarInmueble = async (req: Request, res: Response) => {
  const { id } = req.params;

  const inmueble = await Inmueble.findById(id);

  if (inmueble!.imgs.length > 0) {
    inmueble!.imgs.map((img) => {
      const nombreArr = img.split('/');
      const nombre = nombreArr[nombreArr.length - 1];
      const [public_id] = nombre.split('.');

      v2.uploader.destroy(`red1a1/usuarios/${inmueble?.usuario}/inmuebles/${id}/${public_id}`);
    });
  }

  const inmuebleBorrado = await Inmueble.findByIdAndDelete(id, { new: true });
  res.json({ ok: true, msg: 'Inmueble eliminado con éxito', inmuebleBorrado });
};

export const obtenerInmueblesPorUsuario = async (req: Request, res: Response) => {
  const { limite = 20, desde = 0, orden = 'createdAt' } = req.query;
  const { id } = req.params;

  const [total, inmueblesUsuario] = await Promise.all([
    Inmueble.countDocuments({ usuario: id }),
    Inmueble.find({ usuario: id }).skip(Number(desde)).limit(Number(limite)).sort(orden),
  ]);

  res.json({
    ok: true,
    total,
    inmueblesUsuario,
  });
};

export const obtenerInmueblePorCoordenadas = async (req: Request, res: Response) => {
  const {
    lat_south_east = Number(1),
    lng_south_east = Number(1),
    lat_south_west = Number(1),
    lng_south_west = Number(1),
    lat_north_east = Number(1),
    lng_north_east = Number(1),
    lat_north_west = Number(1),
    lng_north_west = Number(1),
    categoria,
    tipoPropiedad,
  } = req.query;
  const query = { publicado: true, categoria, tipoPropiedad };
  try {
    const inmuebles = await Inmueble.find(query)
      .populate('categoria', 'nombre')
      .populate('tipoPropiedad', 'nombre')
      .where('lat')
      .lt(Number(lat_north_east) && Number(lat_north_west))
      .where('lat')
      .gt(Number(lat_south_east) && Number(lat_south_west))
      .where('lng')
      .lt(Number(lng_south_east) && Number(lng_north_east))
      .where('lng')
      .gt(Number(lng_north_west) && Number(lng_south_west));
    res.json({ ok: true, inmuebles });
  } catch (error) {
    console.log(error);
  }
};

export const obtenerInmueblesListaCoords = async (req: Request, res: Response) => {
  const {
    limite = 20,
    lat_south_east = Number(1),
    lng_south_east = Number(1),
    lat_south_west = Number(1),
    lng_south_west = Number(1),
    lat_north_east = Number(1),
    lng_north_east = Number(1),
    lat_north_west = Number(1),
    lng_north_west = Number(1),
    categoria,
    tipoPropiedad,
  } = req.query;
  const query = { publicado: true, categoria, tipoPropiedad };

  try {
    const [total, inmuebles] = await Promise.all([
      Inmueble.countDocuments(query)
        .where('lat')
        .lt(Number(lat_north_east) && Number(lat_north_west))
        .where('lat')
        .gt(Number(lat_south_east) && Number(lat_south_west))
        .where('lng')
        .lt(Number(lng_south_east) && Number(lng_north_east))
        .where('lng')
        .gt(Number(lng_north_west) && Number(lng_south_west)),
      Inmueble.find(query)
        .populate('categoria', 'nombre')
        .populate('tipoPropiedad', 'nombre')
        .where('lat')
        .lt(Number(lat_north_east) && Number(lat_north_west))
        .where('lat')
        .gt(Number(lat_south_east) && Number(lat_south_west))
        .where('lng')
        .lt(Number(lng_south_east) && Number(lng_north_east))
        .where('lng')
        .gt(Number(lng_north_west) && Number(lng_south_west))
        .limit(Number(limite)),
    ]);

    res.json({ ok: true, total, inmuebles });
  } catch (error) {
    console.log(error);
  }
};

export const obtenerInmueblePorTipo = async (req: Request, res: Response) => {
  const { tipoPropiedad } = req.query;

  const query = { publicado: true, tipoPropiedad };

  const [total] = await Promise.all([Inmueble.countDocuments(query), Inmueble.find(query)]);

  res.json({ ok: true, total });
};

export const obtenerInmueblePorCategoria = async (req: Request, res: Response) => {
  const { categoria } = req.query;

  const query = { publicado: true, categoria };

  const [total] = await Promise.all([Inmueble.countDocuments(query), Inmueble.find(query)]);

  res.json({ ok: true, total });
};

export const obtenerInmueblesPorFecha = async (req: Request, res: Response) => {
  const { createdAt } = req.query;

  const query = { publicado: true, createdAt };

  const [total] = await Promise.all([
    Inmueble.countDocuments(query).where('createdAt').gt(Number(createdAt)),
    Inmueble.find(query),
  ]);

  res.json({ ok: true, total });
};
