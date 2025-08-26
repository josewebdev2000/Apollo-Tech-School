import './App.css';
import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar/Navbar'; 
import Home from './routes/Home/Home';
import Footer from './components/Footer/Footer';
import Membership from './routes/Membership/Membership';
import About from './routes/About/About';
import Login from './routes/Login/Login';
import Register from './routes/Register/Register';
import Dashboard from './routes/Dashboard/Dashboard';
import CourseDetails from "./routes/CourseDetails/CourseDetails";
import ForgotPassword from './routes/ForgotPassword/ForgotPassword';
import MyLearning from "./routes/Dashboard/MyLearning/MyLearning";
import ProfileSettings from "./routes/Dashboard/ProfileSettings/ProfileSettings";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/memberships' element={<Membership />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/forgot-password' element={<ForgotPassword />}/>
        <Route path='/course/:courseId' element={<CourseDetails />}/>
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='mylearning' element={<MyLearning />} />
          <Route path='settings' element={<ProfileSettings />}/>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
