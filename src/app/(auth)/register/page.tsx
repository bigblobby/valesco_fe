'use client';

import Link from '@/lib/components/ui/link';
import { useFormState } from 'react-dom';
import { registerAction } from '@/app/(auth)/register/actions';
import { SubmitWithStatus } from '@/lib/components/forms/submit-with-status';
import Input from '@/lib/components/forms/input';
import Text from '@/lib/components/ui/text';
import Card from '@/lib/components/ui/card';

export default function RegisterPage() {
    const [state, formAction] = useFormState(registerAction, null);

    return (
        <>
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Valesco
            </a>
            <Card className="space-y-4 md:space-y-6 sm:max-w-md">
                <Text component="h1" variant="h4">Sign up for an account</Text>
                <form action={formAction} className="space-y-4 md:space-y-6">
                    <div>
                        <Input
                            withLabel
                            labelText="Your email"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@company.com"
                            required
                        />
                    </div>
                    <div>
                        <Input
                            withLabel
                            labelText="Password"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
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
            </Card>
        </>
    );
}