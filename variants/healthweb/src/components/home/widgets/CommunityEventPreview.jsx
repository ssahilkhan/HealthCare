import React from 'react';
import { Users } from 'lucide-react';

const CommunityEventPreview = ({ event }) => {
  return (
    <li className="py-3 border-b last:border-b-0">
      <h3 className="font-semibold text-gray-800">{event.title}</h3>
      <p className="text-sm text-gray-600">
        {new Date(event.date).toLocaleDateString('en-US', { 
          weekday: 'short',
          month: 'short', 
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit'
        })}
      </p>
      <div className="flex items-center mt-1 text-xs text-gray-500">
        <Users className="h-3 w-3 mr-1" />
        <span>{event.attendees?.length || 0} attending</span>
      </div>
    </li>
  );
};

export default CommunityEventPreview;