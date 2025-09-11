    function showPage(pageId) {
      // Hide all pages
      var pages = document.querySelectorAll('.page');
      pages.forEach(function(page) {
        page.classList.remove('active');
      });

      // Show the selected page
      document.getElementById(pageId).classList.add('active');
      }