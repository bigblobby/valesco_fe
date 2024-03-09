'use client';

import { SubmitWithStatus } from '@/app/components/forms/submit-with-status';
import { useFormState } from 'react-dom';
import { resetPasswordAction } from '@/app/(auth)/password-reset/actions';
import Text from '@/app/components/ui/text';
import Input from '@/app/components/forms/input';
import Card from '@/app/components/ui/card';

export default function PasswordResetPage() {
    const [state, formAction] = useFormState(resetPasswordAction, null);

    return (
        <Card>
            <div className="space-y-4 md:space-y-6">
                <Text component="h1" variant="h4">Reset your password</Text>
                <Text className="text-sm">Enter your email address so we can send you a link to reset your password.</Text>
                <form action={formAction} className="space-y-4 md:space-y-6">
                    <div>
                        <Input
                            withLabel
                            id="email"
                            inputName="email"
                            labelText="Your email"
                            isRequired
                            inputPlaceholder="name@company.com"
                        />
                    </div>
                    <SubmitWithStatus fullWidth>Send link</SubmitWithStatus>
                </form>
            </div>
        </Card>
    );
}