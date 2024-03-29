'use client';

import pushJerkJson from '../../../push-jerk-wods.json';
import Heading from '@/lib/components/ui/heading';
import DOMPurify from 'dompurify';

export default function Test() {

    console.log(pushJerkJson);
    return (
        <ul>
            {pushJerkJson.map((workout) => {
                const sanitizedData = () => ({
                    __html: DOMPurify.sanitize(workout.content)
                })

                return (
                    <li key={workout.date} className="mb-10">
                        <Heading>{workout.date}</Heading>
                        <div className="dangerous-container" dangerouslySetInnerHTML={sanitizedData()}></div>
                    </li>
                )
            })}
        </ul>
    )
}