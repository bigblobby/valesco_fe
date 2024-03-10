export default function PageSpinner(){
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-0">
            <svg
                className="text-orange-500 text-center fill-current"
                style={{transformOrigin: 'center', animation: 'spinner_KYSC .75s infinite linear' }}
                width="120"
                height="120"
                viewBox="0 0 24 24"
            >
                <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"/>
            </svg>
        </div>
    )
}