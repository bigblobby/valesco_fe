'use client';

import DashboardNav from '@/app/dashboard/(components)/dashboard-nav';

interface DashboardHomeProps {
    user: any;
    userProfile: any;
}

export default function DashboardHome({user, userProfile}: DashboardHomeProps) {
    return (
        <div className="text-gray-900 dark:text-white">
            <DashboardNav user={user} userProfile={userProfile} />
            <div>
                {user ? (
                    <p>Hello {user.email}</p>
                ) : null}
            </div>
        </div>
    );
}