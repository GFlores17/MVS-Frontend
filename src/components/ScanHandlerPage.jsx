import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

/*
const API_BASE = import.meta.env.PROD
  ? import.meta.env.VITE_API_PROD
  : import.meta.env.VITE_API_LOCAL;

*/

const API_BASE = import.meta.env.VITE_BACKEND_URL;

function ScanHandlerPage() {
  const { albumUUID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function handleScan() {
      //console.log("SCAN HANDLER RUNNING", albumUUID);

      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate(
          `/scan-error?message=${encodeURIComponent(
            "Please log in to scan a record."
          )}`
        );
        return;
      }

      try {
        //console.log("CALLING BACKEND /api/scan");

        const res = await fetch(`${API_BASE}/api/user/scan`, {
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
          navigate(`/scan-error?message=${encodeURIComponent(data.error)}`);
          return;
        }

        if (!res.ok) {
          navigate(
            `/scan-error?message=${encodeURIComponent(
              "Invalid or expired QR code."
            )}`
          );
          return;
        }

        navigate("/listening");
      } catch (err) {
        console.error("ScanHandler error:", err);
        navigate(
          `/scan-error?message=${encodeURIComponent(
            "Something went wrong while scanning."
          )}`
        );
      }
    }

    if (albumUUID) {
      handleScan();
    }
  }, [albumUUID, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-xl font-bold mb-2">Scanning record…</h1>
        <p>Please wait.</p>
      </div>
    </div>
  );
}

export default ScanHandlerPage;
