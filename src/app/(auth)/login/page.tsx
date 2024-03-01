'use client';

import Link from 'next/link'
import { loginAction } from '@/app/(auth)/login/actions';
import { useFormState } from 'react-dom';
import { SubmitWithStatus } from '@/app/components/forms/submit-with-status';

export default function LoginPage() {
    const [state, formAction] = useFormState(loginAction, null);

    return (
        <>
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Valesco
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form action={formAction} className="space-y-4 md:space-y-6">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        {state?.error && (
                            <div className="text-red-500 text-sm">
                                {state.error}
                            </div>
                        )}
                        <div>
                            <Link className="text-sm font-medium text-gray-500 hover:underline dark:text-gray-400" href="/password-reset">Forgot password?</Link>
                        </div>
                        <SubmitWithStatus text={'Sign in'} />
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <Link className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500" href="/register">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}