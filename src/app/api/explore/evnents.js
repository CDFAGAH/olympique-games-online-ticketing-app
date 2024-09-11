import { Event } from '@/models/Event';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    const { searchQuery } = req.query;

    const events = await Event.find({
      $or: [
        { name: new RegExp(searchQuery, 'i') },
        { description: new RegExp(searchQuery, 'i') },
        { location: new RegExp(searchQuery, 'i') },
        { category: new RegExp(searchQuery, 'i') }
      ]
    });

    return res.status(200).json(events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching events' });
  } finally {
    await mongoose.disconnect();
  }
}
