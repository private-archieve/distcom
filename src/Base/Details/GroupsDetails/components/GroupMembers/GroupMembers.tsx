import Image from 'next/image';
import React from 'react';
import { GroupMember } from '../../GroupDetail';

interface GroupMembersProps {
  members: GroupMember[];
}

export const GroupMembers: React.FC<GroupMembersProps> = ({ members }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h3 className="text-xl font-semibold mb-6">Members ({members.length})</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {members.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-lg p-4 flex items-center space-x-4">
            {member.image && <Image src={member.image || "https://placehold.co/400"} alt={member.name} className="h-16 w-16 rounded-full object-cover" width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }} />}
            <div>
              <span className="text-lg leading-5 font-medium text-gray-900">{member.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
