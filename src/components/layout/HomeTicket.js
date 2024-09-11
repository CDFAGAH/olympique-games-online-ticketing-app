'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useEffect, useState } from "react";
import TicketItem from '../tickets/TicketItem';
import EventComponent from "@/components/EventComponent";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function HomeTIckets() {
  const [bestSellers, setBestSellers] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events').then(res => {
      res.json().then(eventData => {
        setEvents(eventData);
      });
    });

    fetch('/api/ticket-items').then(res => {
      res.json().then(menuItems => {
        setBestSellers(menuItems.slice(-3));
      });
    });
  }, []);

  const scrollLeft = () => {
    document.getElementById('event-carousel').scrollLeft -= 300;
  };

  const scrollRight = () => {
    document.getElementById('event-carousel').scrollLeft += 300;
  };

  return (
    <section className="">
      <div className="absolute left-0 right-0 w-full justify-start">
        {/* <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image src={'/pres2.jpeg'} width={109} height={189}  alt={'sallad'} />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image src={'/rec9.jpg'} width={107} height={195} alt={'sallad'} />
        </div> */}
      </div>

      <div className="text-center mb-4 mt-8">
        <SectionHeaders
          subHeader={'Upcoming'}
          mainHeader={'Events'} />
      </div>
      <div className="relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={scrollLeft}>
          <FaChevronLeft size={24} />
        </div>
        <div
          id="event-carousel"
          className="flex gap-4 overflow-x-scroll scroll-smooth scrollbar-hide"
        >
          {events?.length > 0 && events.map(event => (
            <div key={event._id} className="flex-shrink-0 w-[300px]">
              <EventComponent event={event} />
            </div>
          ))}
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={scrollRight}>
          <FaChevronRight size={24} />
        </div>
      </div>

      <div className="text-center mb-4 mt-8">
        <SectionHeaders
          subHeader={'check out'}
          mainHeader={'Our Best Sellers'} />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {bestSellers?.length > 0 && bestSellers.map(item => (
          <TicketItem key={item._id} {...item} />
        ))}
      </div>
    </section>
  );
}