import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function GrailSelector() {
  const { user } = useAuth();
  const [selectedGrails, setSelectedGrails] = useState([]);
  const [availableAlbums, setAvailableAlbums] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user?.albumCollection) {
      // Initialize with existing grails if they exist
      const existingGrails = user.grails || [];
      setSelectedGrails(existingGrails);

      // Filter out grails from available albums
      const grailIds = existingGrails.map(g => g.albumReleaseID);
      const available = user.albumCollection.filter(
        album => !grailIds.includes(album.albumReleaseID)
      );
      setAvailableAlbums(available);
    }
  }, [user]);

  const handleAddGrail = (album) => {
    if (selectedGrails.length >= 5) {
      setErrorMessage("Maximum 5 grails reached!");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    setSelectedGrails([...selectedGrails, album]);
    setAvailableAlbums(availableAlbums.filter(a => 
      a.albumReleaseID !== album.albumReleaseID
    ));
  };

  const handleRemoveGrail = (album) => {
    setSelectedGrails(selectedGrails.filter(g => 
      g.albumReleaseID !== album.albumReleaseID
    ));
    setAvailableAlbums([...availableAlbums, album]);
    setErrorMessage("");
  };

  const handleConfirm = () => {
    // TODO: Send selectedGrails to backend
    console.log("Confirmed grails:", selectedGrails);
    // You'll add your API call here later
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold text-center">Select Your Grails</h1>
      
      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-500 text-white text-center py-2 px-4 rounded-lg animate-pulse">
          {errorMessage}
        </div>
      )}

      {/* Selected Grails Section */}
      <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg p-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-3 text-center">
          Your Grails ({selectedGrails.length}/5)
        </h2>
        <div className="flex flex-row justify-center items-center gap-4 flex-wrap min-h-[150px]">
          {selectedGrails.length === 0 ? (
            <p className="text-gray-500 italic">Click albums below to add them as grails</p>
          ) : (
            selectedGrails.map((album) => (
              <div
                key={album.albumReleaseID}
                onClick={() => handleRemoveGrail(album)}
                className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
              >
                <img
                  className="h-32 w-32 object-cover border-4 border-yellow-500 rounded-lg shadow-md"
                  src={album?.albumCoverImageURL}
                  alt={album?.albumTitle || "Album cover"}
                />
                <p className="text-sm mt-1 font-semibold text-center max-w-[128px] truncate">
                  {album?.albumTitle}
                </p>

                <p className="text-sm mt-1 text-center max-w-[96px] truncate">
                {album?.albumArtists[0].name}
              </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Available Albums Section */}
      <div className="bg-gray-100 rounded-lg p-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-3 text-center">Your Collection</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 max-h-[500px] overflow-y-auto">
          {availableAlbums.map((album) => (
            <div
              key={album.albumReleaseID}
              onClick={() => handleAddGrail(album)}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                className="h-24 w-24 object-cover border-2 border-gray-400 rounded-lg shadow-sm hover:border-yellow-500"
                src={album?.albumCoverImageURL}
                alt={album?.albumTitle || "Album cover"}
              />
              <p className="text-sm font-bold mt-1 text-center max-w-[96px] truncate">
                {album?.albumTitle}
              </p>
              <p className="text-sm mt-1 text-center max-w-[96px] truncate">
                {album?.albumArtists[0].name}
              </p>

              <p className="hidden text-sm mt-1 text-center max-w-[96px] truncate">{album?.albumFormats[0]?.text + " " + album?.albumFormats[0]?.name}</p>
              
            </div>
          ))}
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirm}
        className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg text-xl transition-colors"
      >
        Confirm Grails
      </button>
    </div>
  );
}

export default GrailSelector;