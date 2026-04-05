
let savedRole = localStorage.getItem("currentRole");
let currentRole = savedRole ? savedRole : "admin";

// FINDING ELEMENTS

let hamburgerBtn = document.getElementById("hamburgerBtn");
let mobileMenu = document.getElementById("mobileMenu");
let roleBadge = document.getElementById("roleBadge");
let roleSwitcher = document.getElementById("roleSwitcher");
let roleSwitcherMobile = document.getElementById("roleSwitcherMobile");


// HELPER: Format Currency

function formatCurrency(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}


// HELPER: Format Date

function formatDate(dateString) {
  let date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}


// HAMBURGER MENU (works on all pages)

function toggleMobileMenu() {
  mobileMenu.classList.toggle("hidden");
}

hamburgerBtn.addEventListener("click", toggleMobileMenu);


// ROLE SWITCHER (works on all pages)

function updateRoleBadge() {
  if (currentRole === "admin") {
    roleBadge.textContent = "Admin Mode — You can add and edit transactions";
    roleBadge.className = "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700";
  } else {
    roleBadge.textContent = "Viewer Mode — Read only access";
    roleBadge.className = "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700";
  }
}

// Save role to localStorage
function saveRole() {
  localStorage.setItem("currentRole", currentRole);
}

// Runs when role changes
function onRoleChange() {
  saveRole();

  // Update Add button visibility on transactions page
  let addBtn = document.getElementById("addTransactionBtn");
  if (addBtn) {
    if (currentRole === "admin") {
      addBtn.classList.remove("hidden");
    } else {
      addBtn.classList.add("hidden");
    }
  }

  // Re-render transactions if on that page
  if (document.getElementById("transactionsList")) {
    renderTransactions();
  }
}

// Desktop role switcher
if (roleSwitcher) {
  roleSwitcher.value = currentRole;

  roleSwitcher.addEventListener("change", function () {
    currentRole = this.value;
    if (roleSwitcherMobile) {
      roleSwitcherMobile.value = currentRole;
    }
    updateRoleBadge();
    onRoleChange();
  });
}

// Mobile role switcher
if (roleSwitcherMobile) {
  roleSwitcherMobile.value = currentRole;

  roleSwitcherMobile.addEventListener("change", function () {
    currentRole = this.value;
    if (roleSwitcher) {
      roleSwitcher.value = currentRole;
    }
    updateRoleBadge();
    onRoleChange();
  });
}

// Update badge when page loads
updateRoleBadge();


// DASHBOARD PAGE CODE

let balanceElement = document.getElementById("balanceAmount");

