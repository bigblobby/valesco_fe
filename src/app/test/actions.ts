'use server';

export async function getBlogs(){

    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        next: {revalidate: 10}
    })

    return await response.json();
}