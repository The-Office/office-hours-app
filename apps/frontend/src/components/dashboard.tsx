import NavBar from './navbar';
import Footer from './footer';
import Table from './table/page.tsx';

const Dashboard = () => {
    return (
        <>
            <div className="bg-slate-50 flex flex-col">
                <NavBar />
                <div className="py-10">
                    <Table />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Dashboard;