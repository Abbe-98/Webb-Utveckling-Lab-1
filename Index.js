    // Map routes (hashes) to section IDs
    const routes = new Set(["menu", "instructions", "scores", "settings"]);

    function show(view) {
      // Hide all
      document.querySelectorAll(".view").forEach(sec => {
        const active = sec.id === view;
        sec.classList.toggle("hidden", !active);
        sec.setAttribute("aria-hidden", String(!active));
      });
    }

    function currentRoute() {
      const hash = location.hash.replace(/^#/, "");
      return routes.has(hash) ? hash : "menu";
    }

    function navigate() {
      show(currentRoute());
    }

    // Wire up after DOM is ready (defer ensures DOM is parsed)
    document.addEventListener("DOMContentLoaded", () => {
      // Optional: make in-page links update hash without reload
      document.querySelectorAll('a[data-link="view"]').forEach(a => {
        a.addEventListener("click", (e) => {
          // Use the href’s hash as route
          const target = a.getAttribute("href")?.replace(/^#/, "");
          if (routes.has(target)) {
            // Update the hash to trigger routing
            location.hash = target;
            e.preventDefault();
          }
        });
      });

      // Initial render & subsequent hash changes
      navigate();
      window.addEventListener("hashchange", navigate);
    });