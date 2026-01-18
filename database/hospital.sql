-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jan 18, 2026 at 01:56 PM
-- Server version: 8.0.40
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `doctor_id` int DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `location` varchar(150) DEFAULT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `user_id`, `doctor_id`, `department`, `location`, `appointment_date`, `appointment_time`, `description`, `created_at`) VALUES
(3, 11, 4, 'Children’s Cardiology', 'Building A – Room 203', '2026-01-20', '10:30:00', 'Heart check-up with ultrasound', '2026-01-05 09:17:12'),
(4, 11, 4, 'Pediatrics', 'Building C – Room 101', '2026-01-22', '14:00:00', 'Regular pediatric follow-up', '2026-01-05 09:17:12'),
(23, 11, 7, 'Children’s Cardiology', 'Building A – Room 205', '2026-01-24', '10:30:00', 'Heart check-up with ultrasound maybe', '2026-01-05 09:17:12'),
(24, 11, 4, 'Children’s Cardiology', 'Building hfcycvhA – Room 205', '2026-01-26', '15:00:00', 'Heart check-up with ultrasound maybe', '2026-01-05 09:17:12');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `specialty` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `name`, `specialty`, `created_at`) VALUES
(4, 'Dr. Emily Carter', 'Pediatrics', '2026-01-04 21:20:07'),
(5, 'Dr. James Wilson', 'Pediatric Surgery', '2026-01-04 21:20:07'),
(6, 'Dr. Sofia Martinez', 'Child Psychology', '2026-01-04 21:20:07'),
(7, 'Dr. Oliver Brown', 'Pediatric Oncology', '2026-01-04 21:20:07'),
(8, 'Dr. Amelia Green', 'Pediatric Neurology', '2026-01-04 21:20:07'),
(9, 'Dr. Daniel Lee', 'Pediatric Cardiology', '2026-01-04 21:20:07'),
(11, 'Dr. John Miller', 'Pediatrics', '2026-01-05 09:15:58');

-- --------------------------------------------------------

--
-- Table structure for table `hospital_buddies`
--

CREATE TABLE `hospital_buddies` (
  `id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `icon_filename` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `hospital_buddies`
--

INSERT INTO `hospital_buddies` (`id`, `name`, `icon_filename`) VALUES
(1, 'Bear', 'bear.png'),
(2, 'Tiger', 'tiger.png'),
(3, 'Dog', 'dog.png'),
(4, 'Fox', 'fox.png'),
(5, 'Owl', 'owl.png'),
(6, 'Lion', 'lion.png'),
(7, 'Panda', 'panda.png'),
(8, 'Rabbit', 'rabbit.png');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` enum('ward','lab','imaging','rehab') DEFAULT 'ward',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `name`, `type`, `created_at`) VALUES
(1, 'Ward 4', 'ward', '2025-12-17 13:53:14'),
(2, 'Radiology Dept', 'imaging', '2025-12-17 13:53:14'),
(3, 'Lab Room 2', 'lab', '2025-12-17 13:53:14');

-- --------------------------------------------------------

--
-- Table structure for table `medicines`
--

