import { useState } from 'react';

export default function useDrawer() {
    const [active, setActive] = useState<boolean>(false);

    function toggle() {
        setActive((prevState) => !prevState);
    }

    return { toggle, active };
}