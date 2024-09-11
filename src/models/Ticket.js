import mongoose from "mongoose";

import { model, models, Schema, Types } from "mongoose";

const ticketSchema = new Schema({
  category: {type: mongoose.Types.ObjectId},
  event: { type: mongoose.Types.ObjectId, ref: 'Event', required: true },
  type: { type: String, enum: ['solo', 'family', 'group'], default: 'solo' },
  basePrice: { type: Number, },
  numberOfPlaces: { type: Number,},
  image: { type: String, },
  qrCode: { type: String, default: () => new Types.ObjectId().toString() },
}, { timestamps: false });


export const Ticket = models?.Ticket || model('Ticket', ticketSchema);