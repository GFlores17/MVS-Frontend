import QRCode from "react-qr-code";
import QuestionMarkPhoto from "../../assets/images/Black_question_mark.png";

function qrCodeUrl(albumUUID) {
    return `${window.location.origin}/scan/${albumUUID}`;
  }
  
function AlbumCard({record, openListeningConfirm}){
    return(
        <div
        key={record.id}
        className="
          hover:scale-105
          hover:cursor-pointer
          hover:border-gray-600
          transition-500
          bg-white
          w-full
          max-w-[12rem]
          rounded-lg
          border-2 border-gray-200
          shadow-sm
          flex flex-col
          items-center
          p-3
          gap-2
          text-center
          hover:shadow-md
          transition
        "
        onClick={() => openListeningConfirm(record)}
      >
        {/* Index Number */}
        {/*<div className="absolute self-start text-xs text-gray-400">*/}
        {/*#{indexOfFirstItem + index + 1}*/}
       {/*</div>*/}
    
        {/* Album Cover */}
        <img
          className="h-32 w-32 md:h-40 md:w-40 object-fill rounded"
          loading="lazy"
          src={
            record.albumCoverImageURL === ""
              ? QuestionMarkPhoto
              : record.albumCoverImageURL
          }
          alt={`${record.albumTitle} cover`}
        />
    
        {/* Album Info */}
        <div className="font-oxanium flex flex-col gap-1 w-full">
          <h1 className="text-start font-[800] text-sm md:text-base truncate mb-2">
            {record.albumTitle}
          </h1>
    
          <div className="flex justify-between items-center">
            <h2 className="text-xs md:text-sm text-gray-600 truncate">
              {record.albumArtists[0].name}
            </h2>

            {record?.albumFormats?.[0] && (
              <h2 className="text-xs font-semibold">
               {record.albumFormats[0].name}
              </h2>
            )}
          </div>
          
          <div className="flex justify-between">
          {record?.albumYear != 0  && (
            <p className="italic text-xs text-gray-500">
              {record.albumYear}
            </p>
          )}
    
          {record?.albumYear == 0  && (
            <p className="italic text-xs text-gray-500">
              N/A
            </p>
          )}
          
    
          {record?.albumReleaseID && (
            <p className="text-xs text-gray-500">
              ID: {record.albumReleaseID}
            </p>
          )}
          </div>
    
          
    
          <p className="text-xs mt-4">
            Plays: <span className="font-bold">{record.numberOfTimesListened}</span>
          </p>
    
          {record?.listOfListeningSessions?.length > 0 && (
            <p className="text-[12px] text-gray-500">
              Last played:{" "}
              {new Date(
                record.listOfListeningSessions.at(-1)
              ).toLocaleDateString()}
            </p>
          )}
          {record?.listOfListeningSessions?.length == 0 && (
            <p className="text-[12px] text-gray-500">
              Last played: N/A
            </p>
          )}
        </div>
    
        <div className="flex flex-row justify-center items-center w-full h-full mt-2">
            {/* QR Code (Desktop only) */}
          <QRCode
            className="hidden md:block"
            size={64}
            value={qrCodeUrl(record.albumUUID)}
          />
        </div>
        
      </div>


)
}

export default AlbumCard;