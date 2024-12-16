CREATE TABLE audit_log (
    id SERIAL PRIMARY KEY,
    data_id INTEGER REFERENCES office_hours(id),
    user_id VARCHAR(255),
    action VARCHAR(255),
    data_before JSON,
    data_after JSON,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);