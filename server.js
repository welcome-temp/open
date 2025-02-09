require('dotenv').config();
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const session = require("express-session");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Database connection
const db = new sqlite3.Database("./db/data.sqlite", (err) => {
  if (err) console.error("Error opening main database:", err.message);
  else console.log("Connected to main database.");
});

const db1 = new sqlite3.Database('./db/subscribe.db', (err) => {
  if (err) console.error("Error opening subscribe database:", err.message);
  else console.log("Connected to subscribe database.");
});

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Adjust based on your frontend domain
  credentials: true,
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.MY_CODE || "defaultSecret", // Fallback for missing env variable
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }, // Set session expiry to 1 hour
  })
);

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      email TEXT UNIQUE, 
      phone TEXT UNIQUE, 
      password TEXT, 
      resetToken TEXT, 
      resetTokenExpiry INTEGER
    )
  `);
  db1.run(`
    CREATE TABLE IF NOT EXISTS subscribe (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      email TEXT 
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS properties (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      purpose TEXT, 
      type TEXT, 
      description TEXT, 
      price TEXT, 
      location TEXT, 
      image TEXT, 
      size TEXT, 
      bath TEXT, 
      bed TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS sell (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      purpose TEXT, 
      type TEXT, 
      description TEXT, 
      price TEXT, 
      location TEXT, 
      image TEXT, 
      size TEXT, 
      bath TEXT, 
      bed TEXT
    )
  `);

  
  db.run(`
    CREATE TABLE IF NOT EXISTS rent (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      purpose TEXT, 
      type TEXT, 
      description TEXT, 
      price TEXT, 
      location TEXT, 
      image TEXT, 
      size TEXT, 
      bath TEXT, 
      bed TEXT
    )
  `);

  db.run(`
  
  CREATE TABLE IF NOT EXISTS visit (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT,
      phone TEXT,
      email TEXT,
      visit_date TEXT,
      timestamp TEXT,
      property_details TEXT
      )
  `);
  


  // Insert sample data if the table is empty
  db.get("SELECT COUNT(*) AS count FROM properties", (err, row) => {
    if (err) {
      console.error("Error checking properties count:", err);
      return;
    }

    if (row.count === 0) {
      const sampleProperties = [
        [
          "For Sale",
          "Bungalow",
          "A fancy and cozy bungalow for sale",
          "15m",
          "4 Azugwu Road, Off Cas Gate, Abakaliki, Ebonyi State",
          "../img/second.jpg",
          "2000 sq meters",
          "4 bathrooms",
          "3 bedrooms",
        ],
      ];

      sampleProperties.forEach((property) => {
        db.run(
          `INSERT INTO properties (purpose, type, description, price, location, image, size, bath, bed) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          property,
          function (err) {
            if (err) console.error("Error inserting property:", err);
          }
        );
      });
    }
  });
});

// API route to get properties
app.get("/api/properties", (req, res) => {
  db.all("SELECT * FROM properties", (err, rows) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(rows);
  });
});




  // Insert sample data if the table is empty
  db.get("SELECT COUNT(*) AS count FROM sell", (err, row) => {
    if (err) {
      console.error("Error checking sell count:", err);
      return;
    }

    if (row.count === 0) {
      const sellProperties = [
        [
          "For Sale",
          "bungalow",
          "A cool and affordable bungalow for sale.",
          "21m",
          "18 waterworks Road, Abakaliki, Ebonyi State",
          "../img/b1.jpg",
          "1100 sq meters",
          "3 bathrooms",
          "2 bedrooms",
        ],
      ];

      sellProperties.forEach((property) => {
        db.run(
          `INSERT INTO sell (purpose, type, description, price, location, image, size, bath, bed) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          property,
          function (err) {
            if (err) console.error("Error inserting sell:", err);
          }
        );
      });
    }
  });


// API route to get properties
app.get("/api/sale_properties", (req, res) => {
  db.all("SELECT * FROM sell", (err, rows) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(rows);
  });
});



// Insert sample data if the table is empty
  db.get("SELECT COUNT(*) AS count FROM rent", (err, row) => {
    if (err) {
      console.error("Error checking rent count:", err);
      return;
    }

    if (row.count === 0) {
      const rentProperties = [
        [
          "For rent",
          "Selfcon",
          "A fancy, nice and comfortable selfcon for rent",
          "250k for start",
          "holyghost avenue, enugu State",
          "../img/r2.jpg",
          "10 sq meters",
          "1 bathrooms",
          "1 bedrooms",
        ],
      ];

      rentProperties.forEach((property) => {
        db.run(
          `INSERT INTO rent (purpose, type, description, price, location, image, size, bath, bed) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          property,
          function (err) {
            if (err) console.error("Error inserting rent:", err);
          }
        );
      });
    }
  });


