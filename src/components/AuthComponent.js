import { useSession } from "next-auth/react";

export default function AuthComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return <div>Welcome, {session?.user?.name}!</div>;
  }

  return <div>You are not logged in</div>;
}
