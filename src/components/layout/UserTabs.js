'use client';
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function UserTabs({isAdmin}) {
  const path = usePathname();
  return (
    <div className="flex mx-auto gap-2 tabs justify-center flex-wrap">
      <Link
        className={path === '/profile' ? 'active' : ''}
        href={'/profile'}
      >
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            href={'/categories'}
            className={path === '/categories' ? 'active' : ''}
          >
            Categories
          </Link>
          <Link
            className={path.includes('/events') ? 'active' : ''}
            href={'/events'}
          >
            Events
          </Link>
          <Link
            href={'/ticket-items'}
            className={path.includes('menu-items') ? 'active' : ''}
          >
          Ticket
            </Link>
          <Link
            className={path.includes('/users') ? 'active' : ''}
            href={'/users'}
          >
            Users
          </Link>
        </>
      )}
      <Link
        className={path === '/reservations' ? 'active' : ''}
        href={'/reservations'}
      >
        Reservations
      </Link>
    </div>
  );
}