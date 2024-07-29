"use client"
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface User {
  _id: string;
  name: string;
}

interface Activity {
  _id: string;
  user: User;
  actionType: 'CREATE_WORKSPACE' | 'DELETE_WORKSPACE' | 'CREATE_TASK' | 'UPDATE_TASK' | 'DELETE_TASK';
  details: any;
  createdAt: string;
}

const actionTypeColors = {
  CREATE_WORKSPACE: 'bg-green-500',
  DELETE_WORKSPACE: 'bg-red-500',
  CREATE_TASK: 'bg-blue-500',
  UPDATE_TASK: 'bg-yellow-500',
  DELETE_TASK: 'bg-purple-500',
};

const ActivityHistory: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Fetch activities from your API here
    // For now, we'll use mock data
    const mockActivities: Activity[] = [
      {
        _id: '1',
        user: { _id: 'u1', name: 'John Doe' },
        actionType: 'CREATE_WORKSPACE',
        details: { name: 'New Workspace' },
        createdAt: new Date().toISOString(),
      },
      {
        _id: '2',
        user: { _id: 'u2', name: 'Jane Smith' },
        actionType: 'CREATE_TASK',
        details: { title: 'New Task' },
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
      // Add more mock activities as needed
    ];

    setActivities(mockActivities);
  }, []);

  const getActionDescription = (activity: Activity) => {
    switch (activity.actionType) {
      case 'CREATE_WORKSPACE':
        return `created workspace "${activity.details.name}"`;
      case 'DELETE_WORKSPACE':
        return `deleted workspace "${activity.details.name}"`;
      case 'CREATE_TASK':
        return `created task "${activity.details.title}"`;
      case 'UPDATE_TASK':
        return `updated task "${activity.details.title}"`;
      case 'DELETE_TASK':
        return `deleted task "${activity.details.title}"`;
      default:
        return 'performed an action';
    }
  };

  return (
    <div className="h-full w-full flex justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Activity History</h2>
        
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {activities.map((activity) => (
            <div key={activity._id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
              <div className={`${actionTypeColors[activity.actionType]} text-white text-xs font-bold px-2 py-1 rounded`}>
                {activity.actionType.replace('_', ' ')}
              </div>
              <div className="flex-grow">
                <p className="text-gray-800">
                  <span className="font-semibold">{activity.user.name}</span>
                  {' '}
                  {getActionDescription(activity)}
                </p>
                <p className="text-gray-500 text-sm">
                  {format(new Date(activity.createdAt), 'MMM d, yyyy HH:mm')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityHistory;