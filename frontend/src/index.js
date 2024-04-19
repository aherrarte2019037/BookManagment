import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginForm from './Components/LoginForm/LoginForm';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import { NextUIProvider } from "@nextui-org/react";
import Dashboard from './Components/Dashboard/Dashboard';
import AuthChecker from './Components/AuthChecker/AuthChecker';
import PrivateRoute from './Components/AuthChecker/PrivateRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <AuthChecker>
        <LoginForm />
      </AuthChecker>,
  },
  {
    path: "/login",
    element:
      <AuthChecker>
        <LoginForm />
      </AuthChecker>,
  },
  {
    path: "/register",
    element:
      <AuthChecker>
        <RegisterForm />
      </AuthChecker>,
  },
  {
    path: "/dashboard",
    element:
      <PrivateRoute>
        < Dashboard />
      </PrivateRoute>
  },

]);

root.render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);

reportWebVitals();
