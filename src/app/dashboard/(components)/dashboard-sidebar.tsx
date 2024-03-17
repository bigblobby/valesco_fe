'use client';

import Link from '@/lib/components/ui/link';
import { PlusIcon } from '@heroicons/react/24/solid';
import { default as NavLink } from 'next/link';
import { HomeIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

export default function DashboardSidebar() {
    const pathname = usePathname()

    const navItems = [
        {
            title: 'Dashboard',
            link: '/dashboard',
            icon: <HomeIcon width={24} height={24} />,
        },
        {
            title: 'Workouts',
            link: '/dashboard/workouts',
            icon: <ListBulletIcon width={24} height={24} />,
        },
    ]

    return (
        <aside className="w-52 lg:w-72 h-full absolute top-0 left-0 border-r bg-gray-800 border-slate-50/[0.26]">
            <div className="p-4 border-b border-slate-50/[0.26]">
                <h1 className="text-2xl text-center font-semibold text-white">Valesco</h1>
            </div>

            <div>
                <div className="flex justify-center border-b border-slate-50/[0.26] mx-4">
                    <Link className="my-4" href="/dashboard/create-workout" variant="button">
                        <PlusIcon width={20} height={20} />
                        <span className="ml-2">New Workout</span>
                    </Link>
                </div>
            </div>

            <div>
                <ul className="mt-4">
                    {navItems.map((navItem, index) => (
                        <li key={index} className="mx-2 my-1">
                            <NavLink className={`flex items-center text-gray-300 px-3 py-2 rounded hover:bg-gray-600 transition-colors ${pathname === navItem.link ? 'bg-gray-700' : ''}`} href={navItem.link}>
                                {navItem.icon}
                                <span className="ml-2">{navItem.title}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}