if (balanceElement) {

  console.log("Dashboard page loaded");


  // ----- Calculate and show Summary Cards -----
  function calculateSummary() {

    let totalIncome = 0;
    let totalExpense = 0;

    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].type === "income") {
        totalIncome = totalIncome + transactions[i].amount;
      } else if (transactions[i].type === "expense") {
        totalExpense = totalExpense + transactions[i].amount;
      }
    }

    let totalBalance = totalIncome - totalExpense;

    let savingsRate = 0;
    if (totalIncome > 0) {
      savingsRate = Math.round((totalBalance / totalIncome) * 100);
    }

    document.getElementById("balanceAmount").textContent = formatCurrency(totalBalance);
    document.getElementById("incomeAmount").textContent = formatCurrency(totalIncome);
    document.getElementById("expenseAmount").textContent = formatCurrency(totalExpense);
    document.getElementById("savingsRate").textContent = savingsRate + "%";

    // Balance color: blue if positive, red if negative
    if (totalBalance < 0) {
      document.getElementById("balanceAmount").classList.remove("text-blue-600");
      document.getElementById("balanceAmount").classList.add("text-red-500");
    } else {
      document.getElementById("balanceAmount").classList.remove("text-red-500");
      document.getElementById("balanceAmount").classList.add("text-blue-600");
    }
  }


  // ----- Monthly Income vs Expense Bar Chart -----
  function drawMonthlyChart() {

    let monthlyChart = document.getElementById("dashboardMonthlyChart");

    // Step 1: Group transactions by month
    let months = {};
    for (let i = 0; i < transactions.length; i++) {
      let t = transactions[i];

      // "2025-01-03" → "2025-01"
      let monthKey = t.date.substring(0, 7);

      if (!months[monthKey]) {
        months[monthKey] = { income: 0, expense: 0 };
      }

      if (t.type === "income") {
        months[monthKey].income = months[monthKey].income + t.amount;
      } else {
        months[monthKey].expense = months[monthKey].expense + t.amount;
      }
    }

    // Step 2: Sort months oldest to newest
    let monthKeys = Object.keys(months).sort();

    // Step 3: Find biggest value to calculate bar heights
    let maxValue = 0;
    for (let i = 0; i < monthKeys.length; i++) {
      let data = months[monthKeys[i]];
      if (data.income > maxValue) maxValue = data.income;
      if (data.expense > maxValue) maxValue = data.expense;
    }

    // Step 4: Build bars HTML
    let html = "";

    for (let i = 0; i < monthKeys.length; i++) {
      let month = monthKeys[i];
      let data = months[month];

      // Get short month name like "Jan", "Feb"
      let monthName = new Date(month + "-01").toLocaleDateString("en-IN", { month: "short" });

      // Height as percentage of max value
      let incomeHeight = maxValue > 0 ? Math.round((data.income / maxValue) * 100) : 0;
      let expenseHeight = maxValue > 0 ? Math.round((data.expense / maxValue) * 100) : 0;

      html = html + `
        <div class="flex-1 flex flex-col items-center">

          <!-- Income and Expense bars side by side -->
          <div class="flex items-end gap-1 w-full h-40">

            <!-- Income bar (green) -->
            <div class="flex-1 flex flex-col items-center justify-end h-full">
              <div
                class="w-full rounded-t-md bg-green-500 hover:bg-green-600 cursor-pointer transition-all duration-700"
                style="height: ${incomeHeight}%"
                title="Income: ${formatCurrency(data.income)}"
              ></div>
            </div>

            <!-- Expense bar (red) -->
            <div class="flex-1 flex flex-col items-center justify-end h-full">
              <div
                class="w-full rounded-t-md bg-red-400 hover:bg-red-500 cursor-pointer transition-all duration-700"
                style="height: ${expenseHeight}%"
                title="Expense: ${formatCurrency(data.expense)}"
              ></div>
            </div>

          </div>

          <!-- Month label below bars -->
          <span class="text-xs text-gray-500 mt-2">${monthName}</span>

        </div>
      `;
    }

    monthlyChart.innerHTML = html;
  }


  // ----- Spending by Category Chart -----
  function drawCategoryChart() {

    let categoryChart = document.getElementById("dashboardCategoryChart");

    // Step 1: Add up spending per category
    let categoryTotals = {};
    let totalExpense = 0;

    for (let i = 0; i < transactions.length; i++) {
      let t = transactions[i];
      if (t.type === "expense") {
        if (categoryTotals[t.category]) {
          categoryTotals[t.category] = categoryTotals[t.category] + t.amount;
        } else {
          categoryTotals[t.category] = t.amount;
        }
        totalExpense = totalExpense + t.amount;
      }
    }

    // Step 2: Convert object to array and sort highest first
    let catArray = [];
    let catNames = Object.keys(categoryTotals);
    for (let i = 0; i < catNames.length; i++) {
      catArray.push({
        name: catNames[i],
        amount: categoryTotals[catNames[i]]
      });
    }

    catArray.sort(function (a, b) {
      return b.amount - a.amount;
    });

    // Step 3: Build HTML
    let html = "";

    if (catArray.length === 0) {
      html = `<p class="text-sm text-gray-400 text-center py-4">No expense data</p>`;
    } else {
      for (let i = 0; i < catArray.length; i++) {
        let cat = catArray[i];
        let percentage = totalExpense > 0 ? Math.round((cat.amount / totalExpense) * 100) : 0;
        let color = categoryColors[cat.name] || "#94a3b8";

        html = html + `
          <div class="mb-3">
            <div class="flex items-center justify-between mb-1">
              <div class="flex items-center gap-2">
                <div class="w-2.5 h-2.5 rounded-full" style="background-color: ${color}"></div>
                <span class="text-sm text-gray-700">${cat.name}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm font-medium text-gray-800">${formatCurrency(cat.amount)}</span>
                <span class="text-xs text-gray-400">${percentage}%</span>
              </div>
            </div>
            <div class="w-full h-2 rounded-full bg-gray-200">
              <div
                class="h-2 rounded-full transition-all duration-700"
                style="width: ${percentage}%; background-color: ${color}"
              ></div>
            </div>
          </div>
        `;
      }
    }

    categoryChart.innerHTML = html;
  }


  // ----- Show Recent 5 Transactions -----
  function showRecentTransactions() {

    let recentList = document.getElementById("recentTransactionsList");

    // Copy all transactions
    let sorted = [];
    for (let i = 0; i < transactions.length; i++) {
      sorted.push(transactions[i]);
    }

    // Sort newest first
    sorted.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    // Take only first 5
    let recent = [];
    for (let i = 0; i < 5 && i < sorted.length; i++) {
      recent.push(sorted[i]);
    }

    // Empty state
    if (recent.length === 0) {
      recentList.innerHTML = `
        <div class="flex flex-col items-center justify-center py-8">
          <p class="text-sm text-gray-500">No transactions yet</p>
          <a href="transactions.html" class="text-sm text-blue-600 hover:text-blue-700 mt-2">
            Add your first transaction →
          </a>
        </div>
      `;
      return;
    }

    // Build HTML
    let html = "";

    for (let i = 0; i < recent.length; i++) {
      let t = recent[i];
      let isIncome = t.type === "income";
      let amountColor = isIncome ? "text-green-500" : "text-red-500";
      let amountSign = isIncome ? "+" : "-";

      // Border on all except last item
      let borderClass = "";
      if (i < recent.length - 1) {
        borderClass = "border-b border-gray-100";
      }

      html = html + `
        <div class="flex items-center justify-between py-3 ${borderClass}">
          <div>
            <p class="font-medium text-sm text-gray-800">${t.description}</p>
            <p class="text-xs text-gray-400">${t.category} • ${formatDate(t.date)}</p>
          </div>
          <span class="font-semibold text-sm ${amountColor}">
            ${amountSign}${formatCurrency(t.amount)}
          </span>
        </div>
      `;
    }

    recentList.innerHTML = html;
  }


  // ----- Run all Dashboard functions -----
  calculateSummary();
  drawMonthlyChart();
  drawCategoryChart();
  showRecentTransactions();

}


