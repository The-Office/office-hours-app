import NavBar from './navbar.tsx';
import Footer from './footer.tsx';
import ProfDataTable from './prof-elements/prof-data-page.tsx';

const ProfDashboard = () => {
    return (
        <>
            <div className="bg-slate-50 flex flex-col">
                <NavBar />
                    <ProfDataTable />
                <Footer />
            </div>
        </>
    );
};

export default ProfDashboard;