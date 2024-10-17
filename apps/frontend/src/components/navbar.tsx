import project_logo from '../assets/project-logo.png';

const NavBar = () => {
  return (
    <div className="navbar fixed w-full flex items-center justify-between p-5">
        <div className="flex items-center">
            <img src={project_logo} alt="Project Logo" className="h-7 w-7 mr-2" />
            <h1 className="font-extrabold">SyncrOHnize</h1>
        </div>
        <div>
            <a href="/about" className="text-gray-700 font-bold hover:text-gray-900">About</a>
            <a href="/contact" className="text-gray-700 font-bold hover:text-gray-900 ml-5">Contact</a>
        </div>
    </div>   
  );
};

export default NavBar;