'use client';

import { createClient } from '@/lib/utils/supabase/client';
import { ChangeEvent, useState } from 'react';
import Input from '@/lib/components/ui/form/input';
import { Button } from '@/lib/components/ui/button';
import Card from '@/lib/components/ui/card';
import Heading from '@/lib/components/ui/heading';

export default function ChangePassword() {
    const [password, setPassword] = useState<string>();
    const supabase = createClient();

    async function handleSubmit(e: any) {
        e.preventDefault();

        if (password) {
            await supabase.auth.updateUser({ password: password }).then((data) => {
                console.log(data);
            }).catch(err => {
                console.log(err);
            });
        }
    }

    return (
        <Card className="sm:max-w-md">
            <div className="space-y-4 md:space-y-6">
                <Heading as="h1" variant="h4">Change your password</Heading>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div>
                        <Input
                            withLabel
                            labelText="Your new password"
                            required
                            id="password"
                            name="password"
                            type="password"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button type="submit" fullWidth>Reset</Button>
                </form>
            </div>
        </Card>
    );
}