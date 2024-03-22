'use client';

import Card from '@/lib/components/ui/card';
import { useForm } from 'react-hook-form';
import { Button } from '@/lib/components/ui/button';
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/lib/components/ui/form/form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/lib/components/ui/form/select';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { SettingsContext } from '@/lib/providers/settings-provider';
import useSettingsApi from '@/lib/hooks/api/useSettingsApi';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from 'next-themes';

const settingsFormSchema = z.object({
    theme: z.enum(['system', 'light', 'dark']),
});

type SettingsFormInputs = z.infer<typeof settingsFormSchema>;

export default function Settings(){
    const { setTheme } = useTheme();
    const { settings } = useContext(SettingsContext);
    const { updateSettings } = useSettingsApi();
    const { mutate, isPending } = updateSettings();
    const form = useForm({
        defaultValues: {
            theme: settings.theme || 'system',
        },
        resolver: zodResolver(settingsFormSchema),
    });

    function update(data: any){
        return new Promise((resolve, reject) => {
            mutate(data, {
                onSuccess: () => {
                    localStorage.setItem('theme', data.theme);
                    setTheme(data.theme);
                    resolve(void 0);
                },

                onError: () => {
                    reject();
                },
            });
        });
    }

    function onSubmit(data: SettingsFormInputs){
        toast.promise(update(data), {
            loading: 'Updating settings...',
            error: 'Can\'t update settings',
            success: 'Settings updated',
        });
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-0">
            <Card>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="theme"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Theme</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a theme" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="light">Light</SelectItem>
                                            <SelectItem value="dark">Dark</SelectItem>
                                            <SelectItem value="system">System</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/*<FormField*/}
                        {/*    control={form.control}*/}
                        {/*    name="test"*/}
                        {/*    render={({ field }) => (*/}
                        {/*        <FormItem>*/}
                        {/*            <FormLabel>Test</FormLabel>*/}
                        {/*            <FormControl>*/}
                        {/*                <Input placeholder="Test" {...field} />*/}
                        {/*            </FormControl>*/}
                        {/*            <FormMessage />*/}
                        {/*        </FormItem>*/}
                        {/*    )}*/}
                        {/*/>*/}
                        <Button type="submit" disabled={isPending}>Save</Button>
                    </form>
                </Form>
            </Card>
        </div>
    )
}