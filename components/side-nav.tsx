import { NotificationProps } from "./notification-const";
import Notification from "@/components/notification";
import UserProfile from "@/components/User";

interface SideNavProps {
  notifications: NotificationProps[];
}

const SideNav: React.FC<SideNavProps> = ({notifications }) => {
  return (
    <div className=" bg-white shadow-lg p-4">
      <UserProfile username="David" />
      <hr />
      <div>
        <h2 className="text-xs font-semibold text-gray-500 mb-2 mt-4">RECENT NOTIFICATIONS</h2>
        <div className="space-y-2">
          {notifications.map((notification, index) => (
            <Notification key={index} {...notification} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideNav