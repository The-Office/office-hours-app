CREATE TABLE IF NOT EXISTS office_hours (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT,
  host VARCHAR(255),
  mode ENUM('remote', 'in-person', 'hybrid'),
  link VARCHAR(255),
  location VARCHAR(255),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  day ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday') NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);
