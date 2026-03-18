import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import GrailSelector from "./GrailSelector";
import tealRecord from "../../assets/images/logos/svg/tealRecord.svg";

function Profile() {
  const [userProfileDetails, setUserProfileDetails] = useState({});
  const [currentSong, setCurrentSong] = useState();

  // Get everything from context
  const { user } = useAuth();
  const [topAlbums, setTopAlbums] = useState([]);

  useEffect(() => {
    if (user) {
      loadProfile(user.username);
    }
  }, [user]);

  // Add this useEffect to calculate top albums whenever user changes
  useEffect(() => {
    if (user?.albumCollection) {
      // Sort by numberOfTimesListened in descending order
      const sortedAlbums = [...user.albumCollection].sort(
        (a, b) =>
          (b.numberOfTimesListened || 0) - (a.numberOfTimesListened || 0)
      );

      // Get top 5
      setTopAlbums(sortedAlbums.slice(0, 5));
    }
  }, [user]);

  const loadProfile = async (userName) => {
    try {
      const res = await fetch(`https://api.discogs.com/users/${userName}`);
      const data = await res.json();
      setUserProfileDetails(data);
      console.log("USER:", user);
      console.log(user.username);
      console.log(user.currentlyListeningTo);
      setCurrentSong(user.currentlyListeningTo);
      console.log("CURRENT SONG:", user.currentlyListeningTo);
      console.log(data);
    } catch (err) {
      console.error("loadUser error:", err);
    }
  };

  return (
    <div>
      <div className="flex flex-col  ">
        <div className="flex-1 text-xl font-bold text-oxanium flex flex-row justify-around items-center bg-mvsWhite rounded-lg shadow-lg p-2 gap-2 w-full">
          <div className=" flex flex-col justify-center items-center ">
            <img src={userProfileDetails.avatar_url} className="h-32 w-32" />
            <h1>{userProfileDetails.username}</h1>
            <h1>{userProfileDetails.name}</h1>
            <h1 className="hidden">{userProfileDetails.profile}</h1>
          </div>

          {currentSong?.albumArtists?.[0] && (
            <div className="flex flex-col">
              <div className="flex-1 gap-4 flex flex-row justify-center items-center bg-mvsWhite ">
                <img
                  src={currentSong.albumCoverImageURL}
                  className="h-32 w-32"
                ></img>

                <img
                  src={tealRecord}
                  className="max-w-32 max-h-32 animate-[spin_3s_linear_infinite]"
                />
              </div>
              <div>
                <div className="flex flex-col justify-center items-center">
                  <p>{currentSong.albumArtists[0].name}</p>
                  <p>{currentSong.albumTitle}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <h1 className="w-full text-2xl font-bold text-center py-2">
          Recently Played
        </h1>
        <div className="flex flex-row justify-between items-center gap-2 px-3 py-2 bg-gray-200">
          {user?.last5AlbumsPlayed.slice(0, 5).map((record, index) => (
            <div key={index} className="flex-1 flex justify-center">
              <img
                className="h-24 image-cover w-24 object-contain border border-black bg-gray-300 rounded-full"
                src={record?.albumCoverImageURL}
                alt=""
              />
            </div>
          ))}
        </div>

        <div>
          <div>
            <h1 className="w-full text-2xl font-bold text-center py-2">
              Top Albums
            </h1>
            <div className="flex flex-row justify-between items-center gap-2 px-3 py-2 bg-gray-200">
              {topAlbums.map((album, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col justify-center items-center"
                >
                  <img
                    className="h-24 w-24 object-cover border border-black bg-gray-300 rounded-full"
                    src={album?.albumCoverImageURL}
                    alt={album?.albumTitle || "Album cover"}
                  />
                   <p className="text-sm font-bold text-center mt-1">
                    {album?.albumTitle}
                  </p>
                  <p className="text-sm mt-1">
                    {album?.albumArtists[0].name}
                  </p>
                  <p className="text-xs mt-1">
                    {album?.numberOfTimesListened || 0} plays
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            {user?.last5AlbumsPlayed.slice(0, 5).map((record, index) => (
              <div key={index} className="flex-1 flex justify-center">
                <img
                  className="h-24 image-cover w-24 object-contain border border-black bg-gray-300 rounded-full"
                  src={record?.albumCoverImageURL}
                  alt=""
                />
              </div>
            ))}
          </div>

          <GrailSelector/>

        </div>
      </div>
    </div>
  );
}

export default Profile;
