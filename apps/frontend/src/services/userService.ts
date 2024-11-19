import api from "./api";

export interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  img_url: string | null;
  role: 'admin' | 'professor' | 'teaching_assistant' | 'student';
  ical_link: string | null;
  created_at: string;
  updated_at: string;
}

export interface OfficeHour {
  id: number;
  course_id: number;
  course_code: string;
  host: string;
  mode: string;
  link?: string;
  location?: string;
  start_time: string;
  end_time: string;
  day: string;
  created_at: string;
  updated_at: string;
}

export interface Course {
  course_id: number;
  course_code: string;
  created_at: string;
  updated_at: string;
}

export interface Payload {
  statusCode: number;
  data: Record<string, any>;
  message: string;
}

export const storeUser = async (): Promise<User | null> => {
  try {
    const response = await api.post(`/users/me`);
    const payload = response.data;
    return payload;
  } catch (error) {
    console.error("Error storing user:", error);
    return null;
  }
}

// Fetch user by ID
export const fetchUser = async (): Promise<User | null> => {
  try {
    const response = await api.get("/users/me");
    const payload = response.data;
    return payload.data;
  } catch (error) {
    const user = await storeUser();
    if (user) {
      return user;
    }
    console.error("Error fetching user:", error);
    return null;
  }
};

// Fetch courses for a user by ID
export const fetchCourses = async (): Promise<Course[]> => {
  try {
    const response = await api.get(`/users/me/courses`);
    const payload = response.data;
    return payload.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

export const fetchCourseById = async (courseId: number): Promise<Course | null> => {
  try {
    const response = await api.get(`/users/courses/${courseId}`);
    const payload = response.data;
    return payload.data;
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
}

export const fetchOfficeHours = async (): Promise<OfficeHour[]> => {
  try {
    const response = await api.get(`/users/me/office-hours`);
    const payload = response.data;
    return payload.data;
  } catch (error) {
    console.error("Error fetching office hours:", error);
    return [];
  }
};

export const sendFeedback = async (rating: number, content: string): Promise<Payload | null> => {
  try {
    const response = await api.post(`/users/feedback`, {
      rating,
      content,
    });
    const payload = response.data;
    return payload;
  } catch (error) {
    console.error("Error fetching office hours:", error);
    return null;
  }
};

export const storeOfficeHour = async (officeHour: Record<string, any>): Promise<Payload | null> => {
  try {
    const response = await api.post(`/users/office-hours`, officeHour);
    const payload = response.data;
    return payload;
  } catch (error) {
    console.error("Error storing office hour:", error);
    return null;
  }
}

export const storeCourse = async (course: Record<string, any>): Promise<Payload | null> => {
  try {
    const response = await api.post(`/users/courses`, course);
    const payload = response.data;
    return payload;
  } catch (error) {
    console.error("Error storing course:", error);
    return null;
  }
}
