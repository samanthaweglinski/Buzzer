import NavBar from "../NavBar";
import BuzzForm from "./BuzzForm";
import Buzzes from "./Buzzes";
import "../CSS/HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="homepage-left-container">
        <NavBar />
      </div>
      <div className="homepage-mid-container">
        <BuzzForm />
        <Buzzes />
      </div>
      <div className="homepage-right-container">
        {/* <div className="right-content">
          <h1>Coming Soon</h1>
        </div> */}
      </div>
    </div>
  );
};

export default HomePage;
