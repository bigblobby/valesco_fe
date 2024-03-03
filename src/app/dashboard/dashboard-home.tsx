'use client';

import { UserContext } from '@/app/providers/user-provider';
import useSWR from 'swr';

interface DashboardHomeProps {
    user: any;
    userProfile: any;
}

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function DashboardHome({user, userProfile}: DashboardHomeProps) {
    const {data, error, isLoading, mutate} = useSWR('/api/workouts', fetcher);

    async function generateWorkout() {
        async function generateNewWorkout() {
            const res = await fetch('/api/workouts', {
                method: 'POST'
            });

            return await res.json();
        }

        await mutate(generateNewWorkout, {
            populateCache: (newWorkout: any, workouts: any) => {
                return [...workouts, newWorkout];
            },
            revalidate: false,
        });
        console.log(data);
    }

    console.log('isLoading', isLoading);
    console.log('workouts', data);

    return (
        <UserContext.Provider value={{user: user, userProfile: userProfile}}>
            <div className="flex justify-center items-center h-[calc(100vh-65px)]">
                <div className="flex flex-col items-center justify-center text-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100"
                        height="100"
                        viewBox="0 0 256 256"
                        fill="currentColor"
                        className="text-gray-500 dark:text-gray-400"
                    >
                        <g strokeMiterlimit="10" strokeWidth="0">
                            <path
                                d="M65.922 50.523h-6.187a1 1 0 110-2h5.187v-6.296h-7.234a1 1 0 110-2h8.234a1 1 0 011 1v8.296a1 1 0 01-1 1zM53.783 50.523H24.078a1 1 0 01-1-1v-8.296a1 1 0 011-1h7.5a1 1 0 010 2h-6.5v6.296h28.706a1 1 0 11-.001 2z"
                                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                            ></path>
                            <path
                                d="M24.078 65.385h-8.296a1 1 0 01-1-1V26.366a1 1 0 011-1h8.296a1 1 0 011 1v38.019a1 1 0 01-1 1zm-7.296-2h6.296V27.366h-6.296v36.019z"
                                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                            ></path>
                            <path
                                d="M15.782 58.909H7.485a1 1 0 01-1-1V32.841a1 1 0 011-1h8.296a1 1 0 011 1v25.068a.998.998 0 01-.999 1zm-7.297-2h6.296V33.841H8.485v23.068zM74.219 65.385h-8.297a1 1 0 01-1-1V26.366a1 1 0 011-1h8.297a1 1 0 011 1v38.019a1 1 0 01-1 1zm-7.297-2h6.297V27.366h-6.297v36.019z"
                                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                            ></path>
                            <path
                                d="M82.515 58.909h-8.296a1 1 0 01-1-1V32.841a1 1 0 011-1h8.296a1 1 0 011 1v25.068a1 1 0 01-1 1zm-7.296-2h6.296V33.841h-6.296v23.068zM7.485 50.523H1a1 1 0 01-1-1v-8.296a1 1 0 011-1h6.485a1 1 0 011 1v8.296a1 1 0 01-1 1zm-5.485-2h4.485v-6.296H2v6.296z"
                                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                            ></path>
                            <path
                                d="M89 50.523h-6.485a1 1 0 01-1-1v-8.296a1 1 0 011-1H89a1 1 0 011 1v8.296a1 1 0 01-1 1zm-5.485-2H88v-6.296h-4.485v6.296zM35.701 74.903a1 1 0 01-1-1v-9.751a9.772 9.772 0 00-2.25-6.231l-.474-.571a11.774 11.774 0 01-2.712-7.509 1 1 0 112 0c0 2.271.799 4.483 2.25 6.231l.474.571a11.773 11.773 0 012.711 7.509v9.751a.998.998 0 01-.999 1zM54.299 74.903a1 1 0 01-1-1v-9.751c0-2.736.963-5.403 2.712-7.509l.475-.571a9.776 9.776 0 002.25-6.231V46.05c0-.967-.787-1.754-1.754-1.754h-8.356a2.275 2.275 0 00-2.272 2.272c0 1.078.877 1.955 1.955 1.955h5.476a1 1 0 110 2h-5.476a3.96 3.96 0 01-3.956-3.955 4.277 4.277 0 014.273-4.272h8.356a3.758 3.758 0 013.754 3.754v3.791c0 2.736-.963 5.402-2.711 7.509l-.475.571a9.777 9.777 0 00-2.251 6.231v9.751a1 1 0 01-1 1zM35.632 44.296h-1.637a3.457 3.457 0 01-3.454-3.454v-2.939a3.457 3.457 0 013.454-3.454h1.637a3.457 3.457 0 013.454 3.454v2.939a3.457 3.457 0 01-3.454 3.454zm-1.637-7.848c-.802 0-1.454.652-1.454 1.454v2.939c0 .802.652 1.454 1.454 1.454h1.637c.802 0 1.454-.652 1.454-1.454v-2.939c0-.802-.652-1.454-1.454-1.454h-1.637z"
                                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                            ></path>
                            <path
                                d="M42.177 44.296H40.54a3.457 3.457 0 01-3.454-3.454v-3.994a3.458 3.458 0 013.454-3.454h1.637a3.457 3.457 0 013.454 3.454v3.994a3.457 3.457 0 01-3.454 3.454zm-1.637-8.901c-.802 0-1.454.652-1.454 1.454v3.994c0 .802.652 1.454 1.454 1.454h1.637c.802 0 1.454-.652 1.454-1.454v-3.994c0-.802-.652-1.454-1.454-1.454H40.54z"
                                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                            ></path>
                            <path
                                d="M48.723 44.296h-1.638a3.458 3.458 0 01-3.454-3.454v-5.547a3.458 3.458 0 013.454-3.454h1.638a3.458 3.458 0 013.454 3.454v5.547a3.458 3.458 0 01-3.454 3.454zm-1.638-10.455c-.802 0-1.454.652-1.454 1.454v5.547c0 .802.652 1.454 1.454 1.454h1.638c.802 0 1.454-.652 1.454-1.454v-5.547c0-.802-.652-1.454-1.454-1.454h-1.638z"
                                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                            ></path>
                            <path
                                d="M55.268 44.296H53.63a3.457 3.457 0 01-3.453-3.454v-3.994a3.458 3.458 0 013.453-3.454h1.638a3.458 3.458 0 013.454 3.454v3.994a3.458 3.458 0 01-3.454 3.454zm-1.638-8.901c-.801 0-1.453.652-1.453 1.454v3.994c0 .802.652 1.454 1.453 1.454h1.638c.802 0 1.454-.652 1.454-1.454v-3.994c0-.802-.652-1.454-1.454-1.454H53.63z"
                                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                            ></path>
                        </g>
                    </svg>
                    <h1 className="text-lg font-bold text-gray-700 dark:text-gray-300">No workouts</h1>
                    <p className="text-gray-500 dark:text-gray-400">Get started by generating a new workout</p>
                    <button className="inline-flex text-white bg-orange-400 hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-6 text-center transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                        </svg>
                        <span className="ml-2" onClick={generateWorkout}>New Workout</span>
                    </button>
                </div>
            </div>
        </UserContext.Provider>
    );
}