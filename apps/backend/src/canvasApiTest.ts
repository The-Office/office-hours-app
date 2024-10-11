
// Using this video as tutorial template [https://www.youtube.com/watch?v=g-XOxZxrW6Q]

export type Course = {
    name: string;
}

export async function getCourseName(accessToken: string): Promise<Course> {
    const url = `https://ufl.instructure.com/api/v1/courses`;
    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }
    const res = await fetch(url, {
        method: 'GET',  // or 'POST', 'PUT', etc. if needed
        headers: headers
    });
    const obj = await res.json();
    return { name: obj[1].name }

}