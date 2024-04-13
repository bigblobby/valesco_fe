import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/components/ui/form/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/components/ui/form/select';
import { Button } from '@/lib/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { workoutPreMadeFormSchema } from '@/lib/validation/schemas/workout-pre-made.schema';
import * as z from 'zod';
import { useContext } from 'react';
import { LibraryContext } from '@/lib/providers/library-provider';

export type WorkoutPreMadeFormInputs = z.infer<typeof workoutPreMadeFormSchema>;

export default function LibrarySearch() {
    const { collection, setCollection } = useContext(LibraryContext);
    const form = useForm<WorkoutPreMadeFormInputs>({
        resolver: zodResolver(workoutPreMadeFormSchema),
        defaultValues: {
            collection: collection,
        }
    });

    function onSubmit(data: WorkoutPreMadeFormInputs) {
        setCollection(data.collection);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                <div>
                    <FormField
                        control={form.control}
                        name="collection"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Collection</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={collection}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a collection"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2001">Crossfit daily WODs 2001</SelectItem>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2002">Crossfit daily WODs 2002</SelectItem>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2003">Crossfit daily WODs 2003</SelectItem>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2004">Crossfit daily WODs 2004</SelectItem>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2005">Crossfit daily WODs 2005</SelectItem>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2006">Crossfit daily WODs 2006</SelectItem>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2007">Crossfit daily WODs 2007</SelectItem>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2008">Crossfit daily WODs 2008</SelectItem>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2009">Crossfit daily WODs 2009</SelectItem>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2010">Crossfit daily WODs 2010</SelectItem>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2011">Crossfit daily WODs 2011</SelectItem>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2012">Crossfit daily WODs 2012</SelectItem>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2013">Crossfit daily WODs 2013</SelectItem>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2014">Crossfit daily WODs 2014</SelectItem>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2015">Crossfit daily WODs 2015</SelectItem>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2016">Crossfit daily WODs 2016</SelectItem>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2017">Crossfit daily WODs 2017</SelectItem>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2018">Crossfit daily WODs 2018</SelectItem>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2019">Crossfit daily WODs 2019</SelectItem>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2020">Crossfit daily WODs 2020</SelectItem>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2021">Crossfit daily WODs 2021</SelectItem>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2022">Crossfit daily WODs 2022</SelectItem>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2023">Crossfit daily WODs 2023</SelectItem>
                                            <SelectItem value="crossfit-main-daily-wods-archive-2024">Crossfit daily WODs 2024</SelectItem>
                                            <SelectItem value="crossfit-main-hero-wods">Crossfit Hero WODs</SelectItem>
                                            <SelectItem value="crossfit-linchpin-daily-wods">Crossfit Linchpin daily WODs</SelectItem>
                                            <SelectItem value="crossfit-linchpin-monster-mash-wods">Crossfit Linchpin monster mash WODs</SelectItem>
                                            <SelectItem value="crossfit-mayhem-daily-wods">Crossfit Mayhem daily WODs</SelectItem>
                                            <SelectItem value="push-jerk-wods">Push Jerk WODs</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            );
                        }}
                    />
                </div>

                <Button type="submit">
                    Search
                </Button>
            </form>
        </Form>
    );
}