import canvas_logo from '../assets/canvas-logo.png';
import clock_gray_cropped from '../assets/clock-gray-wall-cropped.jpg';

const HeroSection = () => {
    return (
        <div className="hero-section text-black">
            <div className="flex flex-col md:flex-row h-screen">
                <div className="w-full md:w-1/2 flex items-center justify-center h-screen">
                    <div className="text-center">
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">OFFICE HOURS<br></br>MADE EASY</h2>
                        <h3 className="text-xl md:text-2xl mb-4 font-semibold">one import. automatic updates.</h3>
                        <div className="flex justify-center">
                            <button className="shadow-lg bg-white px-3 py-2 rounded-xl flex items-center hover:bg-gray-50 hover:shadow-md">
                                <img src={canvas_logo} alt="canvas logo" className="w-10 h-10 mr-2" />
                                <span className="border-gray-300 text-gray-400 border-l-2 pl-2 text-2xl">LOGIN WITH CANVAS</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="hidden md:block w-full md:w-1/2 items-center justify-center">
                    <img src={clock_gray_cropped} alt="picture of calendar and clock" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;