import React from 'react'

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

    const nextPage = () => {
        if (currentPage !== nPages) setCurrentPage(currentPage + 1);
    };
    const prevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
    };
    return (
        <nav>
            <ul className="flex items-center -space-x-px mt-5 justify-end">
                <li>
                    <a href="#"
                        className="block px-3 py-2 ml-0 leading-tight text-gray-500 
                            bg-teal-500 border border-gray-300 rounded-l-lg hover:bg-teal-400 
                            hover:text-gray-700"
                        onClick={prevPage}
                    >
                        <span className="sr-only">Previous</span>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd">
                            </path>
                        </svg>
                    </a>
                </li>
                {pageNumbers.map((pgNumber) => (
                    <li
                        key={pgNumber}
                        className={currentPage == pgNumber ? "active" : ""}
                    >
                        <a
                            onClick={() => setCurrentPage(pgNumber)}
                            className="px-3 py-2 leading-tight text-gray-500 
                                bg-teal-500 border border-gray-300 hover:bg-teal-400 
                                hover:text-gray-700"
                            href="#"
                        >
                            {pgNumber}
                        </a>
                    </li>
                ))}
                <li>
                    <a href="#"
                        className="block px-3 py-2 leading-tight text-gray-500 bg-teal-500 border 
                            border-gray-300 rounded-r-lg hover:bg-teal-400 hover:text-gray-700"
                        onClick={nextPage}
                    >
                        <span className="sr-only">Next</span>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd">
                            </path>
                        </svg>
                    </a>
                </li>
            </ul>
        </nav>

    );
}

export default Pagination;