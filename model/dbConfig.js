import mysql from "mysql2";

export default mysql.createPool({
    host: "localhost",
    user: "root",
    password: "vijay%2000",
    database: "shoesmall",
    connectionLimit: 100
});