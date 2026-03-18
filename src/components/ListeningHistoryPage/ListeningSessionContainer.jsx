
//I know it makes 0 sense why there's a record and an album. One is a reference to the record in the user's albumCollection, and the other is a reference
//to the map I make on the page to cross reference to their complete listening history because the user's last5ListeningSessions attribute
//doesn't update with the correct info (this was a design mistake, not code that doesn't work), so this is a workaround.

//Will fix soon to make less redundant.
function ListeningSessionContainer({record, album, index}){

    return(<div
        key={`${record.albumUUID}-${record.playTimestamp}-${index}`}
        className="flex items-center w-full md:px-4 md:py-2 md:mb-2
                   bg-white border border-gray-300 rounded-md
                   text-sm md:text-base
                   overflow-hidden
                   mr-4
                   
                   "
      >
        {/* Album art */}
        <img
          className="h-12 w-12 md:h-16 md:w-16 object-contain border border-black flex-shrink-0"
          src={album.albumCoverImageURL}
          alt={album.albumTitle}
        />
        {/* Title */}
        <div className="flex-1 md:flex-2 min-w-0 ml-3">
          <div className="font-bold truncate">{album.albumTitle}</div>
        </div>
        {/* Artist */}
        <div className="flex-1 min-w-0 hidden md:block ml-3">
          <div className="truncate">
            {album.albumArtists?.map((a) => a.name).join(", ")}
          </div>
        </div>
        {/* Format */}
        <div className="hidden md:block text-center font-medium ml-3 flex-shrink-0">
          {album?.albumFormats?.[0]?.name ?? "—"}
        </div>
        {/* Time played */}
        <div className="hidden md:block text-gray-600 ml-3 flex-shrink-0">
          {new Date(record.playTimestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>)
}

export default ListeningSessionContainer;