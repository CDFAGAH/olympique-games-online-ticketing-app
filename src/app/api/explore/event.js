import { connectToDatabase } from '../../lib/mongodb';
import { Event } from '@/models/Event';
import { Ticket } from '@/models/Ticket';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    await connectToDatabase();

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const tickets = await Ticket.find({ event: event._id });

    res.status(200).json({ event, tickets });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
