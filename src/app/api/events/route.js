import { Event } from '@/models/Event';
import { isAdmin } from '@/utils/isAdmin';
import mongoose from "mongoose";


export async function POST(request) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const { name, description, date, category, location, image, capacity, availableTickets } = await request.json();

    if (await isAdmin()) {
      const event = await Event.create({
        name,
        description,
        date,
        category,
        location,
        image,
        capacity,
        availableTickets,
      });

      return new Response(JSON.stringify(event), {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify({ message: "Not authorized" }), {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error creating event" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } finally {
    await mongoose.disconnect();
  }
}

export async function PUT(request) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const { _id, ...updateData } = await request.json();

    if (await isAdmin()) {
      const event = await Event.findByIdAndUpdate(_id, updateData, { new: true });
      return new Response(JSON.stringify(event), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify({ message: "Not authorized" }), {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error updating event" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } finally {
    await mongoose.disconnect();
  }
}

export async function DELETE(request) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const { _id } = await request.json();

    if (await isAdmin()) {
      await Event.findByIdAndDelete(_id);
      return new Response(JSON.stringify({ message: "Event deleted" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify({ message: "Not authorized" }), {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error deleting event" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } finally {
    await mongoose.disconnect();
  }
}

export async function GET(request) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const events = await Event.find();
    return new Response(JSON.stringify(events), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error fetching events" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } finally {
    await mongoose.disconnect();
  }
}