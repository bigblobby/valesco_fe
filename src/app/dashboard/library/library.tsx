'use client';

import LibraryList from '@/lib/components/dashboard/library/library-list';
import LibrarySearch from '@/lib/components/dashboard/library/library-search';
import LibraryProvider from '@/lib/providers/library-provider';

export default function Library() {
    return (
        <LibraryProvider>
            <div>
                <div>
                    <ul>
                        <li>Custom workouts</li>
                        <li>Movements</li>
                        <li>Warm-up</li>
                        <li>Strength</li>
                        <li>Gymnastics</li>
                        <li>WODs</li>
                        <li>Hero WODs</li>
                        <li>Classes</li>
                    </ul>
                </div>

                <LibrarySearch />
                <LibraryList />
            </div>
        </LibraryProvider>
    );

}