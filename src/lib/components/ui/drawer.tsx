export default function Drawer({active, toggle, children}: any) {
    return (
        <>
            <div onClick={toggle} className={"fixed top-0 bottom-0 left-0 right-0 bg-black transition-opacity duration-500 "  + (active ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none')}></div>
            <div id="drawer-contact" className={"fixed top-0 z-40 h-screen p-4 overflow-y-auto transition-all duration-500 -translate-x-full bg-white w-[40rem] dark:bg-gray-800 " + (active ? '-right-[40rem]' : '-right-[80rem]')} tabIndex={-1}>
                {children}
            </div>
        </>
    )
}