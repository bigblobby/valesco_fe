'use client';

import { useSession } from '@/lib/hooks/useSession';
import Card from '@/lib/components/ui/card';
import { useForm } from 'react-hook-form';
import { Button } from '@/lib/components/ui/button';
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/lib/components/ui/form/form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/lib/components/ui/form/select';
import Input from '@/lib/components/ui/form/input';
import { useContext } from 'react';
import { SettingsContext } from '@/lib/providers/settings-provider';

export default function Settings(){
    const {session} = useSession();
    const { settings } = useContext(SettingsContext);
    const form = useForm({
        defaultValues: {
            theme: settings.theme || 'system',
            test: '',
        }
    });

    console.log(settings);

    if (!session) return null;

    function onSubmit(data: any){
        console.log(data);
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

                        <FormField
                            control={form.control}
                            name="test"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Test</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Test" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Save</Button>
                    </form>
                </Form>
            </Card>
        </div>
    )
}