import NavBar from './navbar';
import Footer from './footer';
import Table from './table/page.tsx';

const Dashboard = () => {
    return (
        <>
            <div className="bg-slate-50 flex flex-col">
                <NavBar />
                <div className="pt-10 h-screen">
                    <Table />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Dashboard;