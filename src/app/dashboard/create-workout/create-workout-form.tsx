'use client';

import Text from '@/lib/components/ui/text';
import Input from '@/lib/components/forms/input';
import { Button } from '@/lib/components/ui/button';
import { useWorkoutAPI } from '@/lib/hooks/api/useWorkoutApi';
import { toast } from 'react-hot-toast';

export default function CreateWorkoutForm() {
    const { createWorkout } = useWorkoutAPI();
    const { mutate, data, isPending } = createWorkout();

    function create(formDataJsonString: any) {
        return new Promise((resolve, reject) => {
            mutate(formDataJsonString, {
                onSuccess: () => {
                    resolve(void 0);
                },

                onError: () => {
                    reject();
                }
            });
        });
    }

    function handleSubmit(e: any) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const plainFormData = Object.fromEntries(formData.entries());
        const formDataJsonString = JSON.stringify(plainFormData);

        toast.promise(create(formDataJsonString), {
            loading: 'Creating workout...',
            error: 'Couldnn\'t create workout',
            success: 'Workout created!'
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <Input
                        withLabel={true}
                        labelText="Name"
                        id="name"
                        inputName="name"
                    />
                </div>
                <Button type="submit" disabled={isPending} showSpinnerOnDisabled>
                    Generate workout
                </Button>
                <Text>{data?.message}</Text>
                <Text className="text-red-500 text-sm dark:text-red-500">{data?.error}</Text>
            </form>
        </div>
    )
}