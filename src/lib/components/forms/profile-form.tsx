'use client';

import Text from '@/lib/components/ui/text';
import Input from '@/lib/components/ui/form/input';
import Heading from '@/lib/components/ui/heading';
import { Button } from '@/lib/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage, FormDescription } from '@/lib/components/ui/form/form';
import { toast } from 'react-hot-toast';
import useProfileApi from '@/lib/hooks/api/useProfileApi';
import { TProfile } from '@/lib/types/table.types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/components/ui/form/select';

const profileFormSchema = z.object({
    username: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    height_feet: z.coerce.number(),
    height_inches: z.coerce.number(),
    weight: z.coerce.number(),
    activity_level: z.enum( [ 'none', 'light', 'moderate' , 'daily', 'heavy', 'athlete' ] ).nullable(),
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
            height_feet: profile.height_feet as number,
            height_inches: profile.height_inches as number,
            weight: profile.weight as number,
            activity_level: profile.activity_level ?? null,
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
        void toast.promise(update(data), {
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

                <div className="grid lg:grid-cols-2 gap-5">
                    <div className="space-y-4 md:space-y-6">
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
                                        <FormDescription>This is your public display name.</FormDescription>
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
                                        <FormDescription>Your first name is private.</FormDescription>
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
                                        <FormDescription>Your last name is private.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="space-y-4 md:space-y-6">
                        <div>
                            <Text variant="label">Height</Text>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="height_feet"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs text-muted">Feet</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} placeholder="5" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="height_inches"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs text-muted">Inches</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} placeholder="10" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div>
                            <FormField
                                control={form.control}
                                name="weight"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Weight (lbs)</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} placeholder="175" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div>
                            <FormField
                                control={form.control}
                                name="activity_level"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Activity level</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select an activity level" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="none">No exercise, sedentary</SelectItem>
                                                    <SelectItem value="light">Light exercise, 1-3 times a week</SelectItem>
                                                    <SelectItem value="moderate">Moderate exercise, 4-6 times a week</SelectItem>
                                                    <SelectItem value="daily">Daily exercise, 7 times a week</SelectItem>
                                                    <SelectItem value="heavy">Heavy exercise, 7+ times a week</SelectItem>
                                                    <SelectItem value="athlete">Very heavy exercise, multiple hours every day 7 days a week</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>

                <Button type="submit" disabled={isPending}>Save</Button>
            </form>
        </Form>
    );
}
