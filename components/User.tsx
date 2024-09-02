// import React from 'react';
// import { User } from 'lucide-react';

// interface UserProps {
//     username: string;
// }

// const UserProfile: React.FC<UserProps> = ({ username }) => {
//     return (
//         <div className="flex flex-col items-center mb-8">
//             <div className="rounded-full">
//                 <User size={96} fill="gray" color="" />
//             </div>
//             <div>
//                 <p className="text-xl font-bold text-[#001e6c]">Hi {username}, welcome.</p>
//             </div>
//         </div>
//     );
// };

// export default UserProfile;
import React from 'react';
import { User } from 'lucide-react';
import { cn } from "@/lib/utils";

interface UserProfileProps {
    username: string;
    className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ username, className }) => {
    return (
        <div className="flex flex-col items-center mb-8">
            <div className="rounded-full">
                <User size={96} fill="gray" color="" />
            </div>
            <div>
                <p className={cn("text-xl font-bold text-[#001e6c]", className)}>
                    Hi {username}, welcome.
                </p>
            </div>
        </div>
    );
};

export default UserProfile;