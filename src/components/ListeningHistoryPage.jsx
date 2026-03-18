// CompleteListeningHistory.jsx
import { useMemo, useState } from "react";
import ListeningSessionContainer from "./ListeningHistoryPage/ListeningSessionContainer";

function getDayKey(date) {
  // Stable day key in UTC (prevents locale drift)
  return date.toISOString().slice(0, 10); // "2025-12-31"
}

function groupByDay(listeningHistory) {
  const groups = [];
  let currentDayKey = null;
  let currentGroup = null;

  for (const entry of listeningHistory) {
    const dateObj = new Date(entry.playTimestamp);
    const dayKey = getDayKey(dateObj);

    if (dayKey !== currentDayKey) {
      currentDayKey = dayKey;
      currentGroup = {
        dayKey,
        date: dateObj, // keep a Date for formatting the header
        items: [],
      };
      groups.push(currentGroup);
    }

    currentGroup.items.push(entry);
  }

  return groups;
}

function paginateListens(listeningHistory, page, pageSize = 10) {
  const start = page * pageSize;
  const end = start + pageSize;
  return listeningHistory.slice(start, end);
}

function getPaginatedDayGroups(listeningHistory, page, pageSize = 10) {
  const pageSlice = paginateListens(listeningHistory, page, pageSize);
  return groupByDay(pageSlice);
}

function ListeningHistoryPage({
  completeListeningHistory = [],
  recordsList = [],
  buttonToMainMenuHandler,
}) {
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 10;

  const orderedHistory = useMemo(() => {
    return [...completeListeningHistory].reverse();
  }, [completeListeningHistory]);

  // Map albumUUID -> record data (from recordsList)
  const recordsMap = useMemo(() => {
    const map = new Map();

    recordsList.forEach((record) => {
      if (!map.has(record.albumUUID)) map.set(record.albumUUID, record);
    });
    return map;
  }, [recordsList]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(completeListeningHistory.length / PAGE_SIZE));
  }, [completeListeningHistory.length]);

  // Clamp page if history size changes
  const safePage = Math.min(page, totalPages - 1);

  const paginatedGroups = useMemo(() => {
    return getPaginatedDayGroups(orderedHistory, safePage, PAGE_SIZE);
  }, [completeListeningHistory, safePage]);

  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <div className="bg-mvsBackgroundColor container mx-auto px-4 max-w-screen min-h-screen">
      <h1 className="font-oxanium pt-20 w-full text-xl font-bold text-center">
        Listening History
      </h1>

      {/* Pagination controls (top) */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          className={`border-2 border-black rounded-lg px-4 py-1 bg-gray-200 disabled:opacity-40 hover:cursor-pointer hover:border-white hover:bg-mvsCyan`}
          onClick={goPrev}
          disabled={safePage === 0}
        >
          Prev
        </button>

        <span>
          Page {safePage + 1} of {totalPages}
        </span>

        <button
          className={`border-2 border-black rounded-lg px-4 py-1 bg-gray-200 disabled:opacity-40 hover:cursor-pointer hover:border-white hover:bg-mvsCyan`}
          onClick={goNext}
          disabled={safePage >= totalPages - 1}
        >
          Next
        </button>
      </div>

      {/* Page content: grouped by day */}
      {paginatedGroups.map((group) => (
        <div
          key={group.dayKey}
          className="flex flex-col md:w-full xl:px-64 lg:px-32 md:px-16 px-2 justify-start md:justify-center md: items-center mx-4"
        >
          {/* Date header */}
          <h2 className="text-lg md:text-2xl font-bold px-2 py-2 text-gray-500 md:w-full md:ml-90">
            {group.date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </h2>

          {/* Items for that day */}
          {group.items.map((record, index) => {
            const album = recordsMap.get(record.albumUUID);

            // If for some reason the album isn't in recordsList yet, skip safely
            if (!album) return null;

            return (
              <ListeningSessionContainer record={record} album={album} index={index}/>
            );
          })}
        </div>
      ))}

      {/* Pagination controls (bottom) */}
      <div className="flex justify-center items-center gap-4 py-4">
        <button
          className="border-2 border-black rounded-lg px-4 py-1 bg-gray-200 disabled:opacity-40 hover:cursor-pointer hover:border-white hover:bg-mvsCyan"
          onClick={goPrev}
          disabled={safePage === 0}
        >
          Prev
        </button>

        <span>
          Page {safePage + 1} of {totalPages}
        </span>

        <button
          className="border-2 border-black rounded-lg px-4 py-1 bg-gray-200 disabled:opacity-40 hover:cursor-pointer hover:border-white hover:bg-mvsCyan"
          onClick={goNext}
          disabled={safePage >= totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ListeningHistoryPage;
