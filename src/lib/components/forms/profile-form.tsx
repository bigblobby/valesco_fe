'use client'

import { upsertProfile } from '@/app/dashboard/profile/actions';
import { useFormState } from 'react-dom';
import Text from '@/lib/components/ui/text';
import Input from '@/lib/components/ui/form/input';
import { SubmitWithStatus } from '@/lib/components/ui/form/submit-with-status';
import { AlertWithDismiss } from '@/lib/components/ui/alert';
import Card from '@/lib/components/ui/card';
import Heading from '@/lib/components/ui/heading';

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
                    <Heading as="h1" variant="h4">Profile</Heading>
                    <Text className="text-xs">Edit your profile</Text>
                    <div>
                        <Input
                            labelText="Username"
                            id="username"
                            name="username"
                            defaultValue={profile.username}
                        />
                    </div>
                    <div>
                        <Input
                            labelText="First name"
                            id="first_name"
                            name="first_name"
                            defaultValue={profile.first_name}
                        />
                    </div>
                    <div>
                        <Input
                            labelText="Last name"
                            id="last_name"
                            name="last_name"
                            defaultValue={profile.last_name}
                        />
                    </div>

                    {state?.error && (
                        <AlertWithDismiss key={Date.now()} variant="danger">{state.error}</AlertWithDismiss>
                    )}

                    {state?.message && (
                        <AlertWithDismiss key={Date.now()} autoDismiss variant="success">{state.message}</AlertWithDismiss>
                    )}

                    <SubmitWithStatus fullWidth>Save</SubmitWithStatus>
                </div>
            </form>
        </Card>
    )
}
