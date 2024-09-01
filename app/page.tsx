import Dashboard  from "@/components/dashboard";
import SideNav from "@/components/side-nav";
import { notifications, username } from "@/components/notification-const";

export default function Page() {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-5"><Dashboard /></div>
      <div className="col-span-1"><SideNav username={username} notifications={notifications} /></div>
    </div>
    
  );
}