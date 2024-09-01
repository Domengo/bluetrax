import React from "react"
import Notification from "./notification";

// SideNav component
export default function SideNav({ username, notifications }) {
  return (
    <aside className=" bg-white shadow-lg p-4">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-foreground"></div>
        <div>
          <p className="text-sm font-medium">Hi {username}, welcome.</p>
        </div>
      </div>
      <hr />
      <div>
        <h2 className="text-xs font-semibold text-gray-500 mb-2">RECENT NOTIFICATIONS</h2>
        <div className="space-y-2">
          {notifications.map((notification, index) => (
            <Notification key={index} {...notification} />
          ))}
        </div>
      </div>
    </aside>
  )
}