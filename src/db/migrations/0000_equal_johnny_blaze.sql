CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`completed` integer DEFAULT false NOT NULL,
	`name` text NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
