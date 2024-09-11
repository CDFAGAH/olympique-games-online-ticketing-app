import authOptions from "@/libs/authOptions";
import { Reservation } from "@/models/Reservation";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { isAdmin } from "@/utils/isAdmin";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL);
    }

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;
    const admin = await isAdmin();

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');

    if (_id) {
      const reservation = await Reservation.findById(_id);
      if (reservation) {
        return NextResponse.json(reservation);
      } else {
        return NextResponse.json({ error: "Reservation not found" }, { status: 404 });
      }
    }

    if (admin) {
      const reservations = await Reservation.find();
      return NextResponse.json(reservations);
    }

    if (userEmail) {
      const userReservations = await Reservation.find({ userEmail });
      return NextResponse.json(userReservations);
    }

    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
