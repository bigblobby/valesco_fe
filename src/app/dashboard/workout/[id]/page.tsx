import { getWorkout } from '@/app/dashboard/workout/[id]/actions';
import Text from '@/app/components/ui/text';

interface WorkoutPageProps {
    params: {
        id: string;
    }
}

export default async function WorkoutPage({
    params
}: WorkoutPageProps){
    const { error, message, data } = await getWorkout(params.id);

    return (
        <div>
            {data && (
                <>
                    <Text component="h1" variant="h4">{data.name}</Text>
                    <Text className="text-sm">{data.created_at}</Text>
                    <Text>{data.content}</Text>
                </>
            )}
        </div>
    )
}