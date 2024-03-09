'use client';

import { useFormState } from 'react-dom';
import { createWorkout } from '@/app/dashboard/create-workout/actions';
import { SubmitWithStatus } from '@/app/components/forms/submit-with-status';
import Text from '@/app/components/ui/text';
import Input from '@/app/components/forms/input';

export default function CreateWorkoutForm() {
    const [state, formAction] = useFormState(createWorkout, {
        message: '',
        error: '',
        data: null,
    });

    return (
        <div>
            <form action={formAction}>
                <div>
                    <Input
                        withLabel={true}
                        labelText="Name"
                        id="name"
                        inputName="name"
                    />
                </div>
                <SubmitWithStatus>Generate workout</SubmitWithStatus>
                <Text>{state.message}</Text>
                <Text className="text-red-500 text-sm dark:text-red-500">{state.error}</Text>
            </form>
        </div>
    )
}