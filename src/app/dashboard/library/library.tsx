'use client';

import React, { useState } from 'react';
import LibraryList from '@/lib/components/dashboard/library/library-list';
import LibrarySearch, { WorkoutPreMadeFormInputs } from '@/lib/components/dashboard/library/library-search';

const DEFAULT_COLLECTION = 'crossfit-main-daily-wods-archive-2001';

export default function Library() {
    const [collection, setCollection] = useState<WorkoutPreMadeFormInputs["collection"]>(DEFAULT_COLLECTION);

    return (
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

            <LibrarySearch collection={collection} setCollection={setCollection}/>
            <LibraryList collection={collection} />
        </div>
    );

}