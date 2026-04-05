// =============================================
// data.js — This file has all our fake data
// =============================================

// ----- WHAT IS A VARIABLE? -----
// A variable is like a box where we store something.
// Example: let myName = "Rahul" → box called myName has "Rahul" inside it

// ----- WHAT IS AN ARRAY? -----
// An array is like a list. We use square brackets [ ] to denote array.
// Example: let fruits = ["apple", "banana", "mango"]
// fruits has 3 items in it

// ----- WHAT IS AN OBJECT? -----
// An object is like a student's ID card — it has many details
// Example:
// let student = {
//   name: "Rahul",
//   age: 10,
//   class: 5
// }
// Here name, age, class are called "keys"
// "Rahul", 10, 5 are called "values"

// =============================================
// Now let's create our TRANSACTIONS list
// It is an ARRAY (list) of OBJECTS (details)
// =============================================

let transactions = [

  // ----- JANUARY 2025 -----

  // Transaction 1: Salary came in
  {
    id: 1,
    date: "2025-01-03",
    description: "Monthly Salary",
    amount: 75000,
    category: "Salary",
    type: "income"
  },

  // Transaction 2: Bought groceries
  {
    id: 2,
    date: "2025-01-05",
    description: "Grocery from Big Bazaar",
    amount: 3200,
    category: "Food",
    type: "expense"
  },

  // Transaction 3: Netflix subscription
  {
    id: 3,
    date: "2025-01-08",
    description: "Netflix Subscription",
    amount: 649,
    category: "Entertainment",
    type: "expense"
  },

  // Transaction 4: Electricity bill paid
  {
    id: 4,
    date: "2025-01-10",
    description: "Electricity Bill",
    amount: 1800,
    category: "Utilities",
    type: "expense"
  },

  // Transaction 5: Freelance money came in
  {
    id: 5,
    date: "2025-01-12",
    description: "Freelance Web Project",
    amount: 15000,
    category: "Freelance",
    type: "income"
  },

  // Transaction 6: Petrol for bike
  {
    id: 6,
    date: "2025-01-15",
    description: "Petrol for Bike",
    amount: 2500,
    category: "Transport",
    type: "expense"
  },

  // Transaction 7: Dinner at restaurant
  {
    id: 7,
    date: "2025-01-18",
    description: "Dinner at Restaurant",
    amount: 1400,
    category: "Food",
    type: "expense"
  },

  // Transaction 8: Gym membership
  {
    id: 8,
    date: "2025-01-22",
    description: "Gym Membership",
    amount: 1500,
    category: "Health",
    type: "expense"
  },

  // Transaction 9: Bought a book
  {
    id: 9,
    date: "2025-01-25",
    description: "Book - Atomic Habits",
    amount: 450,
    category: "Shopping",
    type: "expense"
  },

  // Transaction 10: Mobile recharge
  {
    id: 10,
    date: "2025-01-28",
    description: "Mobile Recharge",
    amount: 599,
    category: "Utilities",
    type: "expense"
  },


  // ----- FEBRUARY 2025 -----

  {
    id: 11,
    date: "2025-02-02",
    description: "Monthly Salary",
    amount: 75000,
    category: "Salary",
    type: "income"
  },

  {
    id: 12,
    date: "2025-02-04",
    description: "Grocery from DMart",
    amount: 2800,
    category: "Food",
    type: "expense"
  },

  {
    id: 13,
    date: "2025-02-07",
    description: "Uber Cab Rides",
    amount: 1200,
    category: "Transport",
    type: "expense"
  },

  {
    id: 14,
    date: "2025-02-10",
    description: "Internet Bill",
    amount: 999,
    category: "Utilities",
    type: "expense"
  },

  {
    id: 15,
    date: "2025-02-13",
    description: "Freelance App Design",
    amount: 20000,
    category: "Freelance",
    type: "income"
  },

  {
    id: 16,
    date: "2025-02-15",
    description: "Movie Tickets",
    amount: 700,
    category: "Entertainment",
    type: "expense"
  },

  {
    id: 17,
    date: "2025-02-18",
    description: "Clothes Shopping",
    amount: 3500,
    category: "Shopping",
    type: "expense"
  },

  {
    id: 18,
    date: "2025-02-20",
    description: "Medicine from Apollo",
    amount: 850,
    category: "Health",
    type: "expense"
  },

  {
    id: 19,
    date: "2025-02-23",
    description: "Petrol for Bike",
    amount: 2200,
    category: "Transport",
    type: "expense"
  },

  {
    id: 20,
    date: "2025-02-27",
    description: "Electricity Bill",
    amount: 2100,
    category: "Utilities",
    type: "expense"
  },


  // ----- MARCH 2025 -----

  {
    id: 21,
    date: "2025-03-01",
    description: "Monthly Salary",
    amount: 75000,
    category: "Salary",
    type: "income"
  },

  {
    id: 22,
    date: "2025-03-03",
    description: "Weekly Grocery",
    amount: 4100,
    category: "Food",
    type: "expense"
  },

  {
    id: 23,
    date: "2025-03-06",
    description: "Spotify Subscription",
    amount: 119,
    category: "Entertainment",
    type: "expense"
  },

  {
    id: 24,
    date: "2025-03-09",
    description: "Freelance SEO Work",
    amount: 10000,
    category: "Freelance",
    type: "income"
  },

  {
    id: 25,
    date: "2025-03-12",
    description: "Water Bill",
    amount: 400,
    category: "Utilities",
    type: "expense"
  },

  {
    id: 26,
    date: "2025-03-15",
    description: "New Shoes",
    amount: 2800,
    category: "Shopping",
    type: "expense"
  },

  {
    id: 27,
    date: "2025-03-18",
    description: "Auto Rickshaw Fare",
    amount: 950,
    category: "Transport",
    type: "expense"
  },

  {
    id: 28,
    date: "2025-03-21",
    description: "Dentist Visit",
    amount: 2000,
    category: "Health",
    type: "expense"
  },

  {
    id: 29,
    date: "2025-03-24",
    description: "Lunch at Restaurant",
    amount: 800,
    category: "Food",
    type: "expense"
  },

  {
    id: 30,
    date: "2025-03-28",
    description: "Stock Dividend",
    amount: 5000,
    category: "Investment",
    type: "income"
  },


  // ----- APRIL 2025 -----

  {
    id: 31,
    date: "2025-04-01",
    description: "Monthly Salary (Hike)",
    amount: 80000,
    category: "Salary",
    type: "income"
  },

  {
    id: 32,
    date: "2025-04-04",
    description: "Grocery Shopping",
    amount: 3600,
    category: "Food",
    type: "expense"
  },

  {
    id: 33,
    date: "2025-04-07",
    description: "Amazon Prime Yearly",
    amount: 1499,
    category: "Entertainment",
    type: "expense"
  },

  {
    id: 34,
    date: "2025-04-10",
    description: "Electricity Bill",
    amount: 2400,
    category: "Utilities",
    type: "expense"
  },

  {
    id: 35,
    date: "2025-04-13",
    description: "Petrol for Bike",
    amount: 2700,
    category: "Transport",
    type: "expense"
  },

  {
    id: 36,
    date: "2025-04-16",
    description: "Udemy Online Course",
    amount: 4999,
    category: "Shopping",
    type: "expense"
  },

  {
    id: 37,
    date: "2025-04-19",
    description: "Freelance Logo Design",
    amount: 8000,
    category: "Freelance",
    type: "income"
  },

  {
    id: 38,
    date: "2025-04-22",
    description: "Full Body Health Checkup",
    amount: 3000,
    category: "Health",
    type: "expense"
  },

  {
    id: 39,
    date: "2025-04-25",
    description: "Swiggy Food Orders",
    amount: 1800,
    category: "Food",
    type: "expense"
  },

  {
    id: 40,
    date: "2025-04-28",
    description: "Fixed Deposit Interest",
    amount: 3500,
    category: "Investment",
    type: "income"
  },

]; // <-- This closing bracket ends our transactions array


// =============================================
// CATEGORIES LIST
// =============================================
// This is a simple list of all category names
// We will use this later when showing filter options
// and when adding new transactions

let categories = [
  "Food",
  "Entertainment",
  "Utilities",
  "Transport",
  "Shopping",
  "Health",
  "Salary",
  "Freelance",
  "Investment"
];


// =============================================
// CATEGORY COLORS
// =============================================
// Each category gets its own color
// We will use these colors in our charts later
// These are HEX color codes (like color codes in paint)

let categoryColors = {
  Food:          "#f87171",   // red
  Entertainment: "#fb923c",   // orange
  Utilities:     "#facc15",   // yellow
  Transport:     "#4ade80",   // green
  Shopping:      "#60a5fa",   // blue
  Health:        "#c084fc",   // purple
  Salary:        "#34d399",   // teal green
  Freelance:     "#22d3ee",   // cyan blue
  Investment:    "#a78bfa",   // violet
};