# Hubly - Chatbot & Admin Management Portal

## 🚀 Overview

**Hubly** is a team-oriented communication platform that enables businesses to integrate a **chatbot interface for end-users** and a **powerful admin portal** for internal management. End-users can chat through a widget embedded in a website, while **admins** can monitor conversations, manage chatbot settings, configure teams, and view chat-based analytics.

## ✨ Features

### 💬 Chatbot (End-User Experience)

- Embed the chatbot on your website to allow visitors to initiate a conversation.
- Simple and responsive user interface for messaging.
- Persistent chat history and session handling.

### 🛠️ Admin Portal

- **Chatbot Personalization**: Customize placeholder texts, welcome messages, button labels, and color themes.
- **Team Management**: Create and manage teams and assign chats to specific users.
- **Analytics Dashboard**:
  - View chatbot usage metrics.
  - Monitor chatbot response time.

## 🧱 Tech Stack

### Frontend

- **React**
- **Redux Toolkit (RTK Query)**
- **Vanilla CSS**

### Backend

- **Node.js/Express** ([Handled in a separate repository](https://github.com/var-shikhar/Hubly-BE-Cuvette))

### Database

- **MongoDB** ([Handled in the backend](https://github.com/var-shikhar/Hubly-BE-Cuvette))

## 📦 Installation

Follow these steps to set up the frontend locally:

```sh
# Clone the repository
git clone https://github.com/var-shikhar/Hubly-BE-Cuvette.git
cd Hubly-BE-Cuvette

# Install dependencies
npm install

# Copy environment variables template and configure Cloudinary
cp .env.example .env

# Start the development server
npm run dev
```

Open the app in your browser at `http://localhost:5173`

## 📂 Code Structure

### 🧱 Modularized Codebase

- The project is structured to ensure better maintainability and reusability.
- Components are designed to be reusable wherever possible
- Shared logic and styling patterns for consistency across the app.

### 🧩 Form Generator Component

- Dynamically generates forms based on a JSON schema.
- Includes built-in validation for form fields.

## 🌍 Environment Variables

Create a .env file in the project root using the following structure:

```sh
# Copy the .env.example file
cp .env.example .env
  VITE_APP_BACKEND_URL=
  VITE_APP_DEV_BACKEND_URL=
```

These environment variables are used to switch between production and development API endpoints.

## 📬 Contact

For more details, reach out to:

**Shikhar Varshney**  
📧 Email: [shikharvarshney10@gmail.com](mailto:shikharvarshney10@gmail.com)
