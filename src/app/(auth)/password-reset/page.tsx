'use client'

import { SubmitWithStatus } from '@/app/components/forms/submit-with-status';
import { useFormState } from 'react-dom';
import { resetPasswordAction } from '@/app/(auth)/password-reset/actions';

export default function PasswordResetPage(){
    const [state, formAction] = useFormState(resetPasswordAction, null)

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Reset your password
                            </h1>
                            <p>Enter your email address so we can send you a link to reset your password</p>
                            <form action={formAction} className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                                </div>
                                <SubmitWithStatus text="Send link" />
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}