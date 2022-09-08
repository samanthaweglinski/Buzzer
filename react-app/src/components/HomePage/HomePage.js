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
        <h2>What's happening</h2>
      </div>
    </div>
  );
};

export default HomePage;
