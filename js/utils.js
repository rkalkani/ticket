// Helper function to create HTML elements
function createElement(tag, attributes = {}, content = '') {
  const element = document.createElement(tag);
  
  // Set attributes
  for (const [key, value] of Object.entries(attributes)) {
    if (key === 'class') {
      element.className = value;
    } else if (key === 'dataset') {
      for (const [dataKey, dataValue] of Object.entries(value)) {
        element.dataset[dataKey] = dataValue;
      }
    } else {
      element.setAttribute(key, value);
    }
  }
  
  // Set content
  if (content) {
    if (typeof content === 'string') {
      element.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      element.appendChild(content);
    } else if (Array.isArray(content)) {
      content.forEach(item => {
        if (typeof item === 'string') {
          element.innerHTML += item;
        } else if (item instanceof HTMLElement) {
          element.appendChild(item);
        }
      });
    }
  }
  
  return element;
}

// Show loading state
function showLoading(container) {
  const loadingElement = createElement('div', {
    class: 'flex justify-center items-center p-12'
  }, `
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
  `);
  
  container.innerHTML = '';
  container.appendChild(loadingElement);
}

// Show error state
function showError(container, message = 'An error occurred while loading events. Please try again.') {
  const errorElement = createElement('div', {
    class: 'text-center p-12'
  }, `
    <div class="text-red-600 text-5xl mb-4">
      <i class="fas fa-exclamation-circle"></i>
    </div>
    <h3 class="text-xl font-bold text-red-600 mb-2">Oops!</h3>
    <p class="text-gray-600">${message}</p>
    <button class="btn btn-primary mt-4" id="retry-button">Retry</button>
  `);
  
  container.innerHTML = '';
  container.appendChild(errorElement);
  
  // Add retry functionality
  document.getElementById('retry-button').addEventListener('click', () => {
    window.location.reload();
  });
}

// Show empty state
function showEmpty(container, message = 'No events found. Please try different filters.') {
  const emptyElement = createElement('div', {
    class: 'text-center p-12'
  }, `
    <div class="text-gray-400 text-5xl mb-4">
      <i class="fas fa-calendar-xmark"></i>
    </div>
    <h3 class="text-xl font-bold text-gray-500 mb-2">No Results</h3>
    <p class="text-gray-600">${message}</p>
    <button class="btn btn-secondary mt-4" id="reset-filters-button">Reset Filters</button>
  `);
  
  container.innerHTML = '';
  container.appendChild(emptyElement);
  
  // Add reset filters functionality
  document.getElementById('reset-filters-button').addEventListener('click', () => {
    document.getElementById('search-input').value = '';
    document.querySelectorAll('.event-type-checkbox').forEach(checkbox => {
      checkbox.checked = false;
    });
    document.getElementById('hide-booked-checkbox').checked = false;
    
    // Trigger filter button click to reset results
    document.getElementById('filter-button').click();
  });
}

// Generate event card HTML
function generateEventCard(event) {
  const isFullyBooked = event.remaining === 0;
  
  return `
    <div class="card group hover:scale-[1.02]" data-event-id="${event.id}">
      <div class="relative overflow-hidden">
        <img src="${event.banner}" alt="${event.title}" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110">
        ${isFullyBooked ? `
          <div class="absolute top-0 right-0 bg-red-600 text-white px-4 py-1 text-sm font-semibold">
            Fully Booked
          </div>
        ` : ''}
      </div>
      <div class="p-4">
        <h3 class="text-lg font-bold truncate">${event.title}</h3>
        <div class="mt-2 flex items-center text-sm text-gray-600">
          <span class="mr-3"><i class="fas fa-map-marker-alt mr-1"></i>${event.city}</span>
          <span class="mr-3"><i class="fas fa-tag mr-1"></i>${event.eventType}</span>
          <span><i class="fas fa-calendar mr-1"></i>${formatDate(event.eventDate)}</span>
        </div>
        <div class="mt-3 flex justify-between items-center">
          <div>
            <div class="text-sm font-medium text-gray-700">
              <span class="font-semibold ${isFullyBooked ? 'text-red-600' : 'text-green-600'}">
                ${isFullyBooked ? 'No spots left' : `${event.remaining} spots left`}
              </span>
              <span class="text-xs text-gray-500 ml-1">of ${event.capacity}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div class="${isFullyBooked ? 'bg-red-600' : 'bg-green-600'} h-2 rounded-full" 
                style="width: ${Math.max(5, 100 - (event.remaining / event.capacity * 100))}%"></div>
            </div>
          </div>
          <a href="event-detail.html?id=${event.id}" 
             class="btn btn-primary text-sm py-1.5 px-3">
            ${isFullyBooked ? 'View Details' : 'Book Now'}
          </a>
        </div>
      </div>
    </div>
  `;
}

// Format date to a more readable format
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export { createElement, showLoading, showError, showEmpty, generateEventCard, formatDate };