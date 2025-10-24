import { AdminPanel } from "@/components/AdminPanel";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Admin Panel - Brand Life Co",
  description: "Administrative dashboard for Brand Life Co",
};

export default function AdminPage() {
  return (
    <>
      <AdminPanel />
      <Toaster />
    </>
  );
}