import canvas_logo from '../assets/canvas-logo.png';
// import hero_image from '../assets/hero-image.webp';
// import clock_light from '../assets/clock-light.jpg';
import calendar from '../assets/calendar.jpg';

const HeroSection = () => {
    return (
        <div className="hero-section text-black"> {/* Added pt-12 for padding-top */}
            <div className="container mx-auto flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/2 flex items-center justify-center h-full">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold mb-4">OFFICE HOURS <br></br> MADE EASY</h2>
                        <h3 className="text-2md mb-4 font-bold">One import. Automatic Updates.</h3>
                        <div className="flex justify-center">
                            <button className="bg-white px-3 py-2 rounded-2xl border-solid border-2 border-black flex items-center hover:bg-slate-100 hover:shadow-md">
                                <img src={canvas_logo} alt="canvas logo" className="w-8 h-8 mr-2" />
                                <span className="border-gray-300 border-l-2 pl-2 text-gray-800">Login with Canvas</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 flex items-center justify-center h-screen">
                    <img src={calendar} alt="picture of calendar and clock" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;