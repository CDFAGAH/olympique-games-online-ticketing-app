'use client';
import React, { useState } from 'react';
import EventComponent from '../EventComponent';

const SearchEvents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noEventsFound, setNoEventsFound] = useState(false);

  const fetchEvents = async () => {
    if (!searchQuery.trim()) {
      setNoEventsFound(true);
      setEvents([]);
      return;
    }

    setLoading(true);
    setNoEventsFound(false);

    try {
      const query = new URLSearchParams({ searchQuery }).toString();
      const response = await fetch(`/api/explore/events?${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (data.length === 0) {
        setNoEventsFound(true);
      } else {
        setEvents(data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setNoEventsFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchEvents();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Search Events</h1>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
      {loading ? (
        <div className="text-center text-blue-500">
          <svg className="animate-spin h-5 w-5 mr-3 inline" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          Loading...
        </div>
      ) : noEventsFound ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {events.map((event) => (
            <EventComponent key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchEvents;
