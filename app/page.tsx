import Dashboard from "@/components/dashboard";
import SideNav from "@/components/side-nav";
import { notifications } from "@/components/notification-const";

export default function Page() {
  return (
    <div className="grid grid-cols-8 gap-4 px-4 min-h-[calc(100vh-64px)] ">
      <div className="col-span-8 md:col-span-6 ">
        <Dashboard />
      </div>
      <div className="col-span-2 relative hidden md:block">
        <div className="sticky top-4">
          <SideNav notifications={notifications} />
        </div>
      </div>
    </div>
  );
}
