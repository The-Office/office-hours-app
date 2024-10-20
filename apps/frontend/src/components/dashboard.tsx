import NavBar from './navbar';

const Dashboard = () => {
    return (
        <>
            <div className="bg-slate-50 h-screen flex flex-col">
                <NavBar />
                <div className="flex-grow flex items-center justify-center">
                    <h1 className="font-extrabold text-4xl">The dash</h1>
                </div>
            </div>
        </>
    );
};

export default Dashboard;