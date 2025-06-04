// Mock data for events
const events = [
  {
    id: 1,
    title: "Annual Tech Conference",
    description: "Join us for the biggest tech conference of the year featuring keynotes from industry leaders.",
    banner: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    city: "San Francisco",
    eventType: "Conference",
    eventDate: "2025-08-15",
    capacity: 500,
    remaining: 125
  },
  {
    id: 2,
    title: "Music Festival",
    description: "Three days of amazing music featuring top artists from around the world.",
    banner: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    city: "Austin",
    eventType: "Festival",
    eventDate: "2025-07-10",
    capacity: 2000,
    remaining: 0
  },
  {
    id: 3,
    title: "Art Exhibition",
    description: "Contemporary art exhibition showcasing works from emerging artists.",
    banner: "https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    city: "New York",
    eventType: "Exhibition",
    eventDate: "2025-09-05",
    capacity: 300,
    remaining: 75
  },
  {
    id: 4,
    title: "Food & Wine Tasting",
    description: "Experience gourmet cuisine paired with fine wines from local vintners.",
    banner: "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    city: "Napa Valley",
    eventType: "Food",
    eventDate: "2025-06-20",
    capacity: 150,
    remaining: 30
  },
  {
    id: 5,
    title: "Marathon for Charity",
    description: "Run for a cause in this annual charity marathon. All proceeds go to children's education.",
    banner: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    city: "Chicago",
    eventType: "Sports",
    eventDate: "2025-10-12",
    capacity: 1000,
    remaining: 200
  },
  {
    id: 6,
    title: "Business Leadership Summit",
    description: "Network with top executives and learn leadership strategies for the modern business landscape.",
    banner: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    city: "Boston",
    eventType: "Conference",
    eventDate: "2025-11-05",
    capacity: 400,
    remaining: 0
  },
  {
    id: 7,
    title: "Indie Film Festival",
    description: "Showcasing independent films from emerging directors and screenwriters.",
    banner: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    city: "Los Angeles",
    eventType: "Festival",
    eventDate: "2025-09-20",
    capacity: 800,
    remaining: 350
  },
  {
    id: 8,
    title: "Comic Convention",
    description: "The ultimate fan experience with celebrity guests, panels, and exclusive merchandise.",
    banner: "https://images.pexels.com/photos/1535907/pexels-photo-1535907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    city: "San Diego",
    eventType: "Convention",
    eventDate: "2025-07-25",
    capacity: 5000,
    remaining: 1200
  },
  {
    id: 9,
    title: "Classical Music Concert",
    description: "An evening of Beethoven's most celebrated works performed by the city symphony.",
    banner: "https://images.pexels.com/photos/2191615/pexels-photo-2191615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    city: "Vienna",
    eventType: "Concert",
    eventDate: "2025-08-30",
    capacity: 600,
    remaining: 150
  },
  {
    id: 10,
    title: "Craft Beer Festival",
    description: "Sample over 100 craft beers from local and national breweries.",
    banner: "https://images.pexels.com/photos/1269025/pexels-photo-1269025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    city: "Portland",
    eventType: "Festival",
    eventDate: "2025-06-05",
    capacity: 1200,
    remaining: 300
  },
  {
    id: 11,
    title: "Startup Pitch Competition",
    description: "Innovative startups compete for investment opportunities and mentorship.",
    banner: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    city: "Seattle",
    eventType: "Business",
    eventDate: "2025-10-25",
    capacity: 200,
    remaining: 80
  },
  {
    id: 12,
    title: "Yoga Retreat",
    description: "A weekend of yoga, meditation, and wellness activities in a serene natural setting.",
    banner: "https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    city: "Sedona",
    eventType: "Wellness",
    eventDate: "2025-05-15",
    capacity: 50,
    remaining: 10
  }
];

// Get all unique event types
function getEventTypes() {
  return [...new Set(events.map(event => event.eventType))];
}

// Filter events based on search text, selected types, and hide fully booked setting
function filterEvents(searchText, selectedTypes, hideFullyBooked, page = 1, limit = 6) {
  const offset = (page - 1) * limit;
  
  let filtered = [...events];
  
  // Apply search filter
  if (searchText) {
    const searchLower = searchText.toLowerCase();
    filtered = filtered.filter(event => 
      event.title.toLowerCase().includes(searchLower) ||
      event.description.toLowerCase().includes(searchLower) ||
      event.city.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply event type filter
  if (selectedTypes.length > 0) {
    filtered = filtered.filter(event => selectedTypes.includes(event.eventType));
  }
  
  // Apply hide fully booked filter
  if (hideFullyBooked) {
    filtered = filtered.filter(event => event.remaining > 0);
  }
  
  // Calculate total pages for pagination
  const totalPages = Math.ceil(filtered.length / limit);
  
  // Apply pagination
  const paginatedEvents = filtered.slice(offset, offset + limit);
  
  return {
    events: paginatedEvents,
    total: filtered.length,
    totalPages
  };
}

// Get event by ID
function getEventById(id) {
  return events.find(event => event.id === parseInt(id));
}

// Format date to a more readable format (e.g., "August 15, 2025")
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export { events, getEventTypes, filterEvents, getEventById, formatDate };