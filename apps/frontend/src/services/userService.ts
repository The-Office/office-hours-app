import api from "./api";

export interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  img_url: string | null;
  role: 'professor' | 'teaching_assistant' | 'student';
  ical_link: string | null;
  created_at: string;
  updated_at: string;
}

export interface OfficeHour {
  id: number;
  course_id: number;
  course_code: string;
  host: string;
  mode: "remote" | "in-person" | "hybrid";
  link?: string;
  location?: string;
  start_time: string;
  end_time: string;
  day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
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

// Fetch user by ID
export const fetchUser = async (): Promise<User | null> => {
  try {
    const response = await api.get("/users/me");
    const payload = response.data;
    return payload.data;
  } catch (error) {
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
