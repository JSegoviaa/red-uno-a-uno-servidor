import { Schema, model } from 'mongoose';

interface Inmueble {}

const InmuebleSchema = new Schema<Inmueble>({});

export const Inmueble = model<Inmueble>('Inmueble', InmuebleSchema);
