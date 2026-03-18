import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import MainMenuCard from "./MainMenuPage/MainMenuCard.jsx";
import RecordCollectionPhoto from "../assets/images/Record_Collection.jpg";
import ScanningQRCodePhoto from "../assets/images/ScanningQRCode.jpg";
import ListeningHistoryScreenshot from "../assets/images/ListeningHistoryScreenshot.png";
import websiteLogo from "../assets/images/logos/1080px/Asset 1.png";
import discogsLogo from "../assets/images/DiscogsLogo.png";

function MainMenuPage({
  listeningSectionButtonHandler,
  librarySectionButtonHandler,
  tutorialButtonHandler,
  FAQButtonHandler,
  recordsList,
  completeListeningHistory,
  listeningHistoryButtonHandler,
  discogsConnected,
  onConnectDiscogs,
  profileButtonHandler
}) {

    // Get everything from context
    const {
      last5RecordsPlayed,
      user
    } = useAuth();
  /* -------------------------------------------- */
  /*  RESPONSIVE HOOK                              */
  /* -------------------------------------------- */
  let mapOfSongs = new Map();

  let tempRecordsList = recordsList;

  tempRecordsList.forEach((song) => {
    if (!mapOfSongs.has(song.albumUUID)) mapOfSongs.set(song.albumUUID, song);
  });

  function useIsMdUp() {
    const mdQuery = "(min-width: 768px)";
    const [isMdUp, setIsMdUp] = useState(() =>
      typeof window !== "undefined" ? window.matchMedia(mdQuery).matches : false
    );

    useEffect(() => {
      const media = window.matchMedia(mdQuery);
      const listener = (e) => setIsMdUp(e.matches);

      media.addEventListener("change", listener);
      setIsMdUp(media.matches);

      return () => media.removeEventListener("change", listener);
    }, []);

    return isMdUp;
  }

  const isMdUp = useIsMdUp();

  /* -------------------------------------------- */
  /*  DESKTOP LAYOUT                               */
  /* -------------------------------------------- */

  function DesktopLayout() {
    return (
      <div className="mx-16 flex flex-col justify-center items-center h-screen relative">
        <img
          src={websiteLogo}
          className="hidden lg:max-h-64 pb-8 max-h-32"
          alt="MyVinylStats Logo"
        />

        {/* Discogs Connection Banner */}
        {!discogsConnected && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-300 border-2 border-black rounded-lg px-8 py-4 shadow-2xl">
            <div className="flex flex-row justify-center items-center">
              <h3 className="text-xl font-black mb-2">Connect</h3>
              <img src={discogsLogo} className="max-h-12 mx-2" />
              <h3 className="text-xl font-black mb-2">to get started.</h3>
            </div>

            <p className="text-md mb-2 text-center">MyVinylStats needs access to your collection to import your albums.</p>
            
            <button
              className="bg-blue-500 text-white rounded-lg border-2 border-black px-6 py-2 font-bold hover:bg-blue-600 w-full hover:cursor-pointer hover:border-white"
              onClick={onConnectDiscogs}
            >
              Connect Discogs Account
            </button>
          </div>
        )}

        <div className="w-full h-full flex justify-center items-center gap-2">
          <div
            className={`flex gap-4 ${
              !discogsConnected && "opacity-50 pointer-events-none"
            }`}
          >
            <MainMenuCard
              primaryColor={"bg-[#58bfc4]"}
              secondaryColor={"bg-[#eafeff]"}
              title={"Currently Playing"}
              description={
                isMdUp
                  ? "Browse your current and recently played records."
                  : "View the current album."
              }
              onClick={listeningSectionButtonHandler}
              backgroundPhoto={user?.currentlyListeningTo?.albumCoverImageURL}
              disabled={!discogsConnected}
            />

            <MainMenuCard
              primaryColor={"bg-[#cc935a]"}
              secondaryColor={"bg-[#fff8f2]"}
              title={"Your Library"}
              description={
                isMdUp
                  ? "See your collection. Manually log your play sessions & print QR codes."
                  : "See your collection."
              }
              onClick={librarySectionButtonHandler}
              backgroundPhoto={RecordCollectionPhoto}
              disabled={!discogsConnected}
            />

            <MainMenuCard
              primaryColor={"bg-[#6a90c6]"}
              secondaryColor={"bg-[#dee6f2]"}
              title={"Listening History"}
              description={
                isMdUp
                  ? "View all albums you've ever played, dates & times."
                  : "View all albums you've ever played."
              }
              onClick={listeningHistoryButtonHandler}
              backgroundPhoto={ListeningHistoryScreenshot}
              disabled={!discogsConnected}
            />

            <MainMenuCard
              primaryColor={"bg-[#ba5d5d]"}
              secondaryColor={"bg-[#f7eaea]"}
              title={"Tutorial (Soon)"}
              description={
                isMdUp
                  ? "How to use MyVinylStats! (Currently links to an FAQ)"
                  : "How to use MyVinylStats."
              }
              onClick={FAQButtonHandler}
              backgroundPhoto={ScanningQRCodePhoto}
              disabled={false} // Tutorial/FAQ always accessible
            />

            {/*<MainMenuCard
              primaryColor={"bg-[#ba5d5d]"}
              secondaryColor={"bg-[#f7eaea]"}
              title={"Profile"}
              description={
                isMdUp
                  ? "Your Profile"
                  : "Your Profile."
              }
              onClick={profileButtonHandler}
              backgroundPhoto={ScanningQRCodePhoto}
              disabled={false} // Tutorial/FAQ always accessible
              className = "hidden"
            />*/}
          </div>
        </div>
      </div>
    );
  }

  /* -------------------------------------------- */
  /*  MOBILE LAYOUT                                */
  /* -------------------------------------------- */

  function MobileLayout() {
    return (
      <div className="mx-4 text-center relative">
        <div className="w-screen flex justify-center items-center pt-2">
          <img
            src={websiteLogo}
            className="hidden lg:max-h-64 pb-8 mt-2 max-h-32"
            alt="MyVinylStats Logo"
          />
        </div>

        {/* Discogs Connection Banner */}
        {!discogsConnected && (
          <div className="my-4 bg-green-300 border-2 border-black rounded-lg px-4 py-4 shadow-lg">
            <div className="flex flex-row justify-center items-center">
              <h3 className="text-xl font-black mb-2">Connect</h3>
              <img src={discogsLogo} className="max-h-12 mx-2" />
              <h3 className="text-xl font-black mb-2">to get started.</h3>
            </div>

            <div className="flex flex-row justify-center items-center pb-4">
              <p className="text-md">MyVinylStats needs access to your Discogs collection to import your albums.</p>
            </div>

            <button
              className="bg-blue-500 text-white rounded-lg border-2 border-black px-4 py-2 font-bold hover:bg-blue-600 w-full"
              onClick={onConnectDiscogs}
            >
              Connect Now
            </button>
          </div>
        )}

        <div
          className={`${
            !isMdUp ? `grid grid-cols-2 lg:grid-cols-3 gap-6` : ``
          } ${!discogsConnected && "opacity-50 pointer-events-none"}`}
        >
          <MainMenuCard
            primaryColor={"bg-[#58bfc4]"}
            secondaryColor={"bg-[#eafeff]"}
            title={"Currently Playing"}
            description={"View the current album."}
            onClick={listeningSectionButtonHandler}
            backgroundPhoto={recordsList[0]?.albumCoverImageURL}
            disabled={!discogsConnected}
          />

          <MainMenuCard
            primaryColor={"bg-[#cc935a]"}
            secondaryColor={"bg-[#fff8f2]"}
            title={"Your Library"}
            description={"See your collection."}
            onClick={librarySectionButtonHandler}
            backgroundPhoto={RecordCollectionPhoto}
            disabled={!discogsConnected}
          />

          <MainMenuCard
            primaryColor={"bg-[#6a90c6]"}
            secondaryColor={"bg-[#dee6f2]"}
            title={"Listening History"}
            description={"View all albums you've ever played."}
            onClick={listeningHistoryButtonHandler}
            backgroundPhoto={ListeningHistoryScreenshot}
            disabled={!discogsConnected}
          />

          <MainMenuCard
            primaryColor={"bg-[#ba5d5d]"}
            secondaryColor={"bg-[#f7eaea]"}
            title={"Tutorial (Soon)"}
            description={"How to use MyVinylStats!"}
            onClick={FAQButtonHandler}
            backgroundPhoto={ScanningQRCodePhoto}
            disabled={false} // Tutorial/FAQ always accessible
          />
        </div>
      </div>
    );
  }

  return isMdUp ? <DesktopLayout /> : <MobileLayout />;
}

export default MainMenuPage;
