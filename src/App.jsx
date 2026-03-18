import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import CurrentlyListeningPage from "./components/CurrentlyListeningPage";
import LibraryPage from "./components/LibraryPage";
import MainMenuPage from "./components/MainMenuPage";
import ScanErrorPage from "./components/ScanErrorPage";
import TestTutorialPage from "./components/TestTutorialPage";
import FAQPage from "./components/FAQPage";
import ScanHandlerPage from "./components/ScanHandlerPage";
import ListeningHistoryPage from "./components/ListeningHistoryPage";
import AlbumSearchBar from "./components/LibraryPage/AlbumSearchBar";
import LoginPageContent from "./components/LoginPage/LoginPageContent";
import Profile from "./components/ProfilePage/Profile";

import navBarLogo2 from "./assets/images/logos/160px/WhiteLogo.png";
import libraryIcon from "./assets/images/icons/OTHERWHITE160/Asset 46.png";
import listeningHistoryIcon from "./assets/images/icons/OTHERWHITE160/Asset 44.png";
import currentlyListeningIcon from "./assets/images/icons/OTHERWHITE160/Asset 45.png";
import logoutIcon from "./assets/images/icons/OTHERWHITE160/Asset 47.png";

import "./App.css";
import AlbumPage from "./components/ProfilePage/AlbumProfile";

function isPageTallerThanScreen() {
  return document.documentElement.scrollHeight > window.innerHeight;
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isContentTallerThanScreen = isPageTallerThanScreen();

  // Get everything from context
  const {
    loading,
    userLoading, // ⭐ Add this
    session,
    userExists,
    recordsList,
    setRecordsList,
    last5RecordsPlayed,
    setLast5RecordsPlayed,
    completeListeningHistory,
    signOut,
    connectDiscogs,
  } = useAuth();

  // Navigation helpers
  const goHome = () => navigate("/");
  const goLibrary = () => navigate("/library");
  const goListening = () => navigate("/listening");
  const goTutorial = () => navigate("/tutorial");
  const goFAQ = () => navigate("/faq");
  const goCompleteListeningHistory = () => navigate("/completelisteningHistoryPage");
  const goProfile = () => navigate("/profile");

  // ⭐ Wait for BOTH auth and user data to load
  if (loading || userLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  // Show login page if no session
  if (!session) {
    return (
      <div
        className={`${isContentTallerThanScreen ? `h-full py-16` : `h-screen`} w-screen flex sm:flex-col flex-col justify-center items-center`}
      >
        <LoginPageContent />
      </div>
    );
  }

  return (
    <div className="bg-mvsBackgroundColor min-h-screen relative font-jura">
      {/* NAV BAR */}
      <div className="flex bg-mvsDarkCyan justify-between items-center h-20 px-4 border-b-2 rounded-b-lg shadow-2xl border-gray-200">
        <AlbumSearchBar recordsList={recordsList} />

        <img
          src={navBarLogo2}
          className="max-h-16 py-2 hover:cursor-pointer hover:scale-105"
          onClick={goHome}
          alt="Logo"
        />

        <div className="hidden md:flex font-oxanium gap-6">
          <img
            src={currentlyListeningIcon}
            onClick={userExists ? goListening : undefined}
            className={`max-h-8 pr-3 ${userExists ? 'hover:cursor-pointer hover:scale-105' : 'opacity-50 cursor-not-allowed'}`}
            alt="Currently Listening"
          />
          <img
            src={libraryIcon}
            onClick={userExists ? goLibrary : undefined}
            className={`max-h-8 pr-1 ${userExists ? 'hover:cursor-pointer hover:scale-105' : 'opacity-50 cursor-not-allowed'}`}
            alt="Library"
          />
          <img
            src={listeningHistoryIcon}
            onClick={userExists ? goCompleteListeningHistory : undefined}
            className={`max-h-8 pr-4 ${userExists ? 'hover:cursor-pointer hover:scale-105' : 'opacity-50 cursor-not-allowed'}`}
            alt="Listening History"
          />
          <img
            src={logoutIcon}
            onClick={signOut}
            className="max-h-8 hover:cursor-pointer hover:scale-105"
            alt="Logout"
          />
        </div>

        <button
          className="md:hidden text-4xl"
          onClick={() => setMobileMenuOpen((p) => !p)}
        >
          ≡
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-100 flex flex-col gap-4 py-2">
          <button
            className={`font-bold ${!userExists && 'opacity-50 cursor-not-allowed'}`}
            onClick={() => {
              if (!userExists) return;
              goListening();
              setMobileMenuOpen(false);
            }}
            disabled={!userExists}
          >
            Currently Playing
          </button>
          <button
            className={`font-bold ${!userExists && 'opacity-50 cursor-not-allowed'}`}
            onClick={() => {
              if (!userExists) return;
              goLibrary();
              setMobileMenuOpen(false);
            }}
            disabled={!userExists}
          >
            Your Library
          </button>
          <button
            className={`font-bold ${!userExists && 'opacity-50 cursor-not-allowed'}`}
            onClick={() => {
              if (!userExists) return;
              goCompleteListeningHistory();
              setMobileMenuOpen(false);
            }}
            disabled={!userExists}
          >
            Listening History
          </button>
          <button className="font-bold" onClick={signOut}>
            Log Out
          </button>
        </div>
      )}

      {/* ROUTES */}
      <Routes>
        <Route
          path="/"
          element={
            <MainMenuPage
              librarySectionButtonHandler={userExists ? goLibrary : undefined}
              listeningSectionButtonHandler={userExists ? goListening : undefined}
              tutorialButtonHandler={goTutorial}
              FAQButtonHandler={goFAQ}
              recordsList={recordsList}
              completeListeningHistory={completeListeningHistory}
              listeningHistoryButtonHandler={userExists ? goCompleteListeningHistory : undefined}
              discogsConnected={userExists}
              onConnectDiscogs={connectDiscogs}
              profileButtonHandler={goProfile}
            />
          }
        />

        {userExists && (
          <>
            <Route
              path="/library"
              element={
                <LibraryPage
                  recordsList={recordsList}
                  setRecordsList={setRecordsList}
                  session={session}
                  userEmail={session.user.email}
                  last5RecordsPlayed={last5RecordsPlayed}
                  setLast5RecordsPlayed={setLast5RecordsPlayed}
                  switchToListeningSectionHandler={goListening}
                  buttonToMainMenuHandler={goHome}
                />
              }
            />

            <Route
              path="/listening"
              element={
                <CurrentlyListeningPage
                  recordsList={recordsList}
                  last5RecordsPlayed={last5RecordsPlayed}
                  setLast5RecordsPlayed={setLast5RecordsPlayed}
                  userEmail={session.user.email}
                  buttonToMainMenuHandler={goHome}
                />
              }
            />

            <Route
              path="/completeListeningHistoryPage"
              element={
                <ListeningHistoryPage
                  completeListeningHistory={completeListeningHistory}
                  recordsList={recordsList}
                  buttonToMainMenuHandler={goHome}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <Profile/>
              }
            />
          </>
        )}

        <Route
          path="/tutorial"
          element={<TestTutorialPage buttonToMainMenuHandler={goHome} />}
        />
        <Route
          path="/faq"
          element={<FAQPage buttonToMainMenuHandler={goHome} />}
        />
        <Route path="/scan-error" element={<ScanErrorPage />} />
        <Route path="/album-page" element={<AlbumPage />} />
        <Route path="/scan/:albumUUID" element={<ScanHandlerPage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;