// TRANSACTIONS PAGE CODE

let transactionsList = document.getElementById("transactionsList");

if (transactionsList) {

  console.log("Transactions page loaded");

  let searchInput = document.getElementById("searchInput");
  let typeFilter = document.getElementById("typeFilter");
  let categoryFilter = document.getElementById("categoryFilter");
  let sortFilter = document.getElementById("sortFilter");
  let transactionCount = document.getElementById("transactionCount");
  let addTransactionBtn = document.getElementById("addTransactionBtn");


  // ----- Fill category dropdown from data.js -----
  function fillCategoryDropdown() {
    for (let i = 0; i < categories.length; i++) {
      let option = document.createElement("option");
      option.value = categories[i];
      option.textContent = categories[i];
      categoryFilter.appendChild(option);
    }
  }


  // ----- Get Filtered + Sorted Transactions -----
  function getFilteredTransactions() {

    // Start with all transactions
    let filtered = [];
    for (let i = 0; i < transactions.length; i++) {
      filtered.push(transactions[i]);
    }

    // Search filter
    let searchText = searchInput.value.toLowerCase().trim();
    if (searchText !== "") {
      let searchResults = [];
      for (let i = 0; i < filtered.length; i++) {
        let t = filtered[i];
        let descLower = t.description.toLowerCase();
        let catLower = t.category.toLowerCase();
        if (descLower.indexOf(searchText) !== -1 || catLower.indexOf(searchText) !== -1) {
          searchResults.push(t);
        }
      }
      filtered = searchResults;
    }

    // Type filter
    let selectedType = typeFilter.value;
    if (selectedType !== "all") {
      let typeResults = [];
      for (let i = 0; i < filtered.length; i++) {
        if (filtered[i].type === selectedType) {
          typeResults.push(filtered[i]);
        }
      }
      filtered = typeResults;
    }

    // Category filter
    let selectedCategory = categoryFilter.value;
    if (selectedCategory !== "all") {
      let catResults = [];
      for (let i = 0; i < filtered.length; i++) {
        if (filtered[i].category === selectedCategory) {
          catResults.push(filtered[i]);
        }
      }
      filtered = catResults;
    }

    // Sorting
    let selectedSort = sortFilter.value;
    if (selectedSort === "date-desc") {
      filtered.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    } else if (selectedSort === "date-asc") {
      filtered.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });
    } else if (selectedSort === "amount-desc") {
      filtered.sort(function (a, b) {
        return b.amount - a.amount;
      });
    } else if (selectedSort === "amount-asc") {
      filtered.sort(function (a, b) {
        return a.amount - b.amount;
      });
    }

    return filtered;
  }


  // ----- Build and Show Transaction List -----
  function renderTransactions() {

    let filtered = getFilteredTransactions();
    transactionCount.textContent = filtered.length;

    // Empty state
    if (filtered.length === 0) {
      transactionsList.innerHTML = `
        <div class="flex flex-col items-center justify-center py-12 px-4">
          <div class="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-700 mb-1">No transactions found</h3>
          <p class="text-sm text-gray-400">Try changing your search or filters</p>
        </div>
      `;
      return;
    }

    let html = "";

    for (let i = 0; i < filtered.length; i++) {
      let t = filtered[i];
      let isIncome = t.type === "income";
      let amountColor = isIncome ? "text-green-500" : "text-red-500";
      let amountSign = isIncome ? "+" : "-";

      // Admin gets edit and delete buttons
      // Viewer does not see these buttons
      let adminButtons = "";
      if (currentRole === "admin") {
        adminButtons = `
          <div class="hidden group-hover:flex items-center gap-1">
            <button class="edit-btn p-1.5 rounded-lg hover:bg-gray-200 transition-colors" data-id="${t.id}" title="Edit">
              <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button class="delete-btn p-1.5 rounded-lg hover:bg-gray-200 transition-colors" data-id="${t.id}" title="Delete">
              <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        `;
      }

      html = html + `
        <div class="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 group">
          <div>
            <p class="font-medium text-sm text-gray-800">${t.description}</p>
            <p class="text-xs text-gray-400">${t.category} • ${formatDate(t.date)}</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="font-semibold text-sm ${amountColor}">
              ${amountSign}${formatCurrency(t.amount)}
            </span>
            ${adminButtons}
          </div>
        </div>
      `;
    }

    transactionsList.innerHTML = html;
    attachTransactionButtons();
  }


  // ----- Attach Edit and Delete Button Listeners -----
  // Called after renderTransactions() puts buttons in the DOM
  function attachTransactionButtons() {

    let editButtons = document.querySelectorAll(".edit-btn");
    editButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        let id = Number(this.dataset.id);
        openEditModal(id);
      });
    });

    let deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        let id = Number(this.dataset.id);
        let confirmed = confirm("Are you sure you want to delete this transaction?");
        if (confirmed) {
          let newTransactions = [];
          for (let i = 0; i < transactions.length; i++) {
            if (transactions[i].id !== id) {
              newTransactions.push(transactions[i]);
            }
          }
          transactions = newTransactions;
          renderTransactions();
        }
      });
    });
  }


  // ADD / EDIT MODAL

  let modal = document.getElementById("transactionModal");
  let modalBackdrop = document.getElementById("modalBackdrop");
  let modalTitle = document.getElementById("modalTitle");
  let modalForm = document.getElementById("modalForm");
  let cancelModalBtn = document.getElementById("cancelModalBtn");
  let saveModalBtn = document.getElementById("saveModalBtn");

  let formDescription = document.getElementById("formDescription");
  let formAmount = document.getElementById("formAmount");
  let formDate = document.getElementById("formDate");
  let formType = document.getElementById("formType");
  let formCategory = document.getElementById("formCategory");

  // null = adding new, number = editing existing
  let editingId = null;


  // ----- Open Modal for ADDING -----
  function openAddModal() {
    editingId = null;
    modalTitle.textContent = "Add Transaction";
    saveModalBtn.textContent = "Add Transaction";
    formDescription.value = "";
    formAmount.value = "";
    formDate.value = getTodayDate();
    formType.value = "expense";
    formCategory.value = "Food";
    modal.classList.remove("hidden");
  }


  // ----- Open Modal for EDITING -----
  function openEditModal(id) {
    editingId = id;

    // Find the transaction by id
    let transaction = null;
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].id === id) {
        transaction = transactions[i];
        break;
      }
    }

    if (!transaction) {
      alert("Transaction not found!");
      return;
    }

    modalTitle.textContent = "Edit Transaction";
    saveModalBtn.textContent = "Update Transaction";

    // Fill form with existing values
    formDescription.value = transaction.description;
    formAmount.value = transaction.amount;
    formDate.value = transaction.date;
    formType.value = transaction.type;
    formCategory.value = transaction.category;

    modal.classList.remove("hidden");
  }


  // ----- Close Modal -----
  function closeModal() {
    modal.classList.add("hidden");
    editingId = null;
  }


  // ----- Get Today's Date in "2025-01-15" format -----
  function getTodayDate() {
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, "0");
    let day = String(today.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
  }


  // ----- Save Transaction (Add or Edit) -----
  function saveTransaction() {

    let description = formDescription.value.trim();
    let amount = Number(formAmount.value);
    let date = formDate.value;
    let type = formType.value;
    let category = formCategory.value;

    // Validation
    if (description === "") {
      alert("Please enter a description");
      return;
    }
    if (amount <= 0 || isNaN(amount)) {
      alert("Please enter a valid amount");
      return;
    }
    if (date === "") {
      alert("Please select a date");
      return;
    }

    if (editingId === null) {
      // Adding new transaction

      // Find highest id and add 1
      let maxId = 0;
      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].id > maxId) {
          maxId = transactions[i].id;
        }
      }

      let newTransaction = {
        id: maxId + 1,
        date: date,
        description: description,
        amount: amount,
        category: category,
        type: type
      };

      transactions.push(newTransaction);
      console.log("Transaction added:", newTransaction);

    } else {
      // Editing existing transaction

      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].id === editingId) {
          transactions[i].description = description;
          transactions[i].amount = amount;
          transactions[i].date = date;
          transactions[i].type = type;
          transactions[i].category = category;
          console.log("Transaction updated:", transactions[i]);
          break;
        }
      }
    }

    closeModal();
    renderTransactions();
  }


  // ----- Modal Event Listeners -----

  addTransactionBtn.addEventListener("click", function () {
    openAddModal();
  });

  cancelModalBtn.addEventListener("click", function () {
    closeModal();
  });

  modalBackdrop.addEventListener("click", function () {
    closeModal();
  });

  modalForm.addEventListener("submit", function (event) {
    event.preventDefault();
    saveTransaction();
  });


  // ----- Filter Event Listeners -----

  searchInput.addEventListener("input", function () {
    renderTransactions();
  });

  typeFilter.addEventListener("change", function () {
    renderTransactions();
  });

  categoryFilter.addEventListener("change", function () {
    renderTransactions();
  });

  sortFilter.addEventListener("change", function () {
    renderTransactions();
  });


  // ----- Initialize Transactions Page -----
  fillCategoryDropdown();
  renderTransactions();

  if (currentRole === "viewer") {
    addTransactionBtn.classList.add("hidden");
  }

}

