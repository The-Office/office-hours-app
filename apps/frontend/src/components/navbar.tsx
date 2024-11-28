import project_logo from '../assets/project-logo.png';
import AccountButton from './account-button.tsx';

const NavBar = () => {

  return (
    <div className="navbar w-full flex items-center justify-between p-3 z-20 fixed bg-white drop-shadow-md">
      <a className="flex items-center" href="/">
        <img src={project_logo} alt="Project Logo" className="h-9 w-9 mr-2" />
        <h1 className="font-extrabold text-3xl">SynchrOHnize</h1>
      </a>
      <AccountButton />
    </div>
  );
};

export default NavBar;