import { createPool } from 'mysql2/promise'


const data = {
    host: "localhost",
    user: "root",
    password: "",
    database: "dbcev"
}
export class Pool {
    static async query(sql, list = []) {
        let pool = createPool(data)

        const promise = await pool.query(sql, list)
        pool.end()
        pool = undefined
        return promise
    }
}
