

function PageNavigationButtons({currentPage, totalPages, setCurrentPage}){
    return(
    <div className="flex flex-row items-center gap-4 my-4">
        <button
          className="border-2 border-black rounded-lg px-4 py-1 bg-gray-200 disabled:bg-gray-200 disabled:border-black disabled:opacity-40 hover:cursor-pointer hover:border-white hover:bg-mvsCyan"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span>
          Page {currentPage} / {totalPages}
        </span>

        <button
          className="border-2 border-black rounded-lg px-4 py-1 bg-gray-200 disabled:opacity-40 hover:cursor-pointer hover:border-white hover:bg-mvsCyan"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
    </div>
      )
}

export default PageNavigationButtons