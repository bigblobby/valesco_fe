'use client'

import { upsertProfile } from '@/app/dashboard/profile/actions';
import { useFormState } from 'react-dom';
import Text from '@/app/components/ui/text';
import Input from '@/app/components/forms/input';
import { SubmitWithStatus } from '@/app/components/forms/submit-with-status';
import { AlertWithDismiss } from '@/app/components/ui/alert';
import Card from '@/app/components/ui/card';

interface ProfileFormProps {
    user: any;
    profile: any;
}

export default function ProfileForm({user, profile}: ProfileFormProps) {
    const [state, formAction] = useFormState(upsertProfile, null);

    return (
        <Card className="sm:max-w-md">
            <form action={formAction}>
                <div className="space-y-4 md:space-y-6">
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
                        <AlertWithDismiss key={Date.now()} type="danger">{state.error}</AlertWithDismiss>
                    )}

                    {state?.message && (
                        <AlertWithDismiss key={Date.now()} autoDismiss type="success">{state.message}</AlertWithDismiss>
                    )}

                    <SubmitWithStatus fullWidth>Save</SubmitWithStatus>
                </div>
            </form>
        </Card>
    )
}
