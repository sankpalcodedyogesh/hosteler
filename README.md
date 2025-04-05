# hosteler
# Hostel Management System

This is a web-based Hostel Management System built with **Spring Boot**, **ReactJS**, and **MySQL**. It helps wardens manage hostel operations and allows students to interact with hostel services.

## Features

- Student registration and room allocation  
- Daily mess menu updates  
- Bus schedule management  
- Leave request and approval  
- Maintenance complaint system  
- Separate modules for Warden and Student

## Tech Stack

- **Frontend**: ReactJS, CSS  
- **Backend**: Spring Boot, REST APIs  
- **Database**: MySQL

## Modules

### Warden
- Add/Edit students  
- Assign rooms  
- Manage menu and bus schedules  
- Approve/Reject leave

### Student
- View menu and bus schedule  
- Apply for leave  
- Register maintenance complaints

## Getting Started

### Backend
```bash
cd backend
mvn spring-boot:run

cd frontend
npm install
npm start
