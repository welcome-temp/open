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
  ["For Sale", "Duplex", "A well structured duplex for sale.", "10m", "18 Azugwu Road, Off Cas Gate, Abakaliki, Ebonyi State", "../img/secondd.jpg", "2000 sq meters", "5 bathrooms", "4 bedrooms"],
  ["For sale", "land", "12 plot of land for sale", "75m", "oshomolo mainland, Lagos, Nigeria", "../img/l1.jpg", "8000 sq meters", "no bathroom", "no bedrooms"],
  ["For Sale", "Apartment", "Spacious apartment in a quiet neighborhood.", "12m", "nkaliki road, abakaliki ebonyi state, Nigeria", "../img/bb1.jpg", "3000 sq meters", "5 bathrooms", "4 bedrooms"],
  ["For sale", "land", "4 plot of land for sale", "5m", "ugwuachara mile50, abakaliki ebonyi state, Nigeria", "../img/l2.jpg", "2000 sq meters", "N/A", "N/A"],
  ["For Sale", "Duplex", "A cozy and  fancy duplex for sale.", "50m", "1 Cas road, Abakaliki, Ebonyi State", "../img/bb2.jpg", "2000 sq meters", "7 bathrooms", "5 bedrooms"],
  ["For sale", "land", "2 plot of land for sale", "7m", "ezza road, presco abakalilki, ebonyi state, Nigeria", "../img/l1.jpg", "3000 sq meters", "N/A", "N/A"],
  ["For Sale", "apartment", "Spacious aprtment in a quiet area", "120m", "stadium road, abakaliki ebonyi state, Nigeria", "../img/bb2.jpg", "4000 sq meters", "6 bathrooms", "5 bedrooms"],
  ["For sale", "land", "1 plot of land for sale", "3m", " mile50, abakaliki ebonyi state, Nigeria", "../img/l3.jpg", "1000 sq meters", "N/A", "N/A"]
];

// Insert properties into the database
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS sell (id INTEGER PRIMARY KEY AUTOINCREMENT, purpose TEXT, type TEXT, description TEXT, price TEXT, location TEXT, image TEXT, size TEXT, bath TEXT, bed TEXT)"
  );

  const insertQuery = `INSERT INTO sell (purpose, type, description, price, location, image, size, bath, bed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
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
