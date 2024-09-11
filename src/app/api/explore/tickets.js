import { Ticket } from "@/models/Ticket";
import mongoose from "mongoose";
import { isAdmin } from "@/utils/isAdmin";
import { NextResponse } from "next/server";
import { Category } from "@/models/Category";
import { Event } from "@/models/Event";

export async function GET(req, { params }) {
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

  const { id } = params;

  if (id) {
    const category = await Category.findById(id);
    if (category) {
      return NextResponse.json(category);
    } else {
      const event = await Event.findById(id);
      if (event) {
        return NextResponse.json(event);
      }
    }
  } else {
    const tickets = await Ticket.find();
    return NextResponse.json(tickets);
  }

  return NextResponse.json({});
}
