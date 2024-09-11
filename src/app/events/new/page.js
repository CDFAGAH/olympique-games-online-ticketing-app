'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import EventForm  from '@/components/layout/EventForm';

export default function NewEventPage() {
  const [redirectToEvents, setRedirectToEvents] = useState(false);
  const { loading, data } = useProfile();

  async function handleFormSubmit(ev, event) {
    ev.preventDefault();
    
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/events", {
        method: "POST",
        body: JSON.stringify(event),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving new event",
      success: "Event saved",
      error: "Error saving event",
    });

    setRedirectToEvents(true);
  }

  if (redirectToEvents) {
    return redirect("/events");
  }

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={"/events"} className="button">
          <span>Show all events</span>
        </Link>
      </div>
      <EventForm onSubmit={handleFormSubmit} />
    </section>
  );
}