CREATE TABLE `medicines` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `dosage` varchar(50) NOT NULL,
  `time` time NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `is_taken` tinyint(1) DEFAULT '0',
  `doctor_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `medicines`
--

INSERT INTO `medicines` (`id`, `user_id`, `name`, `dosage`, `time`, `start_date`, `end_date`, `is_taken`, `doctor_id`, `created_at`) VALUES
(1, 11, 'Paracetamol', '500mg', '23:00:00', '2026-01-18', '2026-02-28', 0, 5, '2026-01-04 22:53:58'),
(2, 11, 'Amoxicillin', '250mg', '12:00:00', '2026-01-18', '2026-02-28', 0, 5, '2026-01-04 22:53:58'),
(3, 11, 'Ibuprofen', '200mg', '09:00:00', '2026-02-03', '2026-03-31', 0, 6, '2026-01-04 22:53:58'),
(4, 11, 'Ibuprofen max', '200mg', '09:00:00', '2026-02-28', '2026-03-31', 0, 5, '2026-01-04 22:53:58');

-- --------------------------------------------------------

--
-- Table structure for table `moods`
--

CREATE TABLE `moods` (
  `id` int NOT NULL,
  `key_name` varchar(50) NOT NULL,
  `label` varchar(50) NOT NULL,
  `emoji_filename` varchar(100) NOT NULL,
  `color` varchar(50) DEFAULT NULL,
  `encouragement_title` varchar(100) NOT NULL,
  `encouragement_text` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `moods`
--

INSERT INTO `moods` (`id`, `key_name`, `label`, `emoji_filename`, `color`, `encouragement_title`, `encouragement_text`, `created_at`) VALUES
(1, 'happy', 'Happy', 'beaming.png', 'yellow', 'You’re shining!', 'It’s wonderful to feel happy. Keep smiling!', '2026-01-08 19:18:38'),
(2, 'silly', 'Silly', 'wink_tongue.png', 'purple', 'That’s fun!', 'Being silly can make the day brighter 😜', '2026-01-08 19:18:38'),
(3, 'angry', 'Angry', 'steam.png', 'red', 'It’s okay to feel angry', 'Take a deep breath. Big feelings are okay 💛', '2026-01-08 19:18:38'),
(4, 'confused', 'Confused', 'spiral.png', 'blue', 'You’re not alone', 'Everyone feels confused sometimes. We’ll figure it out together 🤗', '2026-01-08 19:18:38'),
(5, 'proud', 'Proud', 'halo.png', 'teal', 'You did something great!', 'You should feel proud of yourself ✨', '2026-01-08 19:18:38'),
(6, 'sad', 'Sad', 'sad.png', 'indigo', 'It’s okay to feel sad', 'Sometimes we feel sad, and that’s okay. You are not alone 💙', '2026-01-08 19:22:01');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `firstName` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `surname` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `dob` date DEFAULT NULL,
  `hospital_number` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `department_id` int DEFAULT NULL,
  `telephone_number` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `doctor_id` int DEFAULT NULL,
  `location_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `surname`, `dob`, `hospital_number`, `email`, `department_id`, `telephone_number`, `password`, `created_at`, `doctor_id`, `location_id`) VALUES
(11, 'Nataliia', 'Yareshko', '1993-01-19', 'nata', 'n@gmail.com', 1, '777777777', '$2b$10$OUnOunUB/rum5pbiTO4a8Oift0BK8EzaCSrn4/QWj8x7MzazgfJGm', '2025-12-09 21:16:27', 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_moods`
--

CREATE TABLE `user_moods` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `mood_id` int NOT NULL,
  `mood_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_appointments_user` (`user_id`),
  ADD KEY `fk_appointments_doctor` (`doctor_id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hospital_buddies`
--
ALTER TABLE `hospital_buddies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medicines`
--
ALTER TABLE `medicines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `moods`
--
ALTER TABLE `moods`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `key_name` (`key_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_user_doctor` (`doctor_id`),
  ADD KEY `fk_user_location` (`location_id`);

--
-- Indexes for table `user_moods`
--
ALTER TABLE `user_moods`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_mood_per_day` (`user_id`,`mood_date`),
  ADD KEY `fk_user_moods_mood` (`mood_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `hospital_buddies`
--
ALTER TABLE `hospital_buddies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `medicines`
--
ALTER TABLE `medicines`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `moods`
--
ALTER TABLE `moods`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user_moods`
--
ALTER TABLE `user_moods`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `fk_appointments_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_appointments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `medicines`
--
ALTER TABLE `medicines`
  ADD CONSTRAINT `medicines_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `medicines_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_user_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`),
  ADD CONSTRAINT `fk_user_location` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`);

--
-- Constraints for table `user_moods`
--
ALTER TABLE `user_moods`
  ADD CONSTRAINT `fk_user_moods_mood` FOREIGN KEY (`mood_id`) REFERENCES `moods` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user_moods_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
