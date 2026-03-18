import FAQPage from "./FAQPage"

function TestTutorialPage({buttonToMainMenuHandler, tutorialVisible}){
    return(

    <div className={`mt-16 px-2 flex flex-col justify-center items-center bg-gray-100 border-2 border-black ml-4 mr-4`}>
        
        

    <div>
    Tutorial 12-7-2025 8:01PM <br/>
    </div>
    
    <div className="flex flex-row justify-between items-between w-full pt-4 ">
    1. For new accounts, click on Connecting Discogs button in top right. (Example shown on right.)
    <button
        className="border w-32 bg-green-500 ml-4"
        
      >
        Connect Discogs
      </button>
    </div>

    <div className="flex flex-row justify-between items-between w-full pt-4 ">
    2. Click on Library button. (Example shown on right)

    <div 
    className='w-32 text-center rounded-lg border-2 border-black border-solid bg-red-200 hover:bg-white hover:cursor-pointer hover:border-blue-400'
    >Library</div>
    </div>

    

    <div className="flex flex-col justify-between items-between w-full pt-4 ">
    3. In your library QR code of album you want to listen.
    <br/><br/>
    <span className="font-bold">
    (Note, QR codes do not display on mobile. Mobile is only to check stats.)
    </span>
    </div>
   
    
    <div className="flex flex-row justify-between items-between w-full pt-4 ">
    4. Done!
    </div>

    <FAQPage/>
  </div>)
}

export default TestTutorialPage