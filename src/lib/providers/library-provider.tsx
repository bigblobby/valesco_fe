import React, { createContext, useState } from 'react';
import { WorkoutPreMadeFormInputs } from '@/lib/components/dashboard/library/library-search';

const DEFAULT_COLLECTION = 'crossfit-main-daily-wods-archive-2001';

interface ILibraryContext {
    collection: WorkoutPreMadeFormInputs['collection'];
    setCollection: (collection: WorkoutPreMadeFormInputs['collection']) => void;
}

export const LibraryContext = createContext<ILibraryContext>({
    collection: DEFAULT_COLLECTION,
    setCollection: (collection: WorkoutPreMadeFormInputs['collection']) => {
    }
});

interface LibraryProviderProps {
    children: React.ReactNode;
}

export default function LibraryProvider({ children }: LibraryProviderProps) {
    const [collection, setCollection] = useState<WorkoutPreMadeFormInputs['collection']>(DEFAULT_COLLECTION);

    return (
        <LibraryContext.Provider value={{ collection: collection, setCollection: setCollection }}>
            {children}
        </LibraryContext.Provider>
    );
}