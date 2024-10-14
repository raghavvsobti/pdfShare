# Collaborative PDF Highlighter App (pdfShare)

This project is a collaborative PDF highlighter application, where multiple users can upload and view the same PDF document. Each user can highlight text, and their highlights will be visible to all other connected users in real-time, with each user's highlights appearing in a unique color. The application uses **Socket.IO** for real-time communication between users.

## Features
- **Real-time collaboration:** Users can view the same PDF and see each other's highlights instantly.
- **User-specific colors:** Each user's highlights are displayed in a unique color.
- **Secure authentication:** Users must sign up and log in to interact with the application.

## Project Structure
The project is divided into two main parts:
- **Frontend:** React-based interface for user interaction.
- **Backend:** Nest js server using **Socket.IO** for real-time communication and other backend logic.

## Getting Started

### Prerequisites
Before running the app, make sure you have:
- Node.js installed on your system.
- Installed dependencies for both the frontend and backend.

### Environment Variables
Create a `.env` file in the root directory of the project with the following content:

# Backend server configuration
CLOUDINARY_CLOUD_NAME='raghavvsobtii'
CLOUDINARY_API_KEY='986668736571861'
CLOUDINARY_API_SECRET='4SrAi2vOQonZqfan3udvws4M3Ek'
CLOUDINARY_URL="cloudinary://986668736571861:4SrAi2vOQonZqfan3udvws4M3Ek@raghavvsobtii"
BASE_URL="http://localhost:3000"
MONGO_URI="mongodb+srv://raghavvsobtii:zMThRtsEGNILuXwN@pdf-share.6ukrq.mongodb.net/?retryWrites=true&w=majority&appName=pdf-share"


### Installation & Running the App

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd <repository_directory>

2. Open a terminal window, navigate to the frontend folder, and install dependencies:
  ```  
  cd frontend/
  npm install
  npm run build
  npm run dev
```
3. In a new terminal window, navigate to the server folder and install dependencies:
```
cd server/
npm install
npm run build
npm run start:dev
```

### User Guide

1. **Log In**: Users can log in using their credentials.
2. **Upload a PDF**: Once logged in, users can upload a PDF.
3. **Highlight Text**: As users highlight the PDF, their highlights will be visible to everyone viewing the same document. Highlights are shown in a color unique to each user.

### Multiple Users

To simulate the experience of multiple users:

1. Open the app in different browser windows or incognito mode.
2. Log in with different accounts.
3. Upload a PDF and begin highlighting. The highlights will be synchronized and visible across all windows in real-time.

### Technologies Used

- **Frontend**: React.js, leveraging libraries such as `react-pdf-highlighter`, `tailwindcss`, and `shadcn` for PDF highlighting functionality and UI design.
- **Backend**: Nestjs, Express.js, Socket.IO, Cloudinary service for storing pdfs, MongoDB
- **Real-time communication**: Socket.IO


