import axios from 'axios';

interface User {
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

interface OfficeHour {
  id: number;
  course_id: number;
  host: string;
  mode: 'remote' | 'in-person' | 'hybrid';
  link: string;
  location: string;
  start_time: string;
  end_time: string;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  created_at: string;
  updated_at: string;
}

interface Course {
  course_id: number;
  course_code: string;
  created_at: string;
  updated_at: string;
}

const fetchUser = async (userId: string): Promise<void> => {
  try {
    const response = await axios.get<User>(`http://localhost:8080/users/${userId}`);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

fetchUser('55558888');