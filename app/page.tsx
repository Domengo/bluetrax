import Dashboard  from "@/components/dashboard";
import SideNav from "@/components/side-nav";
import { notifications, username } from "@/components/notification-const";

export default function Page() {
  return (
    <div className="grid grid-cols-6">
      <div><Dashboard /></div>
      <div><SideNav username={username} notifications={notifications} /></div>
    </div>
    
  );
}