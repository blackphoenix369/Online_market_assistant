import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
try {
const connection = await mysql.createConnection({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASS,
database: process.env.DB_NAME,
});
console.log("✅ MySQL Database Connected Successfully!");
return connection;
} catch (error) {
console.error("❌ Database connection failed:", error.message);
process.exit(1);
}
};
export default connectDB;