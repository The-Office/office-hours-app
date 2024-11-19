import FeedbackDialog from "./feedback-dialog";
import { useLocation } from "react-router-dom";

const Footer = () => {
    const location = useLocation();
  
    return (
      <div className="footer w-full flex justify-between p-3 bg-white">
          <div>
              {location.pathname !== '/' && <FeedbackDialog />}
          </div>
      </div>   
    );
  };
  
  export default Footer;