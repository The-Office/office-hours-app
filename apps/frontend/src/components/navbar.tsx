import project_logo from '../assets/project-logo.png';
import FeedbackDialog from './feedback-dialog';
import { useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  return (
    <div className="navbar w-full flex items-center justify-between p-3 z-20 relative">
        <a className="flex items-center" href="/">
            <img src={project_logo} alt="Project Logo" className="h-9 w-9 mr-2" />
            <h1 className="font-extrabold text-lg md:text-3xl lg:text-4xl">SyncrOHnize</h1>
        </a>
        <div>
            {/* <a href="/about" className="text-gray-700 font-bold hover:text-gray-900 text-md md:text-2xl lg:text-3xl">About</a>
            <a href="/contact" className="text-gray-700 font-bold hover:text-gray-900 ml-5 text-md md:text-2xl lg:text-3xl">Contact</a> */}
            {location.pathname !== '/' && <FeedbackDialog />}
        </div>
    </div>   
  );
};

export default NavBar;