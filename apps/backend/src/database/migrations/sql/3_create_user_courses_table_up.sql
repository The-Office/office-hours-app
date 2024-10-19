CREATE TABLE IF NOT EXISTS user_courses (
  user_id INT,
  course_id INT,
  course_code VARCHAR(255) NOT NULL,
  instructor_id INT,
  class_period INT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id), 
  FOREIGN KEY (course_id) REFERENCES courses(course_id), 
  FOREIGN KEY (instructor_id) REFERENCES users(id) 
);
