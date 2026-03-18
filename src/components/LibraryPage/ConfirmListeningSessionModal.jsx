

function ConfirmListeningSessionModal({selectedRecord, confirmStartListening, closeListeningConfirm, errorMessage}){
    return(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer">
        <div className="bg-white rounded-lg border-4 border-black p-6 w-11/12 max-w-md text-center">
          <h2 className="text-xl font-bold mb-4">
            Start a listening session?
          </h2>

          <p className="mb-2">
            <span className="font-bold">{selectedRecord.albumTitle}</span>
          </p>

          <p className="italic mb-6">
            {selectedRecord.albumArtists.map((a) => a.name).join(", ")}
          </p>

          <div className="flex justify-center gap-4">
            <button
              className="px-4 py-2 bg-green-300 border-2 border-black rounded-lg hover:bg-green-100 hover:border-green-800 hover:cursor-pointer"
              onClick={() => confirmStartListening(selectedRecord.albumUUID)}
            >
              Yes
            </button>

            <button
              className="px-4 py-2 bg-red-300 border-2 border-black rounded-lg hover:bg-red-100 hover:border-red-800 hover:cursor-pointer"
              onClick={closeListeningConfirm}
            >
              No
            </button>
          </div>
          {errorMessage && (
            <div className="mt-4 p-3 border-2 border-red-600 bg-red-100 text-red-800 rounded">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
      )
}

export default ConfirmListeningSessionModal;