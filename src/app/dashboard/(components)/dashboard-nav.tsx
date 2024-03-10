'use client';

import { useRef, useState } from 'react';
import { useOutsideClick } from '@/lib/hooks/useOutsideClick';
import { createClient } from '@/lib/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';

export default function DashboardNav({userProfile, user}: any) {
    const supabase = createClient();
    const queryClient = useQueryClient();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const profileRef = useRef(null);

    useOutsideClick(profileRef, () => {
        setMenuOpen(false);
    });

    const handleSignOut = async () => {
        queryClient.removeQueries();
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <nav className="p-4 border-b border-gray-200 dark:border-slate-50/[0.26]">
            <div className="flex flex-wrap items-center justify-end mx-auto">
                <div ref={profileRef} className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button onClick={() => setMenuOpen(!menuOpen)} type="button" className="flex text-sm rounded-full items-center md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <span className="sr-only">Open user menu</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <div className={"absolute top-6 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow dark:bg-gray-700 dark:divide-gray-600 " + (menuOpen ? "" : "hidden")} id="user-dropdown">
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
                                <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 transition-all hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={() => setMenuOpen(false)}>Profile</Link>
                            </li>
                            <li>
                                <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 transition-all hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={() => setMenuOpen(false)}>Settings</Link>
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