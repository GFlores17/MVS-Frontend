import questionMarkPhoto from "../assets/images/Black_question_mark.png";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import { FastAverageColor } from "fast-average-color";

function useIsMdUp() {
  // Tailwind md breakpoint = 768px
  const mdQuery = "(min-width: 768px)";

  const [isMdUp, setIsMdUp] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(mdQuery).matches : false,
  );



  useEffect(() => {
    const media = window.matchMedia(mdQuery);

    const listener = (e) => setIsMdUp(e.matches);

    // Initial check
    setIsMdUp(media.matches);

    // Subscribe
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  return isMdUp;
}

function useAvgColor(url) {
  const [color, setColor] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fac = new FastAverageColor();

    fac
      .getColorAsync(url, { crossOrigin: "anonymous" })
      .then((res) => {
        setColor(res.hex); // ex: "#aabbcc"
      })
      .catch((err) => {
        console.error("Color extraction error:", err);
        setColor(null);
      });
  }, [url]);

  return color;
}

/*
const baseURLinUse = import.meta.env.PROD
  ? import.meta.env.VITE_API_PROD
  : import.meta.env.VITE_API_LOCAL;
*/

const baseURLinUse = import.meta.env.VITE_BACKEND_URL;

function CurrentlyListeningPage({
  recordsList,
  last5RecordsPlayed,
  buttonToMainMenuHandler,
  setLast5RecordsPlayed,
  userEmail,
}) {

  // Get everything from context
  const {
    user
  } = useAuth();

  const [hours, minutes] = user.completeListeningHistory?.length 
  ? getCurrentSongLastPlayedTime() 
  : [0, 0];

  function getCurrentSongLastPlayedTime(){

    //Calculates how long ago the users current song was played.
    //Current time - time listened to = time elapsed.
    //Answer returned as an array of units of time [hours, minutes];
  
    let historyLength = user.completeListeningHistory.length;
    let lastListenSession = new Date(user.completeListeningHistory[historyLength-1].playTimestamp);
    let lastListenTime = lastListenSession.getTime();
    let currentTime = new Date().getTime();

    console.log(historyLength, lastListenTime, currentTime)
    let elapsedTime = currentTime-lastListenTime;
    console.log(elapsedTime/(1000*60*60));
    let hoursPassed = Math.floor(elapsedTime/(1000*60*60));
    let minutesPassed = Math.floor(elapsedTime%(1000*60*60)/(1000*60));
    console.log(hoursPassed, "h", minutesPassed, "m since last play.")
    return [hoursPassed, minutesPassed];

  }
  getCurrentSongLastPlayedTime();
  //if(last5RecordsPlayed)//console.log("last 5 albums:", last5RecordsPlayed)

  /*Temporary map logic to display last played dates below*/
  let testMap = new Map();
  recordsList.forEach((record) => {
    testMap.set(record.albumUUID, record.listOfListeningSessions);
  });

  //console.log("TEST MAP:");

  last5RecordsPlayed.forEach((album) => {
    let key = album.albumUUID;
    //console.log(album.albumTitle, testMap.get(key));
  });

  const firstSession = last5RecordsPlayed?.[0]?.listOfListeningSessions?.[0];
  //console.log(last5RecordsPlayed?.[0]?.listOfListeningSessions?.[0]);
  //console.log(last5RecordsPlayed);
  if (!firstSession) {
    //console.log("DATE: No listening session found");
  } else {
    //console.log("DATE:", new Date(firstSession).toLocaleString());
  }
  const dominantColor = useAvgColor(
    last5RecordsPlayed?.[0]?.albumCoverImageURL,
  );
  //console.log('dominant color:', dominantColor);

  const dominantColorTest = useAvgColor("https://i.imgur.com/68jyjZT.jpg");
  //console.log("colortest:", dominantColorTest);

  const isMdUp = useIsMdUp();

  useEffect(() => {
    const socket = io(baseURLinUse);

    socket.on("connect", () => {
      //console.log("Socket connected", socket.id);
      socket.emit("join", userEmail);
    });

    socket.on("recordUpdated", ({ last5AlbumsPlayed }) => {
      setLast5RecordsPlayed(last5AlbumsPlayed);
    });

    return () => socket.disconnect();
  }, [userEmail]);

  function DesktopLayout() {
    return (
      <div className="h-screen overflow-hidden pt-4 px-4">
        {/* Top title */}

       


        {/* Main two-column layout */}
        <div className="grid grid-cols-2 gap-6 h-[calc(100%-5rem)] overflow-hidden mx-32 my-8">
          {/* LEFT: Currently Listening */}
          <div className="grid grid-rows-[auto_1fr] bg-mvsDarkCyan text-white border-2 border-black rounded-lg overflow-hidden min-h-0 p-3">
            {/* Header */}
            <div className="font-oxanium bg-black text-white text-xl sm:text-2xl lg:text-3xl text-center py-2 rounded-md mb-2">
              Currently Listening
            </div>

            {/* Content */}
            <div className="flex flex-col items-center justify-center overflow-hidden min-h-0 px-2">
              <img
                className="rounded-lg p-2 bg-mvsBackgroundColor object-contain max-h-[55%] w-auto"
                src={
                  last5RecordsPlayed[0]
                    ? last5RecordsPlayed[0]?.albumCoverImageURL
                    : questionMarkPhoto
                }
              />

              <h1 className="font-[700] font-oxanium pt-2 text-lg sm:text-xl lg:text-2xl text-center truncate w-full">
                {last5RecordsPlayed[0]?.albumTitle}
              </h1>
              <h1 className="text-base font-medium sm:text-lg lg:text-xl text-center truncate w-full">
                {last5RecordsPlayed[0]?.albumArtists[0]?.name}
              </h1>
              <h1 className="text-base sm:text-lg lg:text-xl">
                {last5RecordsPlayed[0]?.albumYear} - {last5RecordsPlayed[0]?.albumFormats[0]?.text}{" "}
                {last5RecordsPlayed[0]?.albumFormats[0]?.name}
              </h1>
             

              <h1 className="text-sm sm:text-base lg:text-lg italic text-center truncate w-full">
              {hours === 0 && minutes === 0 ? "Playing Now" : `Last Played: ${hours}h ${minutes}m ago`}
              </h1>
              
            </div>
          </div>

          {/* RIGHT: Last 5 Listens */}
          <div className="grid grid-rows-[auto_1fr] bg-mvsDarkCyan border-2 border-black rounded-lg overflow-hidden min-h-0 p-3">
            {/* Header */}
            <div className="font-oxanium bg-black text-white text-xl sm:text-2xl lg:text-3xl text-center py-2 rounded-md mb-2">
              Last 5 Listens
            </div>

            {/* List */}
            <div className="overflow-scroll min-h-0 px-2">
              {last5RecordsPlayed.map((record, index) => (
                <div
                  key={index}
                  className="border-b border-gray-300 flex items-center bg-gray-50 rounded-md mb-2 px-2 py-2 overflow-hidden"
                >
                  <div className="w-6 text-sm sm:text-base lg:text-lg">
                    {index + 1}.
                  </div>

                  <img
                    className="border border-black h-16 sm:h-20 lg:h-24 w-12 sm:w-14 lg:w-16 object-contain bg-gray-300 mx-2 flex-shrink-0"
                    src={record?.albumCoverImageURL}
                  />

                  <div className="flex flex-col overflow-hidden">
                    <h1 className="text-base sm:text-lg lg:text-xl truncate">
                      {record?.albumTitle}
                    </h1>
                    <h1 className="text-base sm:text-lg lg:text-xl truncate">
                      {record?.albumArtists[0]?.name}
                    </h1>
                    <h1 className="text-sm sm:text-base lg:text-lg italic truncate">
                      {record?.albumFormats[0]?.text}{" "}
                      {record?.albumFormats[0]?.name}
                    </h1>

                    {testMap.has(record.albumUUID) && (
                      <h1 className="text-xs sm:text-sm lg:text-base truncate">
                        Last Played:{" "}
                        {new Date(
                          testMap.get(record.albumUUID)[
                            testMap.get(record.albumUUID).length - 1
                          ],
                        ).toLocaleString()}
                      </h1>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function MobileLayout() {
    const [showHistoryDetails, setShowHistoryDetails] = useState(false);
  
    return (
      <div className="h-[calc(100vh-4rem)] flex flex-col overflow-hidden pt-4">  
        <div className="flex flex-col flex-1 mx-4 gap-4 overflow-y-auto">
          
          {/* Album hero - fixed size */}
          <div className="flex-shrink-0 bg-gray-100 border-2 border-black rounded-lg overflow-hidden">
            <div className="font-oxanium bg-black text-white text-center py-2 text-lg font-bold">
              Currently Listening
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 gap-2">
              <img
                className="w-48 max-w-full aspect-square object-contain border-2 border-black bg-gray-300"
                src={
                  last5RecordsPlayed[0]
                    ? last5RecordsPlayed[0]?.albumCoverImageURL
                    : questionMarkPhoto
                }
                alt="Album cover"
              />
              
              <h1 className="text-lg font-bold text-center">
                {last5RecordsPlayed[0]?.albumTitle}
              </h1>
              <h1 className="text-base text-center">
                {last5RecordsPlayed[0]?.albumArtists[0]?.name}
              </h1>
              <h1 className="text-sm text-gray-600">
                {last5RecordsPlayed[0]?.albumYear}
              </h1>
              <h1 className="text-sm italic text-gray-700 text-center">
                {last5RecordsPlayed[0]?.albumFormats[0]?.text}{" "}
                {last5RecordsPlayed[0]?.albumFormats[0]?.name}
              </h1>
            </div>
          </div>
  
          {/* Last 5 listens - collapsible */}
          <div className="flex-shrink-0 border-2 border-black rounded-lg overflow-hidden bg-gray-100">
            <button
              className="w-full flex items-center justify-between px-4 py-2 bg-black text-white"
              onClick={() => setShowHistoryDetails((prev) => !prev)}
            >
              <span className="font-bold text-base font-oxanium">Last 5 Listens</span>
              <span className="text-lg select-none">
                {showHistoryDetails ? "▲" : "▼"}
              </span>
            </button>
  
            {/* Artwork strip - always visible */}
            <div className="flex justify-between items-center gap-2 px-3 py-2 bg-gray-200">
              {last5RecordsPlayed.slice(0, 5).map((record, index) => (
                <div key={index} className="flex-1 flex justify-center">
                  <img
                    className="max-h-12 w-full max-w-[3rem] object-contain border border-black bg-gray-300"
                    src={record.albumCoverImageURL}
                    alt=""
                  />
                </div>
              ))}
            </div>
  
            {/* Expanded details - slides open below */}
            {showHistoryDetails && (
              <div className="border-t-2 border-black">
                {last5RecordsPlayed.map((record, index) => (
                  <div
                    key={index}
                    className="border-t border-gray-300 first:border-t-0 flex flex-row justify-center items-center bg-gray-100"
                  >
                    <div className="flex flex-row p-2 gap-3">
                      <img
                        className="h-16 w-16 object-contain border border-black bg-gray-300"
                        src={record.albumCoverImageURL}
                        alt=""
                      />
  
                      <div className="flex flex-col">
                        <h1 className="font-bold text-sm">
                          {record.albumTitle}
                        </h1>
                        <h1 className="text-xs">
                          {record.albumArtists[0]?.name}
                        </h1>
                        <h1 className="text-xs italic">
                          {record.albumFormats?.[0]?.text}{" "}
                          {record.albumFormats?.[0]?.name}
                        </h1>
  
                        {testMap.has(record.albumUUID) && (
                          <h1 className="text-[10px] text-gray-600">
                            Last Played:{" "}
                            {new Date(
                              testMap.get(record.albumUUID)[
                                testMap.get(record.albumUUID).length - 1
                              ],
                            ).toLocaleString()}
                          </h1>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return isMdUp ? <DesktopLayout /> : <MobileLayout />;
}

export default CurrentlyListeningPage;
