CREATE TABLE "projects" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "projects_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"project-name" varchar(255) NOT NULL,
	"creator-name" varchar(255) NOT NULL,
	"project-url" varchar(255) NOT NULL,
	"screenshot-url" text NOT NULL,
	"date-added" timestamp DEFAULT now() NOT NULL
);
