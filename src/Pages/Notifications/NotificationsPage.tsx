"use client";
import React, { useState, useEffect } from 'react';
import { useData } from '../../base/Context/DataContext';

import Header from '../../base/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../base/ThemeParts/MainPart/Navbar/Navbar';
import { API_URL } from '../../base/Api/Api';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

interface Notification {
    NotName: string;
    NotContent: string;
    NotDate: string;
}

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
    const { NotName, NotContent, NotDate } = notification;

    return (
        <div className="flex items-start p-4 border-b border-gray-200">
            <div className="flex-shrink-0 mr-3">
                <img src="" alt={NotName} className="w-10 h-10 rounded-full" />
            </div>
            <div className="flex-grow">
                <p className="text-sm">
                    <span className="font-semibold">{NotName}</span> {NotContent}
                </p>
                <p className="text-xs text-gray-400">{NotDate}</p>
            </div>
        </div>
    );
};

const NotificationsPage = () => {
  const router = useRouter();
    const { isLoggedIn, isLoading,data,siteData,userAuthToken } = useData();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const { username } = useParams();
    useEffect(() => {
      if (isLoading) return;
      if (siteData.SiteStatus != "1") router.push('/');
      
        if (!isLoggedIn) {
          router.push('/login');
        } else {
          axios.get(`${API_URL}/${username}/GetNotifications`, {
            headers: {
                'Authorization': `Bearer ${userAuthToken}`
            }
        })
            .then(response => {
              if (response.status === 200) {
                const notificationData: Notification[] = response.data;
                setNotifications(notificationData);
              } else {
                console.error("Geçersiz yanıt durumu:", response.status);
              }
            })
            .catch(error => {
              if (error.code === "ERR_NETWORK") {
                console.error('Network error:', error);
                router.push('/NetworkError');
              } else if (error.response) {
                console.error('Notification data fetching failed:', error.response.data);
              } else {
                console.error('Error:', error.message);
              }
            });
        }
    }, [isLoggedIn, router, isLoading, username]);
      
    return (
        <>
            <Header />
            <Navbar />
            <div className="flex-grow p-8">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Notifications</h2>
                    <div className="bg-white shadow rounded-lg">
                    {notifications.length > 0 ? (
                      notifications.map((notification, index) => (
                        <NotificationItem key={index} notification={notification} />
                      ))
                    ) : (
                      <p>No notifications available.</p>
                    )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotificationsPage;
