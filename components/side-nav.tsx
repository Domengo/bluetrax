import { NotificationProps } from "./notification-const";
import Notification from "./notification";
import { PersonIcon } from "@radix-ui/react-icons";

interface SideNavProps {
  username: string;
  notifications: NotificationProps[];
}

const SideNav: React.FC<SideNavProps> = ({ username, notifications }) => {
  return (
    <div className=" bg-white shadow-lg p-4">
      <div className="flex flex-col items-center mb-8">
        <div className="rounded-full bg-destructive">
          <PersonIcon className="w-16 h-16 text-black" />
        </div>
        <div>
          <p className="text-sm font-medium">Hi {username}, welcome.</p>
        </div>
      </div>
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