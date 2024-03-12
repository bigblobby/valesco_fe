'use client';

import { createClient } from '@/lib/utils/supabase/client';
import { useState } from 'react';
import Text from '@/lib/components/ui/text';
import Input from '@/lib/components/forms/input';
import { Button } from '@/lib/components/ui/button';
import Card from '@/lib/components/ui/card';

export default function ChangePassword({ session }: any) {
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
                <Text component="h1" variant="h4">Change your password</Text>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div>
                        <Input
                            withLabel
                            labelText="Your new password"
                            required
                            id="password"
                            name="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button type="submit" fullWidth>Reset</Button>
                </form>
            </div>
        </Card>
    );
}