// INSIGHTS PAGE CODE

let categoryBreakdown = document.getElementById("categoryBreakdown");

if (categoryBreakdown) {

  console.log("Insights page loaded");


  // ----- Get Total Income -----
  function getTotalIncome() {
    let total = 0;
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].type === "income") {
        total = total + transactions[i].amount;
      }
    }
    return total;
  }


  // ----- Get Total Expenses -----
  function getTotalExpenses() {
    let total = 0;
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].type === "expense") {
        total = total + transactions[i].amount;
      }
    }
    return total;
  }


  // ----- Get Spending grouped by Category -----
  function getSpendingByCategory() {
    let categoryTotals = {};

    for (let i = 0; i < transactions.length; i++) {
      let t = transactions[i];
      if (t.type === "expense") {
        if (categoryTotals[t.category]) {
          categoryTotals[t.category] = categoryTotals[t.category] + t.amount;
        } else {
          categoryTotals[t.category] = t.amount;
        }
      }
    }

    return categoryTotals;
  }


  // ----- Get Monthly Data -----
  function getMonthlyData() {
    let months = {};

    for (let i = 0; i < transactions.length; i++) {
      let t = transactions[i];
      let monthKey = t.date.substring(0, 7);

      if (!months[monthKey]) {
        months[monthKey] = { income: 0, expense: 0 };
      }

      if (t.type === "income") {
        months[monthKey].income = months[monthKey].income + t.amount;
      } else {
        months[monthKey].expense = months[monthKey].expense + t.amount;
      }
    }

    return months;
  }


  // ----- Get Full Month Name from "2025-01" -----
  function getMonthName(monthKey) {
    let date = new Date(monthKey + "-01");
    return date.toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric"
    });
  }


  // ----- Fill all Insight Cards with data -----
  function fillInsightCards() {

    let totalIncome = getTotalIncome();
    let totalExpenses = getTotalExpenses();
    let categorySpending = getSpendingByCategory();

    // Card 1: Highest Spending Category
    let highestCategory = "";
    let highestAmount = 0;

    let categoryNames = Object.keys(categorySpending);
    for (let i = 0; i < categoryNames.length; i++) {
      let catName = categoryNames[i];
      let catAmount = categorySpending[catName];
      if (catAmount > highestAmount) {
        highestAmount = catAmount;
        highestCategory = catName;
      }
    }

    document.getElementById("highestCategory").textContent = highestCategory || "No data";
    document.getElementById("highestCategory").style.color = categoryColors[highestCategory] || "#6b7280";
    document.getElementById("highestAmount").textContent = formatCurrency(highestAmount) + " spent";


    // Card 2: Average Expense
    let expenseTransactions = [];
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].type === "expense") {
        expenseTransactions.push(transactions[i]);
      }
    }

    let avgExpense = 0;
    if (expenseTransactions.length > 0) {
      let totalExpenseAmount = 0;
      for (let i = 0; i < expenseTransactions.length; i++) {
        totalExpenseAmount = totalExpenseAmount + expenseTransactions[i].amount;
      }
      avgExpense = Math.round(totalExpenseAmount / expenseTransactions.length);
    }

    document.getElementById("avgExpense").textContent = formatCurrency(avgExpense);


    // Card 3: Largest Transaction
    let largest = null;
    for (let i = 0; i < transactions.length; i++) {
      if (largest === null || transactions[i].amount > largest.amount) {
        largest = transactions[i];
      }
    }

    if (largest) {
      let amountColor = largest.type === "income" ? "text-green-500" : "text-red-500";
      document.getElementById("largestAmount").textContent = formatCurrency(largest.amount);
      document.getElementById("largestAmount").className = "text-xl font-bold " + amountColor;
      document.getElementById("largestDetail").textContent = largest.description + " • " + formatDate(largest.date);
    }


    // Card 4: Transaction Count
    let incomeCount = 0;
    let expenseCount = 0;
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].type === "income") {
        incomeCount++;
      } else {
        expenseCount++;
      }
    }

    document.getElementById("totalCount").textContent = transactions.length;
    document.getElementById("countDetail").textContent = incomeCount + " income • " + expenseCount + " expense";

  }

  // ----- Monthly Summary Table -----
  function fillMonthlySummaryTable() {

    let monthlyData = getMonthlyData();
    let monthKeys = Object.keys(monthlyData).sort();
    let tbody = document.getElementById("monthlySummaryBody");

    if (monthKeys.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="4" class="text-center py-8 text-gray-400">No data available</td>
        </tr>
      `;
      return;
    }

    let html = "";

    for (let i = 0; i < monthKeys.length; i++) {
      let month = monthKeys[i];
      let data = monthlyData[month];
      let net = data.income - data.expense;
      let monthName = getMonthName(month);
      let netColor = net >= 0 ? "text-green-500" : "text-red-500";

      html = html + `
        <tr class="border-b border-gray-100">
          <td class="py-3 px-2 font-medium text-gray-700">${monthName}</td>
          <td class="py-3 px-2 text-right text-green-500">${formatCurrency(data.income)}</td>
          <td class="py-3 px-2 text-right text-red-500">${formatCurrency(data.expense)}</td>
          <td class="py-3 px-2 text-right font-semibold ${netColor}">${formatCurrency(net)}</td>
        </tr>
      `;
    }

    // Total row at bottom
    let totalIncome = getTotalIncome();
    let totalExpenses = getTotalExpenses();
    let totalNet = totalIncome - totalExpenses;
    let totalNetColor = totalNet >= 0 ? "text-green-600" : "text-red-600";

    html = html + `
      <tr class="border-t-2 border-gray-300 bg-gray-50">
        <td class="py-3 px-2 font-bold text-gray-800">Total</td>
        <td class="py-3 px-2 text-right font-bold text-green-600">${formatCurrency(totalIncome)}</td>
        <td class="py-3 px-2 text-right font-bold text-red-600">${formatCurrency(totalExpenses)}</td>
        <td class="py-3 px-2 text-right font-bold ${totalNetColor}">${formatCurrency(totalNet)}</td>
      </tr>
    `;

    tbody.innerHTML = html;

  } 


  // ----- Run all Insights functions -----
  fillInsightCards();
  fillMonthlySummaryTable();
  // drawCategoryBreakdown();

}



console.log("App loaded successfully!");