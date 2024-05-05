import Supervisor from "./pages/home/Supervisor";
import Headmaster from "./pages/home/Headmaster";
import Teacher from "./pages/home/Teacher";
import "../styles/global.scss";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import SupervisorTime from "./pages/timetable/SupervisorTime";
import TeacherTime from "./pages/timetable/TeacherTime";
import Login from "./pages/login/Login";
import ManageAlumni from "./pages/alumni/manageAlumni";
import Classroom from "./pages/Classroom/classroom";
import Classes from "./pages/class/class"
import Admin from "./pages/home/Admin"
import Profil from "./pages/profil/profil";
import Users from "./pages/users/users"
const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div>
      <div className="main">
        
        <Navbar />
        <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          
        
        
      </div>
      <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/Supervisors",
          element: <Supervisor />,
          children:[
            {
              path:"alumnis",
              element:<ManageAlumni/>
            }
          ]
        },
        
        {
          path: "/Headmasters",
          element: <Headmaster/>,
          children:[
            {
              path: "Classes",
              element: <Classes />,
            },
            {
              path: "Classrooms",
              element: <Classroom />,
            },
            
          ]
        },
        
        {
          path: "/Teachers",
          element: <Teacher/>,
          children:[
            {
              path: "Timetable",
              element: <TeacherTime />,
            },
          ]
        },
        {
          path: "/Admin",
          element: <Admin />,
          children:[
            {
              path: "profil/:id",
              element: <Profil />,

          },
            {
                path: "Workspaces",
                element: <SupervisorTime />,

            },
            {
              path: "Users",
              element: <Users />,
          },
          ]
        },
      ],
      
    },{
    path: "/login",
      element: <Login />}
  ]);
  return <RouterProvider router={router} />;
}

export default App
