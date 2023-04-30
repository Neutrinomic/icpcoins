import { useEffect, useState } from 'react';

/**
 * Custom hook to filter and paginate proposals based on search and status filters.
 *
 * @param {Array} proposals - The list of proposals.
 * @param {string} search - The search string to filter proposals by title.
 * @param {Array} includeStatus - The list of status values to filter proposals.
 * @param {number} itemsPerPage - The number of items to show per page.
 * @returns {Object} - The filtered and paginated proposals, along with the current page and setCurrentPage function.
 */
export const useProposalsFilter = (
  proposals,
  search,
  includeStatus,
  itemsPerPage
) => {
  const [filteredProposals, setFilteredProposals] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedProposals, setPaginatedProposals] = useState([]);

  useEffect(() => {
    const results = proposals.filter(p => {
      const titleMatch = search
        ? p.title.toLowerCase().includes(search.toLowerCase())
        : true;
      const statusMatch = includeStatus.length
        ? includeStatus.includes(p.status)
        : true;

      return titleMatch && statusMatch;
    });

    setFilteredProposals(results);
  }, [search, proposals, includeStatus]);

  useEffect(() => {
    setPaginatedProposals(
      filteredProposals.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      )
    );
  }, [currentPage, filteredProposals, itemsPerPage]);

  return {
    filteredProposals,
    paginatedProposals,
    currentPage,
    setCurrentPage,
  };
};
