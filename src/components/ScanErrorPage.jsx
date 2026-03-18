import { useLocation, useNavigate } from "react-router-dom";

function ScanErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const message =
    params.get("message") ||
    "That action is temporarily unavailable.";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black bg-opacity-10">
      <div className="bg-white border-4 border-black rounded-lg p-6 max-w-md text-center">
        <h1 className="text-xl font-bold mb-4">Scan blocked</h1>

        <p className="mb-6">{message}</p>

        <button
          className="px-4 py-2 bg-gray-200 border-2 border-black rounded-lg hover:bg-green-300"
          onClick={() => navigate("/library")}
        >
          Back to Library
        </button>
      </div>
    </div>
  );
}

export default ScanErrorPage;
