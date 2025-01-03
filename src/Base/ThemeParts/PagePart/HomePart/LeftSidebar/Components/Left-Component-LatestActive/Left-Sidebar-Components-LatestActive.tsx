"use client"
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { API_URL } from '../../../../../../Api/Api';
import { isValidComponentLatestActive } from '../../../../../../Api/Sec-3/Checkers/ComponentsChecker';

export interface ComponentActivityinterface {
    Actid: string;
    ActName: string;
    ActContent: string;
    ActStatus: string;
    ActDate: string;
    ActAvatar: string;
}

export default function LeftSidebarComponentsLatestActive() {
    const [activities, setActivities] = useState<ComponentActivityinterface[]>([]);
    const { data, isLoggedIn, userAuthToken } = useDataStore();
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn || !data || !data.UserName) {
            console.log('User is not logged in or UserName is null, skipping API call.');
            return;
        }

        axios.get(`${API_URL}/${data.UserName}/GetActivity/General`, {
            headers: {
                'Authorization': `Bearer ${userAuthToken}`
            }
        })
            .then(response => {

                if (!response.data || !Array.isArray(response.data) || response.data.some(activite => !isValidComponentLatestActive(activite))) {
                    console.error('API response is not an array or contains invalid data');
                    return;
                }

                setActivities(response.data);
            })
            .catch(error => {
                if (error.code === "ERR_NETWORK") {
                    console.error('Network error:', error);
                    router.push('/NetworkError');
                } else if (error.response) {
                    console.error('LeftSidebarComponentsLatestActive data fetching failed:', error.response.data);
                } else {
                    console.error('Error:', error.message);
                }
            });
    }, [data?.UserName, isLoggedIn]);

    if (!isLoggedIn) {
        return null;
    }

    return (
        <>
            <div className="mb-10 bg-white rounded-lg shadow p-4">
                <h5 className="text-lg font-semibold mb-2">Latest activities</h5>
                {activities.length > 0 ? (
                    <ul className="space-y-2">
                        {activities.map((activity, index) => (
                            <li key={index} className="hover:bg-gray-100 rounded-md transition duration-200 p-2">
                                <a href="#" className="flex items-center space-x-2">
                                    <Image className="h-6 w-6 rounded-full" src={activity.ActAvatar || "https://placehold.co/400"} alt="Avatar" width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{ width: '100%', height: 'auto' }} />
                                    <span className="text-sm font-medium">{activity.ActContent}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-4">
                        <span className="text-sm text-gray-500">No activities found.</span>
                    </div>
                )}
            </div>
        </>
    );
}
