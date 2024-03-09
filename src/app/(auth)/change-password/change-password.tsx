'use client'

import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';
import Text from '@/app/components/ui/text';
import Input from '@/app/components/forms/input';
import Button from '@/app/components/ui/button';

export default function ChangePassword({session}: any){
    const [password, setPassword] = useState<string>();
    const supabase = createClient();

    async function handleSubmit(e: any){
        e.preventDefault();

        if (password) {
            await supabase.auth.updateUser({ password: password }).then((data) => {
                console.log(data);
            }).catch(err => {
                console.log(err);
            })
        }
    }

    return (
        <div className="w-full bg-white rounded-sm shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <Text component="h1" variant="h4">Change your password</Text>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div>
                        <Input
                            withLabel
                            isRequired
                            id="password"
                            inputName="password"
                            inputType="password"
                            labelText="Your new password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button type="submit" fullWidth>Reset</Button>
                </form>
            </div>
        </div>
    )
}