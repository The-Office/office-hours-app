import NavBar from './navbar';
import Table from './table/page.tsx';

const Dashboard = () => {
    return (
        <>
            <div className="bg-slate-50 h-screen flex flex-col">
                <NavBar />
                <div className="py-10">
                    <Table />
                </div>
            </div>
        </>
    );
};

export default Dashboard;