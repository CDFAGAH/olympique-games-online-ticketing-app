import mongoose from "mongoose";
import { Ticket } from "@/models/Ticket";
import { isAdmin } from "@/utils/isAdmin";

async function connectToDatabase() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();

    if (await isAdmin(req)) {
      const ticketDoc = await Ticket.create(data);
      return new Response(JSON.stringify(ticketDoc), { status: 201 });
    } else {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectToDatabase();
    if (await isAdmin(req)) {
      const { _id, ...data } = await req.json();
      await Ticket.findByIdAndUpdate(_id, data);
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const tickets = await Ticket.find();
    return new Response(JSON.stringify(tickets), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectToDatabase();
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');

    if (await isAdmin(req)) {
      await Ticket.deleteOne({ _id });
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
