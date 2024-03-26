import { lazy } from 'react';

// Private Routes
const privateRoutes = {
  // #1 Home
  home_page: {
    path: '/home',
    component: lazy(() => import('../pages/HomePage/HomePage.jsx')),
  },

  // #2 User List
 user_list_page: {
    path: '/home/user-list',
    component: lazy(() => import('../pages/UserListPage/UserListPage.jsx')),
  },
};
export const renderPrivateRoutes = Object.entries(privateRoutes);

// Public Routes
const publicRoutes = {
  login_page: {
    path: 'home/login',
    component: lazy(() => import('../pages/LoginPage/LoginPage.jsx')),
  },
  sign_up_page: {
    path: 'home/sign-up',
    component: lazy(() => import('../pages/SignUpPage/SignUpPage.jsx')),
  },
};

export const renderPublicRoutes = Object.entries(publicRoutes);
