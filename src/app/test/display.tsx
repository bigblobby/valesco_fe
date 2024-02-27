'use client'

export default function Display(props: any){
    return (
        <div>
            <ul>
                {props.data.length > 0 && props.data.map((post: any) => {
                    return (
                        <li key={post.id} className="mb-5">
                            <h3 className="font-bold text-xl">{post.title}</h3>
                            <p>{post.body}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}