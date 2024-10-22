import axios from 'axios';
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
  mode: 'remote' | 'in-person' | 'hybrid';
  link?: string;
  location?: string;
  start_time: string;
  end_time: string;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  created_at: string;
  updated_at: string;
}

export interface Course {
  course_id: number;
  course_code: string;
  created_at: string;
  updated_at: string;
}

// Fetch user by ID
export const fetchUser = async (userId: number): Promise<User | {}> => {
  try {
    const response = await axios.get(`http://localhost:8080/users/${userId}`);
    const payload = response.data;
    return payload.data;
    // Sample return data
    // const sampleUser: User = {
    //   id: 1,
    //   canvas_user_id: 1234,
    //   email: 'john.doe@example.com',
    //   first_name: 'John',
    //   last_name: 'Doe',
    //   canvas_login_id: 'jdoe',
    //   access_token: 'sampleAccessToken',
    //   refresh_token: 'sampleRefreshToken',
    //   token_expiration: '2024-12-31T23:59:59Z',
    //   is_active: 1,
    //   ical_link: 'http://example.com/calendar.ics',
    //   created_at: '2023-01-01T12:00:00Z',
    //   updated_at: '2023-10-01T12:00:00Z'
    // };
    // console.log(sampleUser);
    // return sampleUser;
  } catch (error) {
    console.error('Error fetching user:', error);
    return {};
  }
};

