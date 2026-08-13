# Wanderlust 🌍✈️

Wanderlust is a full-stack web application inspired by Airbnb, built using Node.js, Express, MongoDB, and EJS. It allows users to explore stunning property listings, post their own listings, manage reviews, and authenticate securely.

---

## 🚀 Features

* **User Authentication & Authorization**: Secure signup, login, and logout powered by Passport.js (with automatic salting and hashing).
* **Listing Management**: Authenticated users can create, edit, and delete their own property listings.
* **Review System**: Users can rate properties and leave comments. Reviews are dynamically tied to their authors and clean up            
                     automatically if the parent listing is deleted.
* **Flash Messages**: Instant feedback alerts for successful or failed user actions using connect-flash.
* **Robust Error Handling**: Centralized error-handling middleware using custom error classes and a 404 catch-all page.
* **Responsive Design**: Styled with Bootstrap 5 and custom CSS for a clean, modern interface.

---

## 🛠️ Tech Stack

* **Frontend**: EJS, EJS-Mate, Bootstrap 5, HTML5, CSS3
* **Backend**: Node.js, Express.js
* **Database**: MongoDB, Mongoose (ODM)
* **Authentication**: Passport.js, Passport-Local, Passport-Local-Mongoose
* **Validation & Security**: Joi (schema validation), Express Sessions, Method-Override

---

## 📂 Project Structure
'''
wanderlust/
│
├── models/
│   ├── listing.js         # Mongoose schema for listings & hooks
│   ├── review.js          # Mongoose schema for reviews
│   └── user.js            # Mongoose schema for users
│
├── routes/
│   ├── listing.js         # Listing CRUD route handlers
│   ├── review.js          # Review creation & deletion route handlers
│   └── user.js            # User signup, login, and logout routes
│
├── utils/
│   ├── ExpressError.js    # Custom error handling class
│   └── wrapAsync.js       # Asynchronous error handler wrapper
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs # Master layout template
│   ├── listings/          # Index, show, new, and edit EJS views
│   ├── users/             # Login and signup EJS views
│   └── error.ejs          # Error display template
│
├── public/                # Static assets (CSS, JS, media)
├── schema.js              # Server-side Joi validation schemas
├── app.js                 # Main application entry point
└── package.json           # Project metadata and dependencies

---
'''
## ⚙️ Getting Started Locally

Follow these steps to set up and run the project on your local machine.

### Prerequisites

* Node.js installed on your computer.
* MongoDB running locally (mongodb://127.0.0.1:27017) or a connection URI to MongoDB Atlas.

### Installation Steps

1. Clone the repository:
   git clone <your-repository-url>
   cd wanderlust

2. Install dependencies:
   npm install

3. Start MongoDB:
   Ensure your local MongoDB database service is running.

4. Run the application:
   node app.js
   *(Or if you use nodemon for auto-restarts)*:
   npx nodemon app.js

5. Open in browser:
   Navigate to http://localhost:8080
