import loginPageLogo from "../../assets/images/logos/svg/loginPageLogo.svg";
import tealRecord from "../../assets/images/logos/svg/tealRecord.svg";
import loginWithGooglePhoto from "../../assets/images/loginPage/Sign-in-with-Google.png";
import discogsLogo from "../../assets/images/DiscogsLogoWhiteFont.png";
import { supabase } from "../../../supabaseClient";

const signUp = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: { prompt: "select_account" },
      redirectTo: window.location.origin,
    },
  });
};

function LoginPageContent() {
  function VersionOne() {
    return (
      <div
        id="loginPageContent"
        className="flex-1 w-full h-full flex md:flex-row flex-col md:justify-between md:items-center justify-center items-center bg-mvsWhite border-cyan-500 border-solid border-x-2 sm:border-r-0"
      >
        <div
          id="mobileTopContent"
          className="md:hidden flex flex-row md:flex-col items-center justify-center md:h-full md:mr-24 gap-12 mb-8"
        >
          <img
            src={tealRecord}
            className="h-12 md:h-48 lg:h-64 rotate-45 animate-[spin_3s_linear_infinite]"
          ></img>
          <img
            src={tealRecord}
            className="h-12 md:h-48 lg:h-64 rotate-[135deg] animate-[spin_3s_linear_infinite]"
          ></img>
        </div>
        <div
          id="leftSideContent"
          className="flex flex-col  md:items-start justify-center items-center rounded-lg md:ml-24 font-oxanium text-white"
        >
          <div
            id="discogsLogo"
            className="flex flex-row text-white justify-center items-center text-oxanium rounded-full bg-mvsBlack px-2 mb-4"
          >
            via{" "}
            <img
              src={discogsLogo}
              className="max-w-8 font-sm lg:max-w-32 max-h-8"
            ></img>{" "}
            integration
          </div>

          <img
            src={loginPageLogo}
            className="mb-4 max-w-32 lg:w-32 md:w-24 w-16"
          ></img>
          <div className="lg:text-2xl sm:text-lg text-xs md:text-start text-center font-[500] text-black mb-2">
            Record lover?
            <br />
            Track your listens.
            <br />
            Flex your records.
            <br />
            <span className="font-bold text-mvsTeal">Show us your groove.</span>
            <br />
            <button
              className="mt-2 text-white lg:max-w-40 max-w-40 hover:cursor-pointer hover:text-black transition duration-100 ease-in-out transform hover:scale-105 rounded-md bg-mvsBlack px-4 py-2 font-bold"
              onClick={signUp}
            >
              Sign In
            </button>
          </div>
        </div>
        <div
          id="rightSideContent"
          className="hidden md:flex md:flex-col items-center justify-center h-full mr-24 gap-12"
        >
          <img
            src={tealRecord}
            className="h-12 md:h-48 lg:h-64 rotate-45 animate-[spin_3s_linear_infinite]"
          ></img>
          <img
            src={tealRecord}
            className="h-12 md:h-48 lg:h-64 rotate-[135deg] animate-[spin_3s_linear_infinite]"
          ></img>
        </div>
      </div>
    );
  }

  function VersionTwo() {
    return (
      <div className="w-screen h-dvh bg-mvsWhite overflow-hidden relative">
        {/* Records - positioned relative to screen edges */}
        <img
          src={tealRecord}
          className="absolute left-1/2 -translate-x-1/2 -top-[40vw] h-[70vw] max-h-[28rem] rotate-45 animate-[spin_3s_linear_infinite]
                     md:left-[calc(-25vw)] md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:h-[50vw] md:max-h-[64rem]"
        />
        <img
          src={tealRecord}
          className="absolute left-1/2 -translate-x-1/2 -bottom-[40vw] h-[70vw] max-h-[28rem] rotate-[135deg] animate-[spin_3s_linear_infinite]
                     md:left-auto md:right-[calc(-25vw)] md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:h-[50vw] md:max-h-[64rem]"
        />
        
        {/* Content - centered in the middle */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center font-oxanium px-4 z-10 -translate-y-4 md:translate-y-0">
            <div className="px-4 flex flex-row text-white justify-center items-center rounded-full bg-mvsBlack mb-4 md:mb-8 text-sm md:text-2xl gap-2">
              via <img src={discogsLogo} className="w-6 md:w-26" /> integration
            </div>
            
            <img src={loginPageLogo} className="w-16 md:w-30 mb-4 md:mb-8" />
            
            <div className="text-sm md:text-xl text-center font-[500] text-black">
              Record lover?
              <br />
              Track your listens.
              <br />
              Flex your records.
              <br />
              <span className="font-bold text-mvsTeal">Show us your groove.</span>
              <br />
              <button
                className="mt-4 md:mt-8 text-sm md:text-base text-white hover:cursor-pointer hover:text-black transition duration-100 ease-in-out transform hover:scale-105 rounded-md bg-mvsBlack px-4 py-2 font-bold"
                onClick={signUp}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <VersionTwo />;
}

export default LoginPageContent;
