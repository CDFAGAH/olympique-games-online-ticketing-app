'use client';
import TicketForm from "@/components/layout/TicketForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewTicketPage() {
  const [redirectToTickets, setRedirectToTickets] = useState(false);
  const { loading, data } = useProfile();

  async function handleFormSubmit(ev, ticket) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/ticket", {
        method: "POST",
        body: JSON.stringify(ticket),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving new ticket",
      success: "Ticket saved",
      error: "Error saving ticket",
    });

    setRedirectToTickets(true);
  }

  if (redirectToTickets) {
    return redirect("/tickets");
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
        <Link href={"/tickets"} className="button">
          <span>Show all tickets</span>
        </Link>
      </div>
      <TicketForm onSubmit={handleFormSubmit} />
    </section>
  );
}
