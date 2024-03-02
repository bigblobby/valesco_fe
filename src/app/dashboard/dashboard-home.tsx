'use client';

import DashboardNav from '@/app/dashboard/(components)/dashboard-nav';
import { UserContext } from '@/app/providers/user-provider';

interface DashboardHomeProps {
    user: any;
    userProfile: any;
}

export default function DashboardHome({user, userProfile}: DashboardHomeProps) {

    return (
        <UserContext.Provider value={{user: user, userProfile: userProfile}}>
            <div className="text-gray-900 dark:text-white">
                <DashboardNav />
                <div>
                    {user ? (
                        <p>Hello {user.email}</p>
                    ) : null}
                </div>
            </div>
        </UserContext.Provider>
    );
}