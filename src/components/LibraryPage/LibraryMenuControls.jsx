

function LibraryMenuControls({sortAttribute, applySearch, searchInput, setSearchInput, setSortAttribute, setQrModalOpen, recordsList, setRecordsList, setCurrentPage}){

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

    return (

        <div id = "updatedVisualControls" className="flex flex-col mb-4 bg-white border-4 border-black border-solid text-bold mb-4 text-sm mx-4 md:mx-0 md:text-lg">
        <div className="block md:hidden bg-black font-oxanium text-white text-center text-xl">Your Library</div>
        <div className="flex flex-row pt-4 mx-2">
            <div className="flex flex-col flex-1"><h1>Sort by:</h1></div>
            <button 
            className={`border-2 border-solid border-black rounded-lg mx-2 px-2 hover:cursor-pointer hover:bg-black hover:text-white ${sortAttribute == `Title` ? `bg-black text-white` : ``}`}
            onClick={() => sortAlbumsViaAttribute("Title")}>
              Title
            </button>

            <button 
            className={`border-2 border-solid border-black rounded-lg mx-2 px-2 hover:cursor-pointer hover:bg-black hover:text-white ${sortAttribute == `Artist` ? `bg-black text-white` : ``}`}
            onClick={() => sortAlbumsViaAttribute("Artist")}>
              Artist
            </button>

            <button 
            className={`border-2 border-solid border-black rounded-lg mx-2 px-2 hover:cursor-pointer hover:bg-black hover:text-white ${sortAttribute == `Popularity` ? `bg-black text-white` : ``}`}
            onClick={() => sortAlbumsViaAttribute("Popularity")}>
              Playcount
            </button>
        </div>
        <div className="flex flex-row mt-4 mb-4 font-oxanium mx-2">
        <form onSubmit={applySearch}>
          <input
            type="text"
            className="border-2 border-black rounded-lg px-2 py-1 hover:cursor-pointer hover:border-white"
            placeholder="Search albums..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} // Just stores text. No filtering yet!
          />
        </form>
        

        <button
          onClick={() => setQrModalOpen(true)}
          className="hidden md:block border-2 border-black rounded-lg px-2 ml-2 hover:cursor-pointer hover:bg-black hover:text-white"
        >
          Get QR Codes
        </button>
      </div>

      

      </div>
    )
}

export default LibraryMenuControls