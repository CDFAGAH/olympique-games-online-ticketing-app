'use client';

import SearchEvents from "../../components/layout/SearchEvents";

export default function ExplorePage() {
  return (
    <section className="mt-8 p-4">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">Explore Events</h1>
        <p className="text-gray-500">Search and explore events and their tickets</p>
      </div>
      <SearchEvents />
    </section>
  );
}


