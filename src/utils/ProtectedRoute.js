import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !loading) {
      if (!user && router.pathname !== "/") {
        router.replace("/");
      }
      if (user && router.pathname === "/") {
        router.replace("/home"); 
      }
    }
  }, [user, loading, isClient, router]);

  if (!isClient || loading) return null;

  return <>{children}</>;
}
