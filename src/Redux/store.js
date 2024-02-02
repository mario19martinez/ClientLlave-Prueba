import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/Users/usersSlice.js';
import coursesReducer from './features/courses/coursesSlice.js';
import lessonReducer from './features/lesson/lessonSlice.js';
import AdminUsersSlices from './features/AdminUsers/AdminUsersSlices.js';
import usersCoursesReducer from './features/UsersCourses/UsersCursesSlices.js'; 

const store = configureStore({
  reducer: {
    users: usersReducer,
    courses: coursesReducer,
    lesson: lessonReducer,
    adminUsers: AdminUsersSlices,
    userCourses: usersCoursesReducer,
  },
});

export default store;