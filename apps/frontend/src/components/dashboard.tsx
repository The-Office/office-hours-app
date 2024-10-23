import NavBar from './navbar';
import DemoPage from './table/page.tsx';

const Dashboard = () => {
    return (
        <>
            <div className="bg-slate-50 h-screen flex flex-col">
                <NavBar />
                <div className="py-20">
                    <DemoPage />
                </div>
            </div>
        </>
    );
};

export default Dashboard;