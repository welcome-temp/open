const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database
const db = new sqlite3.Database("./db/data.sqlite", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Sample properties data
const sampleProperties = [
  ["For rent", "a room selfcon", "A fancy one room selfcontain", "260k for start", "16  waterworks road, Abakaliki, Ebonyi State", "../img/r1.jpg", "6 sq meters", "1 bathrooms", "1 bedrooms"],
  ["For rent", "Apartment", "Luxury apartment for rent.", "5m yearly", "Lagos, Nigeria", "../img/estate.jpg", "8 sq meters", "5 bathroom", "4 bedrooms"],
  ["For rent", "Bungalow", "Spacious bungalow in a quiet neighborhood.", "2m yearly", "holy road, Enugu, Nigeria", "../img/good.jpg", "1200 sq meters", "3 bathrooms", "4 bedrooms"],
  ["For rent", "Studio", "Modern photo studio, one story building", "1m yearly", "garriki, Abuja, Nigeria", "../img/g5.jpg", "6000 sq meters", "3 bathroom", "4 bedroom"],
  ["For rent", "Duplex", "A fancy duplex for rent", "1m yearly", "4 Azugwu Road, Off Cas Gate, Abakaliki, Ebonyi State", "../img/second.jpg", "1000 sq meters", "5 bathrooms", "4 bedrooms"],
  ["For rent", "Apartment", "Luxury apartment for rent.", "2.3m yearly", "marryland,Lagos, Nigeria", "../img/b4.jpg", "8000 sq meters", "6 bathroom", "4 bedrooms"],
  ["For rent", "Bungalow", "Spacious bungalow in a quiet neighborhood.", "2,1m yearly", "nsukka, Enugu, Nigeria", "../img/b2.jpg", "2000 sq meters", "4 bathrooms", "4 bedrooms"],
  ["For rent", "a room selfcon", "a comfortable a relaxing one room selfcontain", "50m", "gwagwalada, Abuja, Nigeria", "../img/r2.jpg", "6 sq meters", "1 bathroom", "1 bedroom"]
];

// Insert properties into the database
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS rent (id INTEGER PRIMARY KEY AUTOINCREMENT, purpose TEXT, type TEXT, description TEXT, price TEXT, location TEXT, image TEXT, size TEXT, bath TEXT, bed TEXT)"
  );

  const insertQuery = `INSERT INTO rent (purpose, type, description, price, location, image, size, bath, bed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  sampleProperties.forEach((property) => {
    db.run(insertQuery, property, function (err) {
      if (err) {
        console.error("Error inserting property:", err.message);
      } else {
        console.log("Property added with ID:", this.lastID);
      }
    });
  });
});

// Close database connection after insertion
db.close((err) => {
  if (err) {
    console.error("Error closing database:", err.message);
  } else {
    console.log("Database connection closed.");
  }
});
