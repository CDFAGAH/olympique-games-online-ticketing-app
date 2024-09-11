'use client';
import { CartContext } from "@/components/AppContext";
import Bars2 from "@/components/icons/Bars2";
import ShoppingCart from "@/components/icons/ShoppingCart";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";

function AuthLinks({ status, session }) { // Passed session as a prop
  const userName = session?.user?.name || session?.user?.email;

  if (status === 'authenticated') {
    console.log('User is authenticated:', session);
    return (
      <>
        <Link href={'/profile'} className="whitespace-nowrap">
          Hello, {userName?.split(' ')[0] || userName}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-primary rounded-full text-white px-8 py-2">
          Logout
        </button>
      </>
    );
  }
  if (status === 'unauthenticated') {
    return (
      <>
        <Link href={'/login'}>Login</Link>
        <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
          Register
        </Link>
      </>
    );
  }
  return null;
}

export default function Header() {
  const { data: session, status } = useSession(); // Destructured to get both session data and status
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header>
      <div className="flex items-center md:hidden justify-between">
        <Link className="text-primary font-semibold text-2xl" href={'/'}>
          Olympic games ticketing app
        </Link>
        <div className="flex gap-8 items-center">
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
          <button
            className="p-1 border"
            onClick={() => setMobileNavOpen(prev => !prev)}>
            <Bars2 />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center">
          <Link href={'/'}>Home</Link>
          <Link href={'/tickets'}>Tickets</Link>
          <Link href={'/explore'}>Explore</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
          <AuthLinks status={status} session={session} /> {/* Pass session as prop */}
        </div>
      )}
      <div className="hidden md:flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link className="text-primary font-semibold text-2xl" href={'/'}>
            Olympiads Tickets
          </Link>
          <Link href={'/'}>Home</Link>
          <Link href={'/tickets'}>Tickets</Link>
          <Link href={'/explore'}>Explore</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks status={status} session={session} /> {/* Pass session as prop */}
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
