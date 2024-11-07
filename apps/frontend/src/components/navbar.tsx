import project_logo from '../assets/project-logo.png';
// import FeedbackDialog from './feedback-dialog';
// import { useLocation } from 'react-router-dom';
import AccountButton from './account-button.tsx';

const NavBar = () => {
  // const location = useLocation();

  return (
    <div className="navbar w-full flex items-center justify-between p-3 z-20 relative">
        <a className="flex items-center" href="/">
            <img src={project_logo} alt="Project Logo" className="h-9 w-9 mr-2" />
            <h1 className="font-extrabold text-lg md:text-3xl lg:text-4xl">SyncrOHnize</h1>
        </a>
        <div>
            {/* {location.pathname !== '/' && <FeedbackDialog />} */}
            <AccountButton />
        </div>
    </div>   
  );
};

export default NavBar;