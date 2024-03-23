'use client';

import Text from '@/lib/components/ui/text';
import Input from '@/lib/components/ui/form/input';
import Heading from '@/lib/components/ui/heading';
import { Button } from '@/lib/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/lib/components/ui/form/form';
import { toast } from 'react-hot-toast';
import useProfileApi from '@/lib/hooks/api/useProfileApi';
import { TProfile } from '@/lib/types/table.types';

const profileFormSchema = z.object({
    username: z.string(),
    first_name: z.string(),
    last_name: z.string(),
});

type ProfileFormInputs = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
    profile: TProfile;
}

export default function ProfileForm({ profile }: ProfileFormProps) {
    const { updateProfile } = useProfileApi();
    const { mutate, isPending } = updateProfile();
    const form = useForm({
        defaultValues: {
            username: profile.username ?? '',
            first_name: profile.first_name ?? '',
            last_name: profile.last_name ?? '',
        },
        resolver: zodResolver(profileFormSchema),
    });

    function update(data: any) {
        return new Promise((resolve, reject) => {
            mutate(data, {
                onSuccess: () => {
                    resolve(void 0);
                },

                onError: () => {
                    reject();
                },
            });
        });
    }

    function onSubmit(data: ProfileFormInputs) {
        toast.promise(update(data), {
            loading: 'Updating profile...',
            error: 'Can\'t update profile',
            success: 'Profile updated',
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                <Heading as="h1" variant="h4">Profile</Heading>
                <Text className="text-xs">Edit your profile</Text>
                <div>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div>
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div>
                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button className="w-full" type="submit" disabled={isPending}>Save</Button>
            </form>
        </Form>
    );
}
