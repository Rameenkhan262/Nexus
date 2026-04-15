# Nexus – Investor & Entrepreneur Collaboration Platform

## Overview

Nexus is a web platform designed to connect entrepreneurs with investors for collaboration, meetings, funding, and deal management. It provides a structured environment where users can interact, schedule meetings, manage documents, and simulate financial transactions.

---

## Live Demo

Vercel Deployment: https://nexus-black-three.vercel.app/login
GitHub Repository: [https://your-github-link](https://github.com/Rameenkhan262/Nexus)

---

## User Roles

### Entrepreneur

* Create and manage startup profile
* Add availability slots for meetings
* Accept or reject meeting requests
* Manage documents and agreements

### Investor

* Browse and explore startups
* Request meetings with entrepreneurs
* View confirmed meetings
* Participate in funding flow (simulation)

---

## Features

### Meeting Scheduling

* Calendar-based interface
* Add availability slots
* Request meetings
* Accept or reject requests
* Confirmed meetings displayed across dashboards
* Date and time selection

---

### Video Calling (UI Simulation)

* Start and end call
* Microphone toggle
* Camera toggle
* Screen sharing (optional UI)
* Call timer
* Draggable preview window

---

### Document Chamber

* Upload and preview documents (PDF supported)
* Remove uploaded files
* Signature input using signature pad
* Document status tracking:

  * Draft
  * In Review
  * Signed

---

### Payments (Simulation)

* Wallet balance display
* Deposit, withdraw, and transfer functionality
* Transaction history table
* Mock funding flow between users

---

### Security Features

* Password strength indicator
* OTP-based login (demo)
* Role-based access control
* Protected routes

---

### UI/UX

* Clean dashboard layout
* Responsive design
* Gradient-based theme
* Role-based navigation
* Consistent authentication pages

---

## Tech Stack

Frontend: React with TypeScript
Styling: Tailwind CSS
Routing: React Router
State Management: Context API

Libraries:

* react-calendar
* react-pdf
* react-signature-canvas
* lucide-react

---

## Project Structure

```
src/
 ├── components/
 ├── context/
 ├── pages/
 │    ├── dashboard/
 │    ├── calendar/
 │    ├── video-call/
 │    ├── document-chamber/
 │    ├── payments/
 │    ├── auth/
 ├── types/
 └── App.tsx
```

---

## Installation

Clone the repository:

```
git clone https://github.com/your-username/nexus.git
```

Navigate to the project:

```
cd nexus
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

---

## Deployment

The project is deployed using Vercel.


---

## Future Improvements

* Backend integration
* Real-time video calling
* Payment gateway integration
* Notification system
* Enhanced messaging system

---

## Author

Rameen Khan

---

## Conclusion

This project demonstrates a complete frontend system with multiple integrated modules, clean UI, and scalable structure suitable for real-world applications.


Screenshots

Login Page
<img width="1366" height="599" alt="login png" src="https://github.com/user-attachments/assets/faf5836e-5437-4094-b5c1-8d5ef13f9918" />


Register Page
<img width="1366" height="599" alt="register png" src="https://github.com/user-attachments/assets/d0ca197e-06e8-4ae1-920f-d1146410c350" />


Entrepreneur Dashboard
<img width="1366" height="1800" alt="dashboard-entrepreneur png" src="https://github.com/user-attachments/assets/19a77569-df1d-4e30-a94c-d7acd1065ec0" />


Investor Dashboard
<img width="1366" height="1605" alt="dashboard-investor png" src="https://github.com/user-attachments/assets/a1cb7ac1-c139-4f65-a393-5b366e48b407" />


Meeting Calendar
<img width="1366" height="1344" alt="calendar png" src="https://github.com/user-attachments/assets/b5d9a2ff-0b2b-402c-b388-8fd8780d011b" />


Video Call Interface
<img width="1366" height="795" alt="video-call png" src="https://github.com/user-attachments/assets/690d4c59-cd6c-44b2-af9c-4c7923ad80c1" />


Document Chamber
<img width="1366" height="795" alt="documents png" src="https://github.com/user-attachments/assets/1a1edf16-401d-4897-b70e-c286bc9f3975" />


Payments Section
<img width="1366" height="795" alt="payments png" src="https://github.com/user-attachments/assets/9aeb8249-2ebf-4c96-8b63-feab88165735" />


OTP
<img width="1366" height="599" alt="otp png" src="https://github.com/user-attachments/assets/7e63ab50-9446-4651-b034-1d01012a1d46" />
