import project_logo from '../assets/project-logo.png';

const NavBar = () => {
  return (
    <div className="navbar bg-white shadow-sm fixed w-full flex items-center justify-between p-3">
        <div className="flex items-center">
            <img src={project_logo} alt="Project Logo" className="h-7 w-7 mr-2" />
            <h1 className="font-bold">SyncrOHnize</h1>
        </div>
        <div>
            <a href="/about" className="text-gray-700 hover:text-gray-900">About</a>
        </div>
    </div>   
  );
};

export default NavBar;