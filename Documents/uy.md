
```mysql
-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS portofolio;

-- Use it
USE portofolio;

-- Create the Projects table
CREATE TABLE IF NOT EXISTS Projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  weblink VARCHAR(500),
  github_link VARCHAR(500),
  frameworks_languages TEXT,
  summary TEXT,
  description TEXT,
  image_link VARCHAR(500),
  category ENUM('Website', 'Mobile App', 'Dashboard', 'Game', 'Script','Case-study','Other') DEFAULT 'Other',
  status ENUM('To start','Unfinished', 'Completed', 'Developing') DEFAULT 'To start',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

```