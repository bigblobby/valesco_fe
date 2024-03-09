'use client';

import { SubmitWithStatus } from '@/app/components/forms/submit-with-status';
import Text from '@/app/components/ui/text';
import Input from '@/app/components/forms/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function CreateWorkoutForm() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (formData: any) => {
            const res = await fetch('/api/workouts', {
                method: 'POST',
                body: formData
            });

            return await res.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workouts'] })
        }
    })

    function handleSubmit(e: any) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const plainFormData = Object.fromEntries(formData.entries());
        const formDataJsonString = JSON.stringify(plainFormData);

        mutation.mutate(formDataJsonString);
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
                <SubmitWithStatus>Generate workout</SubmitWithStatus>
                {/*<Text>{state.message}</Text>*/}
                {/*<Text className="text-red-500 text-sm dark:text-red-500">{state.error}</Text>*/}
            </form>
        </div>
    )
}