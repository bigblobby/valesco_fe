'use client';

import { loginAction } from '@/app/(auth)/login/actions';
import { useFormState } from 'react-dom';
import { SubmitWithStatus } from '@/lib/components/forms/submit-with-status';
import Input from '@/lib/components/forms/input';
import Text from '@/lib/components/ui/text';
import { Alert } from '@/lib/components/ui/alert';
import Link from '@/lib/components/ui/link';
import Card from '@/lib/components/ui/card';

export default function LoginPage() {
    const [state, formAction] = useFormState(loginAction, null);

    return (
        <>
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Valesco
            </a>
            <Card className="space-y-4 md:space-y-6 sm:max-w-md">
                <Text component="h1" variant="h4">Sign in to your account</Text>
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
                            withLabel={true}
                            labelText="Password"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    {state?.error && (
                        <Alert type="danger">
                            {state.error}
                        </Alert>
                    )}
                    <div>
                        <Link className="text-sm" href="/password-reset">Forgot password?</Link>
                    </div>
                    <SubmitWithStatus fullWidth>Sign in</SubmitWithStatus>
                    <Text className="text-sm font-light">
                        Don’t have an account yet? <Link className="text-sm" href="/register">Sign up</Link>
                    </Text>
                </form>
            </Card>
        </>
    );
}