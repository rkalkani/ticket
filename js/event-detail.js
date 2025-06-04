import { getEventById, formatDate } from './events.js';
import { showError } from './utils.js';

// Initialize event detail page
function initEventDetail() {
  const eventDetailContainer = document.getElementById('event-detail-container');
  
  // Get event ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('id');
  
  if (!eventId) {
    showError(eventDetailContainer, 'No event ID provided. Please go back to the events page.');
    return;
  }
  
  // Get event by ID
  const event = getEventById(parseInt(eventId));
  
  if (!event) {
    showError(eventDetailContainer, 'Event not found. Please go back to the events page.');
    return;
  }
  
  // Render event details
  renderEventDetail(event);
}

// Render event details
function renderEventDetail(event) {
  const eventDetailContainer = document.getElementById('event-detail-container');
  const isFullyBooked = event.remaining === 0;
  
  eventDetailContainer.innerHTML = `
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="relative">
        <img src="${event.banner}" alt="${event.title}" class="w-full h-80 object-cover">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex items-end">
          <div class="p-6 text-white">
            <h1 class="text-3xl font-bold">${event.title}</h1>
            <div class="mt-2 flex flex-wrap items-center text-sm">
              <span class="mr-4 flex items-center"><i class="fas fa-map-marker-alt mr-1"></i>${event.city}</span>
              <span class="mr-4 flex items-center"><i class="fas fa-tag mr-1"></i>${event.eventType}</span>
              <span class="flex items-center"><i class="fas fa-calendar mr-1"></i>${formatDate(event.eventDate)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="p-6">
        <div class="mb-6">
          <h2 class="text-xl font-bold mb-2">About this event</h2>
          <p class="text-gray-700">${event.description}</p>
        </div>
        
        <div class="mb-6">
          <h2 class="text-xl font-bold mb-2">Event Details</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-sm text-gray-500">Date</div>
              <div class="font-medium">${formatDate(event.eventDate)}</div>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-sm text-gray-500">Location</div>
              <div class="font-medium">${event.city}</div>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-sm text-gray-500">Event Type</div>
              <div class="font-medium">${event.eventType}</div>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-sm text-gray-500">Capacity</div>
              <div class="font-medium">${event.capacity} spots total</div>
            </div>
          </div>
        </div>
        
        <div class="mb-6">
          <h2 class="text-xl font-bold mb-2">Availability</h2>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex justify-between items-center mb-2">
              <span class="font-medium ${isFullyBooked ? 'text-red-600' : 'text-green-600'}">
                ${isFullyBooked ? 'Fully Booked' : `${event.remaining} spots available`}
              </span>
              <span class="text-sm text-gray-500">out of ${event.capacity}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="${isFullyBooked ? 'bg-red-600' : 'bg-green-600'} h-2 rounded-full" 
                style="width: ${Math.max(5, 100 - (event.remaining / event.capacity * 100))}%"></div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-between items-center">
          <a href="index.html" class="btn bg-gray-200 text-gray-700 hover:bg-gray-300">
            <i class="fas fa-arrow-left mr-1"></i> Back to Events
          </a>
          ${isFullyBooked ? 
            `<button disabled class="btn bg-gray-300 text-gray-500 cursor-not-allowed">
              Fully Booked
            </button>` : 
            `<button class="btn btn-primary">
              Book Now <i class="fas fa-arrow-right ml-1"></i>
            </button>`
          }
        </div>
      </div>
    </div>
  `;
}

export { initEventDetail };