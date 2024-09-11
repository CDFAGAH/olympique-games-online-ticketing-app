import { Ticket } from "@/models/Ticket";
import mongoose from "mongoose";
import { isAdmin } from "@/utils/isAdmin";
import { NextResponse } from "next/server";

export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

  if (await isAdmin(req)) {
    const data = await req.json();
    const ticket = await Ticket.create(data);
    return NextResponse.json(ticket);
  } else {
    return NextResponse.json({});
  }
}

export async function PUT(req) {
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

  if (await isAdmin(req)) {
    const { _id, ...data } = await req.json();
    await Ticket.findByIdAndUpdate(_id, data);
    return NextResponse.json(true);
  } else {
    return NextResponse.json(false);
  }
}

export async function GET(req) {
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

  if (await isAdmin(req)) {
    const tickets = await Ticket.find();
    return NextResponse.json(tickets);
  } else {
    return NextResponse.json([]);
  }
}

export async function DELETE(req) {
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');

  if (await isAdmin(req)) {
    await Ticket.deleteOne({ _id });
    return NextResponse.json(true);
  } else {
    return NextResponse.json(false);
  }
}
