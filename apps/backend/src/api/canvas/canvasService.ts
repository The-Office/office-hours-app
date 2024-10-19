import axios from 'axios'
// Using this video as tutorial template [https://www.youtube.com/watch?v=g-XOxZxrW6Q]

export type Courses = {
    list: string;   // Json data
}

export type Files = {
    file_list: string; // Json file data?
}

export async function getCourses(accessToken: string): Promise<Courses> {
    const url = `https://ufl.instructure.com/api/v1/courses/`;
    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }
    const res = await axios.get(url, {
        method: 'GET',  // or 'POST', 'PUT', etc. if needed
        headers: headers
    });
    return { list: res.data }

}

export async function getCourseFiles(course_id: string, accessToken: string): Promise<Files> {
    const url = `https://ufl.instructure.com/api/v1/courses/${course_id}/files`

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }
    const res = await axios.get(url, {
        method: 'GET',
        headers: headers
    })
    return { file_list: res.data }
}