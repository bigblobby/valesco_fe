import Display from '@/app/test/display';
import { getBlogs } from '@/app/test/actions';

export default async function TestPage(){
    const data = await getBlogs();

    return (
        <div>
            <h1>The test page</h1>

            <Display data={data} />
        </div>
    )
}