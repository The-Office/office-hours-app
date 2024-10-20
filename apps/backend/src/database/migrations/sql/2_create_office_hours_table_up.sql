CREATE TABLE IF NOT EXISTS office_hours (
  course_id INT,
  course_code VARCHAR(255) NOT NULL,
  host VARCHAR(255),
  modality VARCHAR(255),
  office_hour_location VARCHAR(255),
  start_time VARCHAR(255),
  end_time VARCHAR(255),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(course_id),
);
