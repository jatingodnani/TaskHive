"use client"
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/redux/lib/hooks';
import { checkAuth } from '@/redux/features/userSlice';
import { fetchUsers } from '@/redux/features/authuser';


interface User {
  _id: string;
  name: string;
  fullname: string;
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const { isAuthenticated, user } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchUsers());
  }, [dispatch]);
  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/auth");
    }
  }, [isAuthenticated]);
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`https://taskhive-y97a.onrender.com/taskhive/activities/${id}`, {
          method: 'GET',
          credentials: 'include',
        });
        console.log(response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setActivities(data);
      } catch (err) {
        setError('Failed to fetch activities');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [id]);

  const getActionDescription = (activity: Activity) => {
    console.log(activity);
    switch (activity.actionType) {
      case 'CREATE_WORKSPACE':
        return `created workspace "${activity.details.workspaceTitle}"`;
      case 'DELETE_WORKSPACE':
        return `deleted workspace "${activity.details.workspaceTitle}"`;
      case 'CREATE_TASK':
        return `created task "${activity.details.taskTitle}"`;
      case 'UPDATE_TASK':
        return `updated task "${activity.details.taskTitle}"`;
      case 'DELETE_TASK':
        return `deleted task "${activity.details.taskTitle}"`;
      default:
        return 'performed an action';
    }
  };

  if (loading) return <div className='w-full h-full flex justify-center items-center'><FaSpinner size={20} className='animate-spin' /></div>
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="h-full w-full flex justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Activity History</h2>

        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {activities.length === 0 && <p>No activities found.</p>}
          {activities.map((activity) => (
            <div key={activity._id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
              <div className={`${actionTypeColors[activity.actionType]} text-white text-xs font-bold px-2 py-1 rounded`}>
                {activity.actionType.replace('_', ' ')}
              </div>
              <div className="flex-grow">
                <p className="text-gray-800">
                  <span className="font-semibold">{activity.user.fullname}</span>
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