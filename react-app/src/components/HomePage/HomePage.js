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
        <div className="homepage-mid-top">
          <div className="home-text">Home</div>
          <BuzzForm />
        </div>
        <div className="homepage-mid-bottom">
          <Buzzes />
        </div>
      </div>
      <div className="homepage-right-container"></div>
    </div>
  );
};

export default HomePage;
