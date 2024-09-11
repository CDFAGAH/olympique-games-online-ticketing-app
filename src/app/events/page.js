'use client';
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch('/api/events').then(res => {
      res.json().then(events => {
        setEvents(events);
      });
    })
  }, []);

  if (loading) {
    return 'Loading user info...';
  }

  if (!data.admin) {
    return 'Not an admin.';
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link
          className="button flex"
          href={'/events/new'}>
          <span>Create new event</span>
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit event:</h2>
        <div className="grid grid-cols-3 gap-2">
          {events?.length > 0 && events.map(event => (
            <Link
              key={event._id}
              href={'/events/edit/'+event._id}
              className="bg-gray-200 rounded-lg p-4"
            >
              <div className="relative">
                <Image
                  className="rounded-md"
                  src={event.image} alt={event.name} width={200} height={200} />
              </div>
              <div className="text-center">
                {event.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}