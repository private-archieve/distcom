import { Friend, UserData } from '@/pages/Profile/Profile';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


interface ProfileFriendsContentProps {
  userData: UserData | null;
}

const ProfileFriendsContent: React.FC<ProfileFriendsContentProps> = ({ userData }) => {
  const Friends: Friend[] = typeof userData?.UsrFriends === 'string'
    ? JSON.parse(userData?.UsrFriends || '[]')
    : userData?.UsrFriends || [];

  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Friends.map((Friends, index) => (
          <Link href={`/Profile/${Friends.name}`} key={index} className="block hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out">
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-6 flex items-center space-x-4 hover:bg-gray-50 cursor-pointer">
              <Image src={Friends.image || 'default-profile-image-url'} alt={`${Friends.image}'s profile`} className="h-14 w-14 rounded-full object-cover shadow-sm" width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }} />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{Friends.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{Friends.status}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default ProfileFriendsContent;
