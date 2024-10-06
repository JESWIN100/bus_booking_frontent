import { createBrowserRouter } from "react-router-dom";
import FirstLayout from "../layout/FirstLayout";
import HomePage from "../page/user/HomePage";
import BusDetailPage from "../page/user/BusDetailPage";
import BillingSection from "../page/user/BillingSection";
import UserLoginPage from "../page/user/UserLoginPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <FirstLayout />, 
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'bus',
        element: <BusDetailPage />,
      },
      
    ],
  },
  {
    path: 'booking',
    children: [
      {
        path: 'bill',
        element: <BillingSection />,
      },
     
      {
        path: 'login',
        element: <UserLoginPage />,
      }
    ],
  },
]);

