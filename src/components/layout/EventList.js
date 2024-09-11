import { useState } from 'react';
import TicketList from './TicketList';

export default function EventList({ events }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
        {events.map((event) => (
          <div
            key={event._id}
            className="p-4 border rounded-lg cursor-pointer hover:bg-gray-200"
            onClick={() => setSelectedEvent(event)}
          >
            <h3 className="font-bold">{event.name}</h3>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      {selectedEvent && <TicketList eventId={selectedEvent._id} />}
    </div>
  );
}
