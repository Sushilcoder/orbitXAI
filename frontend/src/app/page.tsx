import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Dashboard from "@/components/dashboard/Dashboard";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#05070a] text-white">
      <Sidebar />
      <Topbar />
      <Dashboard />
    </div>
  );
}