# Hubly - Chat bot

## Overview

Hubly simplifies scheduling for you and your team by eliminating the back-and-forth of setting up meetings. Set your availability, share your link, and let others book time with you instantly.

## Features

### Event Creation & Participation

- Users can create events and invite participants.
- Participants can accept or reject the invitation.

### Availability Management

- Users can set their availability (days & multiple time slots).
- Before scheduling, the system checks:
  - If the user is available at that day and time.
  - If there are any conflicting events at the same time.

### Profile Management

- Users can set and update their profile details.

## Tech Stack

### Frontend

- **React**
- **Redux Toolkit (RTK Query)**
- **Cloudinary** (for image uploads)
- **Vanilla CSS**

### Backend

- **Node.js/Express** (Handled in a separate repository)

### Database

- **MongoDB** (Handled in the backend)

## Installation

Follow these steps to set up the frontend locally:

```sh
# Clone the repository
git clone https://github.com/var-shikhar/cnnct-event-mangement-FE-Cuvette.git
cd cnnct-event-mangement-FE-Cuvette

# Install dependencies
npm install

# Copy environment variables template and configure Cloudinary
cp .env.example .env

# Start the development server
npm run dev
```

Open the app in your browser at `http://localhost:5173`

## Usage & Code Structure

### Modularized Codebase

- The project is structured to ensure better maintainability and reusability.
- Components are designed to be reusable wherever possible.

### Form Generator Component

- Dynamically generates forms based on a JSON schema.
- Includes built-in validation for form fields.

### Calendar View

- Uses `react-big-calendar` to display a list of scheduled events.
- Provides an intuitive UI for managing and viewing meetings.

## Environment Variables

To configure Cloudinary, register at [Cloudinary](https://cloudinary.com/) and retrieve your credentials:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

## Contact

For more details, reach out to:

**Shikhar Varshney**  
📧 Email: [shikharvarshney10@gmail.com](mailto:shikharvarshney10@gmail.com)
