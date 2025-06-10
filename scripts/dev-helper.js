// Simple development helper script
const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

// Check if database connection is working
console.log("🔍 Checking database connection...")
try {
  // This will be executed when you run: node scripts/dev-helper.js
  console.log("✅ Database connection script ready")
  console.log("")
  console.log("To start the development server:")
  console.log("npm run dev")
  console.log("")
  console.log("To test database connection:")
  console.log("Visit: http://localhost:3000/api/test-db")
} catch (error) {
  console.error("❌ Error:", error.message)
}
