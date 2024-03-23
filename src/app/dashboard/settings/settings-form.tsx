import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/components/ui/form/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/components/ui/form/select';
import { Button } from '@/lib/components/ui/button';
import { toast } from 'react-hot-toast';
import { useTheme } from 'next-themes';
import useSettingsApi from '@/lib/hooks/api/useSettingsApi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Heading from '@/lib/components/ui/heading';
import Text from '@/lib/components/ui/text';
import { TSettings } from '@/lib/types/table.types';

const settingsFormSchema = z.object({
    theme: z.enum(['system', 'light', 'dark'])
});

type SettingsFormInputs = z.infer<typeof settingsFormSchema>;

interface SettingsFormProps {
    settings: TSettings;
}

export default function SettingsForm({ settings }: SettingsFormProps) {
    const { setTheme } = useTheme();
    const { updateSettings } = useSettingsApi();
    const { mutate, isPending } = updateSettings();
    const form = useForm({
        resolver: zodResolver(settingsFormSchema),
        defaultValues: {
            theme: settings.theme
        }
    });

    function update(data: any) {
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

    function onSubmit(data: SettingsFormInputs) {
        toast.promise(update(data), {
            loading: 'Updating settings...',
            error: 'Can\'t update settings',
            success: 'Settings updated',
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                <Heading as="h1" variant="h4">Settings</Heading>
                <Text className="text-xs">Edit your settings</Text>
                <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => {
                        return (
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
                        );
                    }}
                />

                <Button type="submit" className="w-full" disabled={isPending}>Save</Button>
            </form>
        </Form>
    );
}