// Fetch courses for a user by ID
export const fetchCourses = async (userId: number): Promise<Course[]> => {
  try {
    const response = await axios.get(`http://localhost:8080/users/${userId}/courses`);
    const payload = response.data;
    return payload.data;
    // Sample return data
    // const sampleCourses: Course[] = [
    //   {
    //     course_id: 508104,
    //     course_code: 'CDA3101',
    //     created_at,
    //     updated_at
    //   },
    //   {
    //     course_id: 507903,
    //     course_code: 'COP4533',
    //     created_at,
    //     updated_at
    //   }
    // ];
    // console.log(sampleCourses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};

export const fetchOfficeHours = async (userId: number): Promise<OfficeHour[]> => {
  try {
    const response = await axios.get(`http://localhost:8080/users/${userId}/office-hours`);
    const payload = response.data;
    return payload.data;

    // const sampleOfficeHours: OfficeHour[] = [
    //   {
    //     course_id: 508104,
    //     course_code: "CDA3101",
    //     host: "Shreyas Adireddy",
    //     mode: "remote",
    //     link: "https://discord.gg/eXU9Q7J8hm",
    //     start_time: "9:35 am",
    //     end_time: "10:25 am",
    //     day: "monday",
    //     created_at,
    //     updated_at
    //   },
    //   {
    //     course_id: 508104,
    //     course_code: "CDA3101",
    //     host: "Chris Tressler",
    //     mode: "in-person",
    //     location: "MALA5200",
    //     start_time: "9:35 am",
    //     end_time: "10:25 am",
    //     day: "tuesday",
    //     created_at,
    //     updated_at
    //   },
    //   {
    //     course_id: 508104,
    //     course_code: "CDA3101",
    //     host: "Shreyas Adireddy",
    //     mode: "remote",
    //     link: "https://discord.gg/eXU9Q7J8hm",
    //     start_time: "9:35 am",
    //     end_time: "10:25 am",
    //     day: "wednesday",
    //     created_at,
    //     updated_at
    //   },
    //   {
    //     course_id: 508104,
    //     course_code: "CDA3101",
    //     host: "Tony Wong",
    //     mode: "remote",
    //     link: "https://discord.gg/eXU9Q7J8hm",
    //     start_time: "9:35 am",
    //     end_time: "10:25 am",
    //     day: "thursday",
    //     created_at,
    //     updated_at
    //   },
    //   {
    //     course_id: 508104,
    //     course_code: "CDA3101",
    //     host: "Anna Albertelli",
    //     mode: "in-person",
    //     location: "MALA5200",
    //     start_time: "9:35 am",
    //     end_time: "10:25 am",
    //     day: "friday",
    //     created_at,
    //     updated_at
    //   },
    //   {
    //     course_id: 507903,
    //     course_code: "CDA3101",
    //     host: "Adam Bracci",
    //     mode: "remote",
    //     link: "https://discord.gg/eXU9Q7J8hm",
    //     start_time: "10:40 am",
    //     end_time: "11:30 am",
    //     day: "monday",
    //     created_at,
    //     updated_at
    //   },
    //   {
    //     course_id: 507903,
    //     course_code: "CDA3101",
    //     host: "Jackie Wang",
    //     mode: "in-person",
    //     location: "MALA5200",
    //     start_time: "10:40 am",
    //     end_time: "11:30 am",
    //     day: "tuesday",
    //     created_at,
    //     updated_at
    //   },
    //   {
    //     course_id: 507903,
    //     course_code: "CDA3101",
    //     host: "Adam Benali",
    //     mode: "in-person",
    //     location: "MALA5200",
    //     start_time: "10:40 am",
    //     end_time: "11:30 am",
    //     day: "wednesday",
    //     created_at,
    //     updated_at
    //   },
    //   {
    //     course_id: 507903,
    //     course_code: "CDA3101",
    //     host: "Tony Wong",
    //     mode: "remote",
    //     link: "https://discord.gg/eXU9Q7J8hm",
    //     start_time: "10:40 am",
    //     end_time: "11:30 am",
    //     day: "thursday",
    //     created_at,
    //     updated_at
    //   },
    //   {
    //     course_id: 507903,
    //     course_code: "CDA3101",
    //     host: "Anna Albertelli",
    //     mode: "in-person",
    //     location: "MALA5200",
    //     start_time: "10:40 am",
    //     end_time: "11:30 am",
    //     day: "friday",
    //     created_at,
    //     updated_at
    //   },
    //   {
    //     course_id: 507903,
    //     course_code: "CDA3101",
    //     host: "Shane Ferrell",
    //     mode: "in-person",
    //     location: "MALA5200",
    //     start_time: "11:45 am",
    //     end_time: "12:35 pm",
    //     day: "thursday",
    //     created_at,
    //     updated_at
    //   },
    //   {
    //     course_id: 507903,
    //     course_code: "COP3503",
    //     host: "Shane Ferrell",
    //     mode: "in-person",
    //     location: "MALA5200",
    //     start_time: "12:50 pm",
    //     end_time: "1:40 pm",
    //     day: "wednesday",
    //     created_at,
    //     updated_at
    //   },
    //   {
    //     course_id: 508104,
    //     course_code: "COP3503",
    //     host: "Ethan King",
    //     mode: "in-person",
    //     location: "MALA5200",
    //     start_time: "1:55 pm",
    //     end_time: "2:45 pm",
    //     day: "monday",
    //     created_at,
    //     updated_at
    //   },
    //   {
    //     course_id: 508104,
    //     course_code: "COP3503",
    //     host: "Brandon Barker",
    //     mode: "in-person",
    //     location: "MALA5200",
    //     start_time: "1:55 pm",
    //     end_time: "2:45 pm",
    //     day: "tuesday",
    //     created_at,
    //     updated_at
    //   },
    //   {
    //     course_id: 508104,
    //     course_code: "COP3503",
    //     host: "Adam Hassan",
    //     mode: "in-person",
    //     location: "MALA5200",
    //     start_time: "1:55 pm",
    //     end_time: "2:45 pm",
    //     day: "friday",
    //     created_at,
    //     updated_at
    //   },
    //   {
    //     course_id: 508104,
    //     course_code: "COP3503",
    //     host: "Chris Tressler",
    //     mode: "in-person",
    //     location: "MALA5200",
    //     start_time: "4:05 pm",
    //     end_time: "4:55 pm",
    //     day: "monday",
    //     created_at,
    //     updated_at
    //   },
    //   {
    //     course_id: 508104,
    //     course_code: "COP3503",
    //     host: "Brandon Barker",
    //     mode: "in-person",
    //     location: "MALA5200",
    //     start_time: "4:05 pm",
    //     end_time: "4:55 pm",
    //     day: "wednesday",
    //     created_at,
    //     updated_at
    //   },
    //   {
    //     course_id: 508104,
    //     course_code: "COP3503",
    //     host: "Adam Bracci",
    //     mode: "remote",
    //     link: "https://discord.gg/eXU9Q7J8hm",
    //     start_time: "4:05 pm",
    //     end_time: "4:55 pm",
    //     day: "friday",
    //     created_at,
    //     updated_at
    //   },
    // ]
    // console.log(sampleOfficeHours);
    // return sampleOfficeHours;
  } catch (error) {
    console.error('Error fetching office hours:', error);
    return [];
  }
};

