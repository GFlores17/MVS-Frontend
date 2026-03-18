import { useState } from "react";

function AlbumPage({ selectedAlbum }) {
  const [tags, setTags] = useState(selectedAlbum?.tags || []);
  const [datePurchased, setDatePurchased] = useState(selectedAlbum?.datePurchased || "");
  const [notes, setNotes] = useState(selectedAlbum?.notes || "");

  // Predefined tag options
  const availableTags = [
    "Signed",
    "Sealed",
    "First Press",
    "Limited Edition",
    "Color Vinyl",
    "Picture Disc",
    "Gatefold",
    "180g",
    "Reissue",
    "Mint Condition",
    "Rare",
    "Bootleg"
  ];

  const toggleTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleSave = () => {
    // TODO: Send updated info to backend
    console.log("Saving album details:", {
      albumReleaseID: selectedAlbum.albumReleaseID,
      tags,
      datePurchased,
      notes
    });
  };

  if (!selectedAlbum) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-500">No album selected</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 p-6 gap-8">
      {/* Left Side - Album Display */}
      <div className="flex-1 flex flex-col items-center justify-start lg:justify-center">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-lg w-full">
          <img
            src={selectedAlbum.albumCoverImageURL}
            alt={selectedAlbum.albumTitle}
            className="w-full aspect-square object-cover rounded-lg shadow-lg mb-6"
          />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedAlbum.albumTitle}
            </h1>
            <h2 className="text-xl text-gray-600 mb-4">
              {selectedAlbum.albumArtists?.[0]?.name || "Unknown Artist"}
            </h2>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <p>Release ID: {selectedAlbum.albumReleaseID}</p>
              <p>Times Listened: {selectedAlbum.numberOfTimesListened || 0}</p>
              {selectedAlbum.genre && <p>Genre: {selectedAlbum.genre}</p>}
              {selectedAlbum.year && <p>Year: {selectedAlbum.year}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Details & Tags */}
      <div className="flex-1 flex flex-col gap-6 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Details</h3>
          
          {/* Date Purchased */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date Purchased
            </label>
            <input
              type="date"
              value={datePurchased}
              onChange={(e) => setDatePurchased(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Tags Section */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    tags.includes(tag)
                      ? "bg-teal-500 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Notes Section */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this album..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors"
          >
            Save Changes
          </button>
        </div>

        {/* Additional Stats Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Total Plays</p>
              <p className="text-2xl font-bold text-teal-600">
                {selectedAlbum.numberOfTimesListened || 0}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Last Played</p>
              <p className="text-sm font-semibold text-gray-700">
                {selectedAlbum.lastPlayed 
                  ? new Date(selectedAlbum.lastPlayed).toLocaleDateString()
                  : "Never"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumPage;