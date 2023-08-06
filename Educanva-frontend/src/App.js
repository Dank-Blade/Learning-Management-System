import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import Dashboard from "./pages/Student/Dashboard";
import Sidebar from "./components/UI/Sidebar";
import AdminSidebar from "./components/AdminSidebar";
import Content from "./pages/Student/Content";
import Assignment from "./pages/Student/Assignment";
import DetailedContent from "./pages/Student/DetailedContent";
import DetailedAssignment from "./pages/Student/DetailedAssignment";
import TeacherContent from "./pages/Teacher/TeacherContent";
import TeacherAssignment from "./pages/Teacher/TeacherAssignment";
import AdminHome from "./pages/Admin/AdminHome";
import AdminStudent from "./pages/Admin/AdminStudent";
import AdminTeacher from "./pages/Admin/AdminTeacher";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminModule from "./pages/Admin/AdminModule";
import AuthVerify from "./components/common/AuthVerify";
import { ModulesProvider } from "./context/ModulesContext";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import TeacherDetailedContent from "./pages/Teacher/TeacherDetailedContent";
import TeacherDetailedAssignment from "./pages/Teacher/TeacherDetailedAssignment";
import GradeAssignments from "./pages/Teacher/GradeAssignments";
import Grades from "./pages/Student/Grades";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <Sidebar />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/teacher",
        element: <TeacherDashboard />,
      },
      {
        path: "/teacher/grade",
        element: <GradeAssignments />,
      },
      {
        path: "/grade",
        element: <Grades />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      }
    ],
  },
  {
    element: <AdminSidebar />,
    children: [
      {
        path: "/admin/students",
        element: <AdminStudent />,
      },
      {
        path: "/admin/teachers",
        element: <AdminTeacher />,
      },
      {
        path: "/admin/modules",
        element: <AdminModule />,
      },
      {
        path: "/admin/profile",
        element: <Profile />,
      },
      {
        path: "/admin/change-password",
        element: <ChangePassword />,
      }
    ],
  },
  {
    path: "/module/:id/content",
    element: <Content />,
  },
  {
    path: "/module/:id/content/:contentId",
    element: <DetailedContent />,
  },
  {
    path: "/module/:id/assignment",
    element: <Assignment />,
  },
  {
    path: "/module/:id/assignment/:assignmentId",
    element: <DetailedAssignment />,
  },
  {
    path: "/teacher/module/:id/content",
    element: <TeacherContent />,
  },
  {
    path: "/teacher/module/:id/assignment",
    element: <TeacherAssignment />,
  },
  {
    path: "/teacher/module/:id/content/:contentId",
    element: <TeacherDetailedContent />,
  },
  {
    path: "/teacher/module/:id/assignment/:assignmentId",
    element: <TeacherDetailedAssignment />,
  },
  
]);

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <AuthProvider>
        <ModulesProvider>
          <RouterProvider router={router} />
        </ModulesProvider>
        <AuthVerify />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
