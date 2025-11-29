/**
 * Search Focus Experience
 * Blurs background and focuses on search when active
 */

function initSearchFocus() {
  const searchContainer = document.getElementById('search-container');
  const searchOverlay = document.getElementById('search-overlay');
  const pageContent = document.getElementById('page-content');
  
  if (!searchContainer) return;
  
  // Find the search input within the bridgetown search component
  const searchInput = searchContainer.querySelector('input[type="search"], input[type="text"], .search-input');
  
  if (!searchInput) {
    // Wait for the web component to initialize
    setTimeout(initSearchFocus, 100);
    return;
  }
  
  let isActive = false;
  
  function activateSearch() {
    if (isActive) return;
    isActive = true;
    
    searchContainer.classList.add('active');
    if (searchOverlay) searchOverlay.classList.add('active');
    if (pageContent) pageContent.classList.add('blurred');
    
    // Prevent body scroll when overlay is active
    document.body.style.overflow = 'hidden';
  }
  
  function deactivateSearch() {
    if (!isActive) return;
    
    // Don't deactivate if input has content
    if (searchInput.value.trim().length > 0) return;
    
    isActive = false;
    
    searchContainer.classList.remove('active');
    if (searchOverlay) searchOverlay.classList.remove('active');
    if (pageContent) pageContent.classList.remove('blurred');
    
    // Restore body scroll
    document.body.style.overflow = '';
  }
  
  // Focus events
  searchInput.addEventListener('focus', activateSearch);
  
  searchInput.addEventListener('blur', (e) => {
    // Delay to allow clicking on results
    setTimeout(deactivateSearch, 200);
  });
  
  // Input events - activate when typing
  searchInput.addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
      activateSearch();
    } else {
      // Small delay before deactivating on empty
      setTimeout(deactivateSearch, 100);
    }
  });
  
  // Click on overlay closes search
  if (searchOverlay) {
    searchOverlay.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.blur();
      deactivateSearch();
    });
  }
  
  // Escape key closes search
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isActive) {
      searchInput.value = '';
      searchInput.blur();
      isActive = true; // Force deactivation
      deactivateSearch();
      isActive = false;
    }
    
    // Cmd/Ctrl + K to focus search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
  });
  
  // Handle Turbo navigation
  document.addEventListener('turbo:before-render', () => {
    if (isActive) {
      isActive = true;
      deactivateSearch();
      isActive = false;
      document.body.style.overflow = '';
    }
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSearchFocus);
} else {
  initSearchFocus();
}

// Re-initialize after Turbo navigation
document.addEventListener('turbo:load', initSearchFocus);

