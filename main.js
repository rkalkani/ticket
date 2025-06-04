import './style.css';
import { initFilters } from './js/filters.js';
import { initEventDetail } from './js/event-detail.js';

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check which page we're on
  const isDetailPage = window.location.pathname.includes('event-detail.html');
  
  if (isDetailPage) {
    // Initialize event detail page
    initEventDetail();
  } else {
    // Initialize events listing page
    initFilters();
  }
});