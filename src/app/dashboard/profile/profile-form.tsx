'use client'

import { upsertProfile } from '@/app/dashboard/profile/actions';
import { useFormState } from 'react-dom';
import Text from '@/app/components/ui/text';
import Input from '@/app/components/forms/input';
import { SubmitWithStatus } from '@/app/components/forms/submit-with-status';
import Alert from '@/app/components/ui/alert';

interface ProfileFormProps {
    user: any;
    profile: any;
}

export default function ProfileForm({user, profile}: ProfileFormProps) {
    const [state, formAction] = useFormState(upsertProfile, null);

    return (
        <form className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700" action={formAction}>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <Text component="h1" variant="h4">Profile</Text>
                <Text className="text-xs">Edit your profile</Text>
                <div>
                    <Input
                        withLabel
                        labelText="Username"
                        id="username"
                        inputName="username"
                        inputDefaultValue={profile.username}
                    />
                </div>
                <div>
                    <Input
                        withLabel
                        labelText="First name"
                        id="first_name"
                        inputName="first_name"
                        inputDefaultValue={profile.first_name}
                    />
                </div>
                <div>
                    <Input
                        withLabel
                        labelText="Last name"
                        id="last_name"
                        inputName="last_name"
                        inputDefaultValue={profile.last_name}
                    />
                </div>

                {state?.error && (
                    <Alert type="danger">{state.error}</Alert>
                )}

                {state?.message && (
                    <Alert type="success">{state.message}</Alert>
                )}

                <SubmitWithStatus fullWidth>Save</SubmitWithStatus>
            </div>
        </form>
    )
}
