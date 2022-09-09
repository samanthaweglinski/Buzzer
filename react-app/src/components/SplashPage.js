import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignUpForm";
import twitterLogo from "./images/twitter_logo.svg";
import backsplash from "./images/twitter_splash.png";
import "./CSS/SplashPage.css";

const SplashPage = () => {
  return (
    <div className="splashpage-container">
      <div className="left-container">
        <img alt="backsplash" className="left-backsplash" src={backsplash} />
      </div>
      <div className="right-container">
        <div className="bird-logo">
          <img alt="logo" className="logo" src={twitterLogo} />
        </div>
        <div className="happening-now">
          <h1>
            Happening now
          </h1>
        </div>
        <div className="signup-container">
          <h2>Join Buzzer today.</h2>
          <div className="signup-form">
            <SignUpForm />
          </div>
        </div>
        <div className="login-container">
          <h2>Already have an account?</h2>
          <div className="login-form">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SplashPage;
