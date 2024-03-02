'use client';

import { useRef, useState } from 'react';
import { useOutsideClick } from '@/app/hooks/useOutsideClick';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function DashboardNav({user, userProfile}: any) {
    const supabase = createClient();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const profileRef = useRef(null);

    useOutsideClick(profileRef, () => {
        setMenuOpen(false);
    });

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <nav className="p-8">
            <div className="flex flex-wrap items-center justify-end mx-auto">
                <div ref={profileRef} className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button onClick={() => setMenuOpen(!menuOpen)} type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <span className="sr-only">Open user menu</span>
                        <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
                    </button>
                    <div className={"absolute top-6 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 " + (menuOpen ? "" : "hidden")} id="user-dropdown">
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white">
                                {userProfile.first_name ? (
                                    <>
                                        {userProfile.first_name} {userProfile.last_name ?? ''}
                                    </>
                                ) : "Hi there"}
                            </span>
                            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 transition-all hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 transition-all hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                            </li>
                            <li>
                                <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-sm text-gray-700 transition-all hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}