# 🎬 Movie Recommendation CRUD Platform

Welcome to the **Movie Recommendation CRUD Platform**, a dynamic application for sharing, viewing, and managing movie recommendations! Built with a modern tech stack, this platform offers seamless functionality for movie enthusiasts to connect and share their favorite films. 🍿✨

---

## 🛠️ **Features**

1. **🔄 CRUD Functionality:**

1. Create, view, update, and delete your movie recommendations.
2. Movies added by a user can only be edited or deleted by that user.
3. All movie recommendations are visible to everyone, enabling global sharing.



2. **🔒 Authentication:**

1. Log in using **Google OAuth** or register with a **username, email, and password**.
2. Only authenticated users can add, edit, or delete movie recommendations.



3. **✨ Additional Features:**

1. **📸 Image Upload:** Upload images for your movie recommendations to make them visually appealing.
2. **⭐ Rating System:** Rate movies and see average ratings from other users.



4. **📱 Responsive Design:**

1. Built with React for a dynamic and user-friendly interface, optimized for all devices.

---

## 💻 **Technology Stack**

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (hosted on MongoDB Atlas)
- **Authentication:** Google OAuth & traditional username/password login (using Passport.js)
- **Hosting:** Render
- **Image Storage:** Local file system (with plans to migrate to cloud storage)
- **Folder Structure:**

- **Client Folder:** React frontend files.
- **Server Folder:** Backend logic and API routes.



---

## 🚀 **How to Use**

### **Public View:**

👀 Browse movie recommendations shared by other users in a read-only format.

### **User Features:**

1. **👤 Register/Login:**

1. Register with your email or log in using Google OAuth.



2. **🎥 Create Movie Recommendation:**

1. Add a movie with a title, description, review, rating, and an image.



3. **✏️ Edit/Delete Movie:**

1. Manage your own movie recommendations with edit and delete options.



4. **🔍 Search Movies:**

1. Use the search functionality to find movies by title or description.





---

## ⚙️ **Setup and Deployment**

1. Clone the repository:

```shellscript
git clone https://github.com/TavishaPrajapat/MovieHub.git
cd MovieHub
```


2. Install dependencies:

```shellscript
npm install
cd client
npm install
```


3. Set up environment variables:

1. Create a `.env` file in the **server folder** with the following:

```plaintext
MONGODB_URI=<your-mongodb-uri>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
JWT_SECRET=<your-jwt-secret>
```





4. Start the development server:

1. **Backend:**

```shellscript
cd server
npm start
```


2. **Frontend:**

```shellscript
cd client
npm start
```





5. Deploy the application to a cloud service (e.g., Render).


---

## ✨ **Additional Notes**

### **Independent Features:**

This project includes the following advanced features:

1. Google OAuth authentication.
2. Username and password-based authentication.
3. Image uploads for movie recommendations.
4. JWT-based authentication for secure API calls.


### **Version Control:**

- All code changes were tracked with descriptive commit messages. No manual uploads were made via GitHub Web UI.


### **Acknowledgments (External Sources Used):**

https://stackoverflow.com/questions/15772394/how-to-upload-display-and-save-images-using-node-js-and-express
https://expressjs.com/en/guide/using-middleware.html
https://www.passportjs.org/concepts/authentication/middleware/
https://www.passportjs.org/concepts/authentication/google/
https://react.dev/reference/react/useEffect
https://chatgpt.com/

---

## 👥 **Contributors**

- [Tavisha Prajapat](https://github.com/TavishaPrajapat)
- [Simerpreet Kaur]


Feel free to explore, contribute, or provide feedback! 🙌
