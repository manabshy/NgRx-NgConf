// What are Actions

// Unified interface to describe events
// Just data, no functionality
// Has at a minimum a type property
// Strongly typed using classes and enums


// GOOD ACTION HYGIENE

// Unique events get unique actions
// Actions are grouped by their source
// Actions are never reused


// EVENT STORMING


// [User on the Books Page]Create a Book
// BookRequiredProps
// [User on the Books Page]Update a book
// BookRequiredProps
// [User on the Books Page]Delete a book
// [User on the Books Page]Cancel editing a book



// Selectors

// Allow us to query our store for data
// Recompute when their inputs change
// Fully Leverage memoization for performance
// Selectors are fully composable
