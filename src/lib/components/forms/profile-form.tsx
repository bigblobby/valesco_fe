'use client'

import Text from '@/lib/components/ui/text';
import Input from '@/lib/components/ui/form/input';
import Card from '@/lib/components/ui/card';
import Heading from '@/lib/components/ui/heading';
import { Button } from '@/lib/components/ui/button';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/lib/components/ui/form/form';
import { toast } from 'react-hot-toast';
import useProfileApi from '@/lib/hooks/api/useProfileApi';

const profileFormSchema = z.object({
    username: z.string(),
    first_name: z.string(),
    last_name: z.string(),
});

type ProfileFormInputs = z.infer<typeof profileFormSchema>;

export default function ProfileForm() {
    const { getProfile, updateProfile } = useProfileApi();
    const { data, isLoading, isFetching } = getProfile();
    const { mutate, isPending } = updateProfile();

    const form = useForm({
        defaultValues: {
            username: '',
            first_name: '',
            last_name: '',
        },
        resolver: zodResolver(profileFormSchema),
    });

    useEffect(() => {
        form.reset({
            username: data?.data.username ?? '',
            first_name: data?.data.first_name ?? '',
            last_name: data?.data.last_name ?? '',
        })
    }, [data]);

    function update(data: any){
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
        <Card className="sm:max-w-md">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4 md:space-y-6">
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

                        <div>
                            <Button className="w-full" type="submit" disabled={isPending}>Save</Button>
                        </div>
                    </div>
                </form>
                {/*<div className="space-y-4 md:space-y-6">*/}
                {/*    {state?.error && (*/}
                {/*        <AlertWithDismiss key={Date.now()} variant="danger">{state.error}</AlertWithDismiss>*/}
                {/*    )}*/}

                {/*    {state?.message && (*/}
                {/*        <AlertWithDismiss key={Date.now()} autoDismiss variant="success">{state.message}</AlertWithDismiss>*/}
                {/*    )}*/}

                {/*    <SubmitWithStatus fullWidth>Save</SubmitWithStatus>*/}
                {/*</div>*/}
            </Form>
        </Card>
    )
}
