import QRCode from "react-qr-code";
import Barcode from "react-barcode";
import QuestionMarkPhoto from "../assets/images/Black_question_mark.png";
import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { io } from "socket.io-client";
import AlbumSelectionModal from "./LibraryPage/QRCodeSelectionModal.jsx";
import AlbumCard from "./LibraryPage/AlbumCard.jsx";
import LibraryMenuControls from "./LibraryPage/LibraryMenuControls.jsx";
import QRCodeSelectionModal from "./LibraryPage/QRCodeSelectionModal.jsx";
import ConfirmListeningSessionModal from "./LibraryPage/ConfirmListeningSessionModal.jsx";
import PageNavigationButtons from "./LibraryPage/PageNavigationButtons.jsx";

const baseURLinUse = import.meta.env.VITE_BACKEND_URL;
////console.log("BASE URL IN USE:", baseURLinUse);

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

function LibraryPage({
  recordsList,
  userEmail,
  buttonToMainMenuHandler,
  setRecordsList,
  session,
  setLast5RecordsPlayed,
  last5RecordsPlayed,
  switchToListeningSectionHandler,
}) {
  const [searchInput, setSearchInput] = useState("");
  const [displayList, setDisplayList] = useState(recordsList);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  const isMdUp = useIsMdUp();

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const noResults = displayList.length === 0 && searchInput.trim() !== "";

  const [sortAttribute, setSortAttribute] = useState("Artist");


  let freqMap = new Map();
  let tempList = recordsList;

  tempList.forEach(album=>{
    let freqArray;
    if(album.albumMasterID == 0) return;
    //console.log("CURRENT ALBUM:", album.albumTitle, album.numberOfTimesListened);
    freqMap.has(album.albumMasterID) ? freqArray = freqMap.get(album.albumMasterID) : freqArray = []
    freqArray.push(album.numberOfTimesListened);
    freqMap.set(album.albumMasterID, freqArray);
  })

  for (const [key, value] of freqMap) {
    //console.log(key);
    //console.log(value);

    let temp = value;
    let sum = 0;

    temp.forEach(listenFrequency=>{
      sum+=listenFrequency
    })
    freqMap.set(key, sum);
}

  //console.log("freqMap:", freqMap);


  //console.log("RECORDS LIST:", recordsList);
  //if (last5RecordsPlayed) //console.log("last 5:", last5RecordsPlayed);

  const getLabels = async () => {
    await fetch(
      `${baseURLinUse}/api/labels/albums_full_labels?email=${userEmail}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        credentials: "include",
      },
    )
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
      });
  };

  const getBarcodes = async () => {
    await fetch(`${baseURLinUse}/api/labels/barcodes_only?email=${userEmail}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
      credentials: "include",
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
      });
  };

  const getQRCodes = async () => {
    await fetch(`${baseURLinUse}/api/labels/qrcodes_only?email=${userEmail}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
      credentials: "include",
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
      });
  };

  function searchViaSearchParams(searchInput){
    if (!searchInput.trim()) {
      setDisplayList(recordsList);
      return;
    }

    const query = searchInput.toLowerCase();

    const filtered = recordsList.filter((record) => {
      const title = record.albumTitle.toLowerCase();
      const artists = record.albumArtists
        .map((a) => a.name.toLowerCase())
        .join(" ");
      const releaseID = String(record.albumReleaseID);

      return (
        title.includes(query) ||
        artists.includes(query) ||
        releaseID.includes(query)
      );
    });

    setDisplayList(filtered);
    setCurrentPage(1);
  }

  function applySearch(e) {
    e.preventDefault();
    performSearch(searchInput);
  }

  // Pure search logic (no event)
  function performSearch(searchTerm) {
    if (!searchTerm.trim()) {
      setDisplayList(recordsList);
      return;
    }

    const query = searchTerm.toLowerCase();
    const filtered = recordsList.filter((record) => {
      const title = record.albumTitle.toLowerCase();
      const artists = record.albumArtists
        .map((a) => a.name.toLowerCase())
        .join(" ");
      const releaseID = String(record.albumReleaseID);

      return (
        title.includes(query) ||
        artists.includes(query) ||
        releaseID.includes(query)
      );
    });

    setDisplayList(filtered);
    setCurrentPage(1);
  }

  function qrCodeUrl(albumUUID) {
    return `${window.location.origin}/scan/${albumUUID}`;
  }

  function sortAlbumsViaAttribute(attribute) {
    const sorted = [...recordsList].sort((a, b) => {
      if (attribute === "Title") {
        setSortAttribute("Title");
        return a.albumTitle.localeCompare(b.albumTitle);
      }

      if (attribute === "Artist") {
        setSortAttribute("Artist");
        const nameA = a.albumArtists[0]?.name || "";
        const nameB = b.albumArtists[0]?.name || "";
        return nameA.localeCompare(nameB);
      }

      if (attribute === "Popularity") {
        setSortAttribute("Popularity");
        return b.numberOfTimesListened - a.numberOfTimesListened;
      }

      return 0;
    });

    setRecordsList(sorted); // <-- required to update UI
    setCurrentPage(1);
  }

  
  useEffect(() => {
    if (!recordsList || recordsList.length === 0) return;

    const sortedByArtist = [...recordsList].sort((a, b) => {
      const nameA = a.albumArtists[0]?.name || "";
      const nameB = b.albumArtists[0]?.name || "";
      return nameA.localeCompare(nameB);
    });

    ////console.log("PAGE LOAD USE EFFECT.");
    setRecordsList(sortedByArtist);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    setDisplayList(recordsList);
  }, [recordsList]);


  useEffect(() => {
    console.log("useEffect triggered");
    console.log("searchParams:", searchParams.get('search'));
    console.log("recordsList length:", recordsList.length);
    
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      console.log("Search term from URL:", searchFromUrl);
      setSearchInput(searchFromUrl);
      
      const query = searchFromUrl.toLowerCase();
      const filtered = recordsList.filter((record) => {
        const title = record.albumTitle.toLowerCase();
        const artists = record.albumArtists
          .map((a) => a.name.toLowerCase())
          .join(" ");
        const releaseID = String(record.albumReleaseID);
  
        return (
          title.includes(query) ||
          artists.includes(query) ||
          releaseID.includes(query)
        );
      });
  
      console.log("Filtered results:", filtered.length);
      setDisplayList(filtered);
      setCurrentPage(1);
    }
  }, [searchParams, recordsList]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAlbums = displayList.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(displayList.length / itemsPerPage);

  function openListeningConfirm(record) {
    setSelectedRecord(record);
    setConfirmModalOpen(true);
  }

  function closeListeningConfirm() {
    setConfirmModalOpen(false);
    setSelectedRecord(null);
  }

  async function confirmStartListening(albumUUID) {
    try {
      const res = await fetch(`${baseURLinUse}/api/user/scan`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ albumUUID }),
      });

      if (res.status === 403) {
        const data = await res.json();
        setErrorMessage(data.error);
        return;
      }

      // success → manually navigate
      window.location.href = "/listening";
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  useEffect(() => {
    const socket = io(baseURLinUse);

    socket.on("connect", () => {
      //console.log("Socket connected", socket.id);
      socket.emit("join", userEmail);
    });

    socket.on(
      "recordUpdated",
      ({ albumUUID, newPlayCount, newSessions, last5AlbumsPlayed }) => {
        /*console.log(
          "EVENT RECEIVED",
          albumUUID,
          newPlayCount,
          newSessions,
          last5AlbumsPlayed,
        );*/

        setRecordsList((old) =>
          old.map((record) =>
            record.albumUUID === albumUUID
              ? {
                  ...record,
                  numberOfTimesListened: newPlayCount,
                  listOfListeningSessions: newSessions,
                }
              : record,
          ),
        );

        setDisplayList((old) =>
          old.map((record) =>
            record.albumUUID === albumUUID
              ? {
                  ...record,
                  numberOfTimesListened: newPlayCount,
                  listOfListeningSessions: newSessions,
                }
              : record,
          ),
        );

        setLast5RecordsPlayed(last5AlbumsPlayed);
        switchToListeningSectionHandler();
      },
    );

    return () => socket.disconnect();
  }, [userEmail]);

  return (
    <div
      className={`${`block`} flex flex-col justify-center items-center mb-4 h-full pt-16 md:pt-0 lg:mx-8 md:mx-4 bg-mvsBackgroundColor min-h-screen`}
    >
      <QRCodeSelectionModal
        isOpen={qrModalOpen}
        records={recordsList}
        setQrModalOpen={setQrModalOpen}
      />

      <div className="mt-2 text-3xl text-black mb-4 font-oxanium hidden md:block">
        <h1>Your Library</h1>
      </div>

      <LibraryMenuControls 
        sortAttribute={sortAttribute} 
        applySearch={applySearch} 
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSortAttribute={setSortAttribute}
        setQrModalOpen={setQrModalOpen}
        recordsList={recordsList}
        setRecordsList={setRecordsList}
        setCurrentPage={setCurrentPage}
      />
      
      <PageNavigationButtons currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage}/>

      {noResults ? (
        <div className="mt-12 italic text-gray-600">No results found</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mx-4">
        {currentAlbums.map((record, index) => (
          <AlbumCard record={record} openListeningConfirm={openListeningConfirm}/>
        ))}
        </div>
      )}

      {confirmModalOpen && selectedRecord && (
        <ConfirmListeningSessionModal 
        selectedRecord={selectedRecord} 
        confirmStartListening = {confirmStartListening} 
        closeListeningConfirm={closeListeningConfirm} 
        errorMessage={errorMessage}/>
      )}

      <PageNavigationButtons currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage}/>
      
    </div>
  );
}

export default LibraryPage;
