'use client';

import { SessionProvider, useSession } from "next-auth/react";
import { AppProvider } from "@/components/AppContext";
import Header from "@/components/layout/Header";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

export default function ClientLayout({ children }) {
 

  return (
    <SessionProvider>
      <AppProvider>
        <Toaster />
        <Header />
        {children}
      </AppProvider>
    </SessionProvider>
  );
}
