"use client"
import { faEllipsisV, faGear, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useData } from '../../../Context/DataContext';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, data, siteData, isLoading } = useData();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {

    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (isLoading || !siteData) return null;
  const profileImageURL = data?.ProfileImage || siteData?.SiteDefaultProfileImageURL;
  const siteLogoURL = siteData?.SiteLogo;

  return (
    <>
      <header className="fixed top-0 left-16 right-0 bg-white shadow-md z-10">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="">
            <div className="flex items-center w-auto">
              <Image src={siteLogoURL} alt="Distcom Network Logo" className="h-8 w-8 mr-2" width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }} />
              <span className="font-bold text-xl text-gray-800">Distcom Network</span>
            </div>
          </Link>
          {isLoggedIn ? (
            <div className="flex items-center relative" ref={dropdownRef}>
              <Link href="/Profile" className="">
                <Image
                  src={profileImageURL}
                  alt="User Profile"
                  className="h-12 w-12 rounded-full cursor-pointer object-cover mr-2" width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                />
              </Link>
              <button className="px-4 py-2 rounded focus:outline-none" onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faEllipsisV} className="text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out" />
              </button>
              {isLoggedIn && isDropdownOpen && (
                <div className="absolute right-0 mt-48 py-2 w-48 bg-white rounded-md shadow-xl z-20 border border-gray-200">
                  <span className="block font-bold text-md text-gray-800 px-4 py-2">Hi! {data.Displayname}</span>
                  <hr className="my-2 border-t border-gray-200" />
                  <Link href="/Profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white transition duration-150 ease-in-out"> <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile</Link>
                  <Link href="/Settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white transition duration-150 ease-in-out"> <FontAwesomeIcon icon={faGear} className="mr-2" /> Settings</Link>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </header>
    </>
  );
}