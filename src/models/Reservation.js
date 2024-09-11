import { model, models, Schema } from "mongoose";
import mongoose from 'mongoose';


const ReservationSchema = new Schema({
  userEmail: String,
  phone: String,
  streetAddress: String,
  postalCode: String,
  city: String,
  country: String,
  cartProducts: Object,
  paid: {type: Boolean, default: false},
}, {timestamps: true});

export const Reservation = models?.Reservation || model('Reservation', ReservationSchema);