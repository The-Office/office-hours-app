import axios from "axios";
// const created_at = '2023-10-01T09:00:00Z'
// const updated_at = '2023-10-15T09:00:00Z'

export interface User {
  id: number;
  canvas_user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  canvas_login_id: string;
  access_token: string;
  refresh_token: string;
  token_expiration: string;
  is_active: number;
  ical_link: string;
  created_at: string;
  updated_at: string;
}

export interface OfficeHour {
  id?: number;
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
  data: Record<string, unknown>;
  message: string;
}

// Fetch user by ID
export const fetchUser = async (userId: number): Promise<User | object> => {
  try {
    const response = await axios.get(`http://localhost:8080/users/${userId}`);
    const payload = response.data;
    return payload.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return {};
  }
};

// Fetch courses for a user by ID
export const fetchCourses = async (userId: number): Promise<Course[]> => {
  try {
    const response = await axios.get(`http://localhost:8080/users/${userId}/courses`);
    const payload = response.data;
    return payload.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

export const fetchOfficeHours = async (userId: number): Promise<OfficeHour[]> => {
  try {
    const response = await axios.get(`http://localhost:8080/users/${userId}/office-hours`);
    const payload = response.data;
    return payload.data;
  } catch (error) {
    console.error("Error fetching office hours:", error);
    return [];
  }
};

export const sendFeedback = async (userId: number, rating: number, content: string): Promise<Payload | null> => {
  try {
    const response = await axios.post(`http://localhost:8080/users/${userId}/feedback`, {
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
