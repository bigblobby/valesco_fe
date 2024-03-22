import ProfileForm from '@/lib/components/forms/profile-form';

export default async function Page(){
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-0">
            <ProfileForm />
        </div>
    )
}