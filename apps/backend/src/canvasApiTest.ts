
// Using this video as tutorial template [https://www.youtube.com/watch?v=g-XOxZxrW6Q]

export type Course = {
    name: string;
}

export async function getCourseName(accessToken: string): Promise<Course> {
    const url = `https://ufl.instructure.com/api/v1/courses?access_token=${accessToken}`;

    const res = await fetch(url);
    const obj = await res.json();
    return { name: obj[1].name }

}