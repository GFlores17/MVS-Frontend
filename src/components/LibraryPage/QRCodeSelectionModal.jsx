import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function QRCodeSelectionModal({
  isOpen,
  records,
  setQrModalOpen
}) {

  const baseURLinUse = import.meta.env.VITE_BACKEND_URL;
  const { session } = useAuth();

  async function confirmQrSelection(albumUUIDs) {
    const res = await fetch(`${baseURLinUse}/api/labels/qrcodes_only`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ albumUUIDs }),
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    window.open(url, "_blank");

    setQrModalOpen(false);
  }

  async function confirmCompactQrSelection(albumUUIDs) {
    const res = await fetch(`${baseURLinUse}/api/labels/compact_qrcodes_only`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ albumUUIDs }),
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    window.open(url, "_blank");
  }

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(records);
  const [selected, setSelected] = useState(new Set());

  const [downloading, setDownloading] = useState(false);
  const [layout, setLayout] = useState("pretty"); // "pretty" | "compact"


  useEffect(() => {
    setFiltered(records);
  }, [records]);

  function applySearch() {
    if (!search.trim()) {
      setFiltered(records);
      return;
    }

    const q = search.toLowerCase();

    setFiltered(
      records.filter(r =>
        r.albumTitle.toLowerCase().includes(q) ||
        r.albumArtists.map(a => a.name.toLowerCase()).join(" ").includes(q) ||
        String(r.albumReleaseID).includes(q)
      )
    );
  }

  function toggle(uuid) {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(uuid) ? next.delete(uuid) : next.add(uuid);
      return next;
    });
  }

  function toggleSelectAllListed() {
    setSelected(prev => {
      const next = new Set(prev);
  
      const allListedSelected = filtered.every(r =>
        next.has(r.albumUUID)
      );
  
      if (allListedSelected) {
        // Unselect all listed
        filtered.forEach(r => next.delete(r.albumUUID));
      } else {
        // Select all listed
        filtered.forEach(r => next.add(r.albumUUID));
      }
  
      return next;
    });
  }
  

  function selectAllRecords() {
    setSelected(new Set(records.map(r => r.albumUUID)));
  }

  function clearSelections() {
    setSelected(new Set());
  }
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-11/12 max-w-3xl max-h-[85vh] border-4 border-black rounded-lg flex flex-col">

        {/* Header */}
        <div className="p-4 border-b-2 border-black">
          <h2 className="text-2xl font-bold">Select Albums</h2>
          <p className="italic text-sm">
            Pick which albums to print QR codes for
          </p>
        </div>

        {/* Controls */}
        <div className="p-4 flex flex-col md:flex-row gap-2 border-b-2 border-black">
            
          <input
            className="border-2 border-black rounded px-2 py-1 flex-1"
            placeholder="Search albums…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <button
            onClick={applySearch}
            className="border-2 border-black rounded px-3 hover:bg-green-300"
          >
            Search
          </button>

          <button
            onClick={clearSelections}
            className="border-2 border-black rounded px-3 hover:bg-red-200"
            >
            Clear Selections
            </button>

            <button
            onClick={toggleSelectAllListed}
            className="border-2 border-black rounded px-3 bg-blue-200 hover:bg-blue-300"
            >
            Select All Listed
            </button>


          

        </div>

        {/* Layout selector */}
        <div className="px-4 py-2 border-b-2 border-black flex flex-row justify-center items-center gap-4">
          <div className="font-bold ">Layout: </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="qr-layout"
                value="pretty"
                checked={layout === "pretty"}
                onChange={(e) => setLayout(e.target.value)}
              />
              <span>Pretty Layout</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="qr-layout"
                value="compact"
                checked={layout === "compact"}
                onChange={(e) => setLayout(e.target.value)}
              />
              <span>Compact Layout</span>
            </label>
          </div>
        </div>



        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
  {filtered.length === 0 ? (
    <div className="text-center italic text-gray-600 mt-8">
      No results found
    </div>
  ) : (
    filtered.map(r => (
      <label
        key={r.albumUUID}
        className="flex gap-3 items-start border-b py-2 cursor-pointer"
      >
        <input
          type="checkbox"
          checked={selected.has(r.albumUUID)}
          onChange={() => toggle(r.albumUUID)}
        />

        <div>
          <div className="font-bold">{r.albumTitle}</div>
          <div className="text-sm">
            {r.albumArtists.map(a => a.name).join(", ")}
          </div>
          <div className="text-sm">
            {r?.albumFormats[0]?.text} {r?.albumFormats[0]?.name}
          </div>
          <div className="text-sm">
            Release ID: {r?.albumReleaseID}
          </div>
        </div>
      </label>
    ))
  )}
        </div>


        {/* Footer */}
        <div className="p-4 border-t-2 border-black flex justify-end gap-4">

        <div className="text-sm italic">
            Selected {selected.size} / {records.length} albums
            </div>

          <button
            onClick={()=>setQrModalOpen(false)}
            className="border-2 border-black rounded px-4 py-2 hover:bg-red-200"
          >
            Cancel
          </button>

          <button
            disabled={selected.size === 0 || downloading}
            onClick={async () => {
              setDownloading(true);

              const albumUUIDs = Array.from(selected);

              if (layout === "pretty") {
                await confirmQrSelection(albumUUIDs);
              } else {
                await confirmCompactQrSelection(albumUUIDs);
              }

              setDownloading(false);
            }}
            className="border-2 border-black rounded px-4 py-2 bg-green-300 disabled:opacity-40"
          >
            {downloading
              ? "Generating PDF…"
              : `OK (${layout === "pretty" ? "Pretty" : "Compact"})`}
          </button>


        </div>

      </div>
    </div>
  );
}

export default QRCodeSelectionModal;
