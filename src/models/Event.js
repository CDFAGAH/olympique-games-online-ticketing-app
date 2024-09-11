import { model, models, Schema } from "mongoose";
import mongoose from 'mongoose';

const eventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  capacity: { type: Number, required: true },
  availableTickets: { type: Number, required: true },
}, { timestamps: true });

export const Event = models?.Event || model('Event', eventSchema);