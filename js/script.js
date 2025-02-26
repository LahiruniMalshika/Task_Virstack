document.addEventListener("DOMContentLoaded", function () {
    const pageIndicators = document.querySelectorAll(".page-indicator");
    const openModalBtn = document.getElementById("modalTrigger");
    const modal = document.getElementById("modal");
    const nextModalBtn = document.getElementById("nextBtn");
    const dynamicContent = document.getElementById("dynamicSection");
  
    let currentIndex = 0;
    let checkedRows = {};
    const screens = [
      "modalSectionOne.html",
      "modalSectionTwo.html",
      "modalSectionThree.html",
    ];
  
    function updateMiddleSection() {
      dynamicContent.innerHTML = "<p>Loading...</p>";
      fetch(`../html/${screens[currentIndex]}`)
        .then((response) => response.text())
        .then((data) => {
          dynamicContent.innerHTML = data;
          if (currentIndex === 0) initializemodalSectionOne();
          else if (currentIndex === 1) initializemodalSectionTwo();
        })
        .catch(() => {
          dynamicContent.innerHTML = "<p>Error loading content.</p>";
        });
  
      nextModalBtn.textContent = currentIndex === 2 ? "Create Job" : "Next";
      pageIndicators.forEach((el, i) =>
        el.classList.toggle("page-indicator-active", i === currentIndex)
      );
    }
  
    openModalBtn?.addEventListener("click", () => {
      modal.style.display = "flex";
      updateMiddleSection();
    });
  
    nextModalBtn?.addEventListener("click", () => {
      if (currentIndex < 2) {
        currentIndex++;
        updateMiddleSection();
      } else {
        modal.style.display = "none";
        location.reload();
      }
    });
  
    function initializemodalSectionOne() {
      const tableData = [
        {
          organization: "Bank of America",
          code: "SAFW",
          handler: "Savannah Nguyen",
        },
        { organization: "Google", code: "GOGL", handler: "Michael Johnson" },
        { organization: "Apple Inc", code: "APLQ", handler: "Emily Roberts" },
        { organization: "Microsoft", code: "MSFT", handler: "David Thompson" },
        { organization: "Amazon", code: "AMZN", handler: "Jessica Andersa" },
        { organization: "Facebook", code: "FBLK", handler: "Christopher" },
        { organization: "Netflix", code: "NFLX", handler: "Isabella" },
        { organization: "LinkedIn", code: "LNKD", handler: "Benjamin" },
        { organization: "Salesforce", code: "CRM", handler: "Jack" },
        { organization: "Stripe", code: "STRP", handler: "Grace" },
        { organization: "PayPal", code: "PYPL", handler: "Ethan" },
        { organization: "Square", code: "SQ", handler: "Ava" },
        { organization: "Uber", code: "UBER", handler: "Mia" },
        { organization: "Airbnb", code: "ABNB", handler: "Lucas" },
        { organization: "Slack", code: "WORK", handler: "Amos" },
        { organization: "Zoom", code: "ZM", handler: "Lily" },
        { organization: "Twitter", code: "TWTR", handler: "Mason" },
        { organization: "Snapchat", code: "SNAP", handler: "Olivia" },
        { organization: "Pinterest", code: "PINS", handler: "Henry" },
        { organization: "Spotify", code: "SPTF", handler: "Emma" },
        { organization: "IBM", code: "IBM", handler: "Oliver" },
        { organization: "Adobe", code: "ADBE", handler: "Charlotte" },
        { organization: "Tesla", code: "TSLA", handler: "Liam" },
      ]; // Your table data
  
      const rowsPerPage = 5;
      let currentPage = 1;
  
      function renderTable(filteredData) {
        const tableBody = document.getElementById("tableBody");
  
        tableBody.innerHTML = "";
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedData = filteredData.slice(start, end);
        paginatedData.forEach((item) => {
          const row = document.createElement("div");
          row.classList.add("table-row");
          row.innerHTML = `
                    <span><input type="checkbox" data-code="${item.code}" ${
            checkedRows[item.code] ? "checked" : ""
          }></span>
                    <span>${item.organization}</span>
                    <span>${item.code}</span>
                    <span>${item.handler}</span>`;
          tableBody.appendChild(row);
        });
        document.getElementById("pageNo").textContent = `${start + 1}-${Math.min(
          end,
          filteredData.length
        )} of ${filteredData.length}`;
        addCheckboxListeners();
      }
  
      function addCheckboxListeners() {
        document
          .querySelectorAll("input[type='checkbox']")
          .forEach((checkbox) => {
            checkbox.addEventListener("change", (event) => {
              checkedRows[event.target.dataset.code] = event.target.checked;
            });
          });
      }
  
      const searchInput = document.getElementById("keyword");
      const clearBtn = document.getElementById("clearBtn");
  
      document.getElementById("keyword").addEventListener("input", (event) => {
        const keyword = event.target.value.toLowerCase();
        const filteredData = tableData.filter((item) =>
          item.organization.toLowerCase().includes(keyword)
        );
  
        currentPage = 1;
        renderTable(filteredData);
  
        if (keyword) {
          clearBtn.classList.add("show");
        } else {
          clearBtn.classList.remove("show");
        }
      });
  
      clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        currentPage = 1;
        renderTable(tableData);
      });
  
      document.getElementById("firstBtn").addEventListener("click", () => {
        currentPage = 1;
        renderTable(tableData);
      });
      document.getElementById("prevBtn").addEventListener("click", () => {
        if (currentPage > 1) currentPage--;
        renderTable(tableData);
      });
      document.getElementById("nextBtn").addEventListener("click", () => {
        if (currentPage < Math.ceil(tableData.length / rowsPerPage))
          currentPage++;
        renderTable(tableData);
      });
      document.getElementById("lastBtn").addEventListener("click", () => {
        currentPage = Math.ceil(tableData.length / rowsPerPage);
        renderTable(tableData);
      });
  
      renderTable(tableData);
    }
  
    function initializemodalSectionTwo() {
      const dropdown = document.getElementById("templateDropdownMenu");
      const template1Content = document.getElementById("template1Content");
      if (!dropdown || !template1Content) return;
      template1Content.classList.add("hidden-content");
      dropdown.addEventListener("change", function () {
        template1Content.classList.toggle(
          "hidden-content",
          this.value !== "temp1"
        );
      });
    }
  });
  