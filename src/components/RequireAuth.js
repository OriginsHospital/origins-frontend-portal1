import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { PageLoader } from "@/components/ui";

export function RequireAuth({ role, children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (role && user.accountType !== role) {
      router.replace(user.accountType === "super_admin" ? "/admin" : "/patient");
    }
  }, [user, loading, role, router]);

  if (loading || !user) return <PageLoader />;
  if (role && user.accountType !== role) return <PageLoader />;
  return children;
}
