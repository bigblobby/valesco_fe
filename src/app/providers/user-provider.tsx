import { createContext } from 'react';


export const UserContext = createContext<{user: any, userProfile: any}>({
    user: null,
    userProfile: null,
});