// API route to get properties
app.get("/api/rent_properties", (req, res) => {
  db.all("SELECT * FROM rent", (err, rows) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(rows);
  });
});
//end of property section
//
//
//


//
//
//
//start of session area
// Approve visit and store in DB
app.post('/approve-visit', (req, res) => {
  const { fullName, phone, email, timestamp, visitDate, property } = req.body;

  if (!fullName || !phone || !email || !visitDate || !property) {
      return res.status(400).json({ error: "All fields are required" });
  }

  const query = `INSERT INTO visit (full_name, phone, email, visit_date, timestamp, property_details) VALUES (?, ?, ?, ?, ?, ?)`;

  db.run(query, [fullName, phone, email, visitDate, timestamp, JSON.stringify(property)], (err, result) => {
      if (err) {
          console.error("Database Insert Error:", err);
          return res.status(500).json({ error: "Failed to schedule visit" });
      }

      // Send Email to User
      sendVisitEmail(email, fullName, visitDate, property)
          .then(() => {
              res.json({ message: "Visit scheduled successfully" });
          })
          .catch((error) => {
              console.error("Email Error:", error);
              res.status(500).json({ error: "your Visit confirmation failed, please check your internet connection" });
          });
  });
});

// Function to send visit confirmation email
async function sendVisitEmail(userEmail, fullName, visitDate, property) {
  
  const mailOptions = {
    from: process.env.EMAIL_NAME,
    to: userEmail,
    subject: 'Your Visit Scheduled Confirmation',
    html: `
           <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
           <img class="img-fluid" src="../img/open.jpeg" alt="Icon" style="width: 30px; height: 30px;">
            </div>
            <h1 class="m-0 "  style="color:  #fff;">Open-nest</h1>
            <br><br>
            <h2>Hello ${fullName},</h2>
            <p>Your visit has been scheduled to hold on <strong>${visitDate}</strong>.</p>
            <h3>Property Details:</h3>
            <img src="${property.image}" alt="Property Image" style="width: 100%; max-width: 400px; border-radius: 5px;"><br>
            <p><strong>Purpose:</strong> ${property.purpose}</p>
            <p><strong>Type:</strong> ${property.type}</p>
            <p><strong>Description:</strong> ${property.description}</p>
            <p><strong>Price:</strong> ${property.price}</p>
            <p><strong>Location:</strong> ${property.location}</p>
            <p><strong>Size:</strong> ${property.size}</p>
            <p><strong>Bathrooms:</strong> ${property.bath}</p>
            <p><strong>Bedrooms:</strong> ${property.bed}</p>
            <p>We will contact you before the date scheduled.</p>
            <p>Thank you!</p>
        </div>
    `
};

await transporter.sendMail(mailOptions);
}


app.get('/visit-history', (req, res) => {
  db.all("SELECT * FROM visit", (err, results) => {
      if (err) {
          console.error("Database Fetch Error:", err);
          return res.status(500).json({ error: "Failed to fetch visit history" });
      }
      res.json(results);
  });
});



//end of session area
//
//
//



// Nodemailer setup
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn("⚠️  Email configuration missing in .env file.");
}
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});



// Contact Us Email Route
app.post('/send-email', async (req, res) => {
  const { name, email, number, message } = req.body;


  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({ error: "Email service is not configured." });
  }

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Contact Us Form Submission from ${name}`,
    text: `You have received a new message:

Name: ${name}
Email: ${email}
Phone Number: ${number}
Message: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ error: 'Failed to send the email. Please try again later.' });
  }
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
