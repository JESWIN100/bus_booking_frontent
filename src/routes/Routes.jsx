import { createBrowserRouter } from "react-router-dom";
import FirstLayout from "../layout/FirstLayout";
import HomePage from "../page/user/HomePage";
import BusDetailPage from "../page/user/BusDetailPage";
import BillingSection from "../page/user/BillingSection";
import UserLoginPage from "../page/user/UserLoginPage";
import SucessPage from "../page/user/SucessPage";
import MyTicket from "../page/user/MyTicket";
import TicketField from "../components/user/TicketField";
import ProfilePage from "../page/user/ProfilePage";
import OtpInput from "../page/user/OtpInput";
import SignupPage from "../page/user/SignupPage";
import SecoundLayout from "../layout/SecoundLayout";

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
      {
        path: 'my-ticket',
        element: <  TicketField/>,
      },
      {
        path: 'ticket-details',
        element: <   MyTicket/>,
      },
      {
        path: 'profile',
        element: <ProfilePage/>,
      },
      
    ],
  },
  {
    path: '/user',
    element: <SecoundLayout />, 
    children: [
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'bus',
        element: <BusDetailPage />,
      },
      {
        path: 'my-ticket',
        element: <  TicketField/>,
      },
      {
        path: 'ticket-details',
        element: <   MyTicket/>,
      },
      {
        path: 'profile',
        element: <ProfilePage/>,
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
      },
      {
        path: 'otp',
        element: < OtpInput/>,
      },
      {
        path: 'sign-up',
        element: <SignupPage />,
      },
    ],
  },{
    path: 'payment',
    children: [
      {
        path: 'scuess',
        element: <SucessPage />,
      }
    ],
  },
]);

