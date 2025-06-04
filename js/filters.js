import { getEventTypes, filterEvents } from './events.js';
import { showLoading, showError, showEmpty, generateEventCard } from './utils.js';

// Initialize filters
function initFilters() {
  const searchInput = document.getElementById('search-input');
  const eventTypesContainer = document.getElementById('event-types-container');
  const hideBookedCheckbox = document.getElementById('hide-booked-checkbox');
  const filterButton = document.getElementById('filter-button');
  const resetButton = document.getElementById('reset-button');
  const eventsContainer = document.getElementById('events-container');
  const paginationContainer = document.getElementById('pagination-container');
  
  let currentPage = 1;
  const eventsPerPage = 6;
  let currentFilters = {
    searchText: '',
    selectedTypes: [],
    hideFullyBooked: false
  };
  
  // Populate event types checkboxes
  const eventTypes = getEventTypes();
  eventTypes.forEach(type => {
    const checkboxWrapper = document.createElement('div');
    checkboxWrapper.className = 'flex items-center mb-2';
    checkboxWrapper.innerHTML = `
      <input id="type-${type}" type="checkbox" class="event-type-checkbox checkbox" value="${type}">
      <label for="type-${type}" class="ml-2 text-sm text-gray-700">${type}</label>
    `;
    eventTypesContainer.appendChild(checkboxWrapper);
  });
  
  // Apply filters when filter button is clicked
  filterButton.addEventListener('click', () => {
    // Get search text
    currentFilters.searchText = searchInput.value.trim();
    
    // Get selected event types
    currentFilters.selectedTypes = Array.from(document.querySelectorAll('.event-type-checkbox:checked')).map(checkbox => checkbox.value);
    
    // Get hide fully booked setting
    currentFilters.hideFullyBooked = hideBookedCheckbox.checked;
    
    // Reset to first page when filters change
    currentPage = 1;
    
    // Apply filters
    applyFilters();
  });
  
  // Reset filters when reset button is clicked
  resetButton.addEventListener('click', () => {
    searchInput.value = '';
    document.querySelectorAll('.event-type-checkbox').forEach(checkbox => {
      checkbox.checked = false;
    });
    hideBookedCheckbox.checked = false;
    
    currentFilters = {
      searchText: '',
      selectedTypes: [],
      hideFullyBooked: false
    };
    
    currentPage = 1;
    
    applyFilters();
  });
  
  // Function to apply filters and update events
  function applyFilters() {
    showLoading(eventsContainer);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        const { events, total, totalPages } = filterEvents(
          currentFilters.searchText,
          currentFilters.selectedTypes,
          currentFilters.hideFullyBooked,
          currentPage,
          eventsPerPage
        );
        
        // Show empty state if no events
        if (events.length === 0) {
          showEmpty(eventsContainer);
          paginationContainer.innerHTML = '';
          return;
        }
        
        // Render events
        renderEvents(events);
        
        // Update pagination
        renderPagination(totalPages);
        
        // Show result count
        const resultCountElement = document.getElementById('result-count');
        resultCountElement.textContent = `Showing ${events.length} of ${total} events`;
      } catch (error) {
        console.error('Error applying filters:', error);
        showError(eventsContainer);
        paginationContainer.innerHTML = '';
      }
    }, 500); // Simulate network delay
  }
  
  // Render events
  function renderEvents(events) {
    eventsContainer.innerHTML = '';
    
    const eventsGrid = document.createElement('div');
    eventsGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    
    events.forEach(event => {
      const eventCardHTML = generateEventCard(event);
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = eventCardHTML;
      eventsGrid.appendChild(tempDiv.firstElementChild);
    });
    
    eventsContainer.appendChild(eventsGrid);
  }
  
  // Render pagination
  function renderPagination(totalPages) {
    paginationContainer.innerHTML = '';
    
    if (totalPages <= 1) {
      return;
    }
    
    const pagination = document.createElement('div');
    pagination.className = 'flex justify-center mt-8 space-x-2';
    
    // Previous button
    const prevButton = document.createElement('button');
    prevButton.className = `btn ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'btn-secondary'}`;
    prevButton.textContent = 'Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        applyFilters();
      }
    });
    
    // Next button
    const nextButton = document.createElement('button');
    nextButton.className = `btn ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'btn-secondary'}`;
    nextButton.textContent = 'Next';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        applyFilters();
      }
    });
    
    // Page numbers
    const pageNumbers = document.createElement('div');
    pageNumbers.className = 'flex space-x-2';
    
    // Determine which page numbers to show
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement('button');
      pageButton.className = i === currentPage 
        ? 'btn btn-primary' 
        : 'btn bg-gray-200 text-gray-700 hover:bg-gray-300';
      pageButton.textContent = i;
      pageButton.addEventListener('click', () => {
        if (i !== currentPage) {
          currentPage = i;
          applyFilters();
        }
      });
      pageNumbers.appendChild(pageButton);
    }
    
    pagination.appendChild(prevButton);
    pagination.appendChild(pageNumbers);
    pagination.appendChild(nextButton);
    
    paginationContainer.appendChild(pagination);
  }
  
  // Initial load of events
  applyFilters();
}

export { initFilters };