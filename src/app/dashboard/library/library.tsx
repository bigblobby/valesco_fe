'use client';

import LibraryList from '@/lib/components/dashboard/library/library-list';
import LibrarySearch from '@/lib/components/dashboard/library/library-search';
import LibraryProvider from '@/lib/providers/library-provider';
import Card from '@/lib/components/ui/card';
import Text from '@/lib/components/ui/text';
import Heading from '@/lib/components/ui/heading';
import CreateNewWorkoutForm from '@/lib/components/forms/create-new-workout-form';

export default function Library() {
    return (
        <LibraryProvider>
            <div className="flex flex-wrap gap-5">
                {/*<div>*/}
                {/*    <ul>*/}
                {/*        <li>Custom workouts</li>*/}
                {/*        <li>Movements</li>*/}
                {/*        <li>Warm-up</li>*/}
                {/*        <li>Strength</li>*/}
                {/*        <li>Gymnastics</li>*/}
                {/*        <li>WODs</li>*/}
                {/*        <li>Hero WODs</li>*/}
                {/*        <li>Classes</li>*/}
                {/*    </ul>*/}
                {/*</div>*/}

                <Card className="w-full lg:w-auto flex-1">
                    <Heading as="h2" variant="h4">Search</Heading>
                    <Text className="text-sm mb-4">Search from a library of 1000's of pre-made workouts</Text>
                    <LibrarySearch/>
                </Card>

                <div className="w-full lg:w-[150px] flex justify-center items-center">
                    <Heading as="span" variant="h4" className="text-center">OR</Heading>
                </div>

                <Card className="w-full lg:w-[300px] flex flex-col">
                    <Heading as="h2" variant="h4">Generate your own</Heading>
                    <Text className="text-sm mb-4">Want a completely new workout generated just for you?</Text>
                    <div className="mt-auto">
                        <CreateNewWorkoutForm />
                    </div>
                </Card>

                <div className="w-full">
                    <LibraryList/>
                </div>
            </div>
        </LibraryProvider>
    );

}