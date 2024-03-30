'use client';

import pushJerkJson from '../../../push-jerk-wods.json';
import Heading from '@/lib/components/ui/heading';
import { ParseContent } from '@/app/dashboard/test/parse-content';

export default function Test() {
    return (
        <ul>
            {pushJerkJson.map((workout) => {
                return (
                    <li key={workout.date} className="mb-10">
                        <Heading>{workout.date}</Heading>
                        <ParseContent content={workout.content} />
                    </li>
                )
            })}
        </ul>
    )
}