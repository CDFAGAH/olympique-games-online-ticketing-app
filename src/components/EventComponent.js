import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const EventComponent = ({ event }) => {
  const router = useRouter();

  const handleEventClick = () => {
    router.push(`/event/${event._id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleEventClick}
    >
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <Image
          src={event.image}
          alt={event.name}
          layout="fill"
          objectFit="cover"
          className="transform hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{event.name}</h3>
        <p className="text-gray-500 mb-2">{event.category}</p>
        <p className="text-gray-700">{event.description}</p>
        <p className="text-gray-700 font-bold mt-2">
          {new Date(event.date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default EventComponent;
