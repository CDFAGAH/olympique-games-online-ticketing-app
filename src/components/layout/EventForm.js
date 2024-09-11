'use client';
import { useState } from 'react';

export default function EventForm({ event = {}, onSubmit }) {
  const [name, setName] = useState(event.name || '');
  const [description, setDescription] = useState(event.description || '');
  const [date, setDate] = useState(event.date ? new Date(event.date).toISOString().slice(0, 10) : '');
  const [category, setCategory] = useState(event.category || '');
  const [location, setLocation] = useState(event.location || '');
  const [imageLink, setImageLink] = useState(event.image || '');
  const [capacity, setCapacity] = useState(event.capacity || 0);
  const [availableTickets, setAvailableTickets] = useState(event.availableTickets || 0);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(e, {
      name,
      description,
      date: new Date(date),
      category,
      location,
      image: imageLink,
      capacity,
      availableTickets,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="name" className="block font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="date" className="block font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="location" className="block font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="imageLink" className="block font-medium text-gray-700">
          Image Link
        </label>
        <input
          type="text"
          id="imageLink"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="capacity" className="block font-medium text-gray-700">
          Capacity
        </label>
        <input
          type="number"
          id="capacity"
          value={capacity}
          onChange={(e) => setCapacity(parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="availableTickets" className="block font-medium text-gray-700">
          Available Tickets
        </label>
        <input
          type="number"
          id="availableTickets"
          value={availableTickets}
          onChange={(e) => setAvailableTickets(parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <button type="submit" className="button">
        Save
      </button>
    </form>
  );
}