'use client';

import Link from '@/app/components/ui/link';
import { useFormState } from 'react-dom';
import { registerAction } from '@/app/(auth)/register/actions';
import { SubmitWithStatus } from '@/app/components/forms/submit-with-status';
import Input from '@/app/components/forms/input';
import Text from '@/app/components/ui/text';
import Card from '@/app/components/ui/card';

export default function RegisterPage() {
    const [state, formAction] = useFormState(registerAction, null);

    return (
        <>
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Valesco
            </a>
            <Card>
                <div className="space-y-4 md:space-y-6">
                    <Text component="h1" variant="h4">Sign up for an account</Text>
                    <form action={formAction} className="space-y-4 md:space-y-6">
                        <div>
                            <Input
                                withLabel
                                isRequired
                                id="email"
                                inputName="email"
                                inputPlaceholder="name@company.com"
                                labelText="Your email"
                            />
                        </div>
                        <div>
                            <Input
                                withLabel
                                isRequired
                                id="password"
                                inputName="password"
                                inputPlaceholder="••••••••"
                                inputType="password"
                                labelText="Password"
                            />
                        </div>
                        {state?.error && (
                            <Text className="text-red-500 text-sm">
                                {state.error}
                            </Text>
                        )}
                        <SubmitWithStatus fullWidth>Sign up</SubmitWithStatus>
                        <Text className="text-sm font-light">
                            Already have an account? <Link href="/login" className="text-sm">Sign in</Link>
                        </Text>
                    </form>
                </div>
            </Card>
        </>
    );
}