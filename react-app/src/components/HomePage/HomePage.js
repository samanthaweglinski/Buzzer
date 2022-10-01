import NavBar from "../NavBar";
import BuzzForm from "./BuzzForm";
import Buzzes from "./Buzzes";
import { useSelector } from "react-redux";
import "../CSS/HomePage.css";

const HomePage = () => {
  const user = useSelector((state) => state?.session?.user);

  return (
    <div className="homepage-container">
      <div className="homepage-left-container">
        <NavBar />
      </div>
      <div className="homepage-mid-container">
        <div className="homepage-mid-top">
          <div className="home-text">Home</div>
          <div className="create-form-container">
            <div className="current-user-pfp">
              <img
                src={user?.profile_pic}
                alt="user-pfp"
                className="create-buzz-user-pfp"
              />
            </div>
            <BuzzForm />
          </div>
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
