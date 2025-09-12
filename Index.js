function showPage(pageId) {
  // Hide all pages
  var pages = document.querySelectorAll('.page');
  pages.forEach(function(page) {
    page.classList.remove('active', 'active2'); // remove both
  });

  // Get the selected page
  var selectedPage = document.getElementById(pageId);

  // Always add .active
  selectedPage.classList.add('active');

  // If it's Main_Menu, also add .active2
  if (pageId === 'Main_Menu') {
    selectedPage.classList.add('active2');
  }
}


      function toggleFullscreen() {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        } 
      }