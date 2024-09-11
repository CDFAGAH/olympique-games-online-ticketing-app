'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import TicketItem from "@/components/tickets/TicketItem";
import { useEffect, useState } from "react";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchMenuItems = async () => {
      try {
        const res = await fetch('/api/ticket-items');
        const data = await res.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching ticket items:', error);
      }
    };

    fetchCategories();
    fetchMenuItems();
  }, []);

  return (
    <section className="mt-8">
      {categories.map(category => (
        <div key={category._id}>
          <div className="text-center">
            <SectionHeaders mainHeader={category.name} />
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
            {menuItems.filter(item => item.category === category._id).map(item => (
              <TicketItem key={item._id} {...item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
