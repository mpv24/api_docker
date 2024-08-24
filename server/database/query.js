import crypto from 'crypto';
class Cars {
    constructor(database) {
        this.database = database;
    }

    async getCars() {
        const query = 'SELECT * FROM cars';
        try {
            const [rows] = await this.database.query(query);
            return rows;
        } catch (err) {
            console.error('Error en getCars:', err);
            throw err;
        }
    }

    async getCarsById(id) {
        const query = 'SELECT * FROM cars WHERE id = ?';
        try {
            const [rows] = await this.database.query(query, [id]);
            return rows;
        } catch (err) {
            console.error('Error en getCarsById:', err);
            throw err;
        }
    }

    async deleteCars(id) {
        const query = 'DELETE FROM cars WHERE id = ?';
        try {
            const [result] = await this.database.query(query, [id]);
            return result;
        } catch (err) {
            console.error('Error en deleteCars:', err);
            throw err;
        }
    }

    async updateCars(id, make, model, year, color) {
        const salt = crypto.randomBytes(16).toString('hex'); 
        const hash = crypto.pbkdf2Sync(model, salt, 1000, 64, 'sha512').toString('hex'); 
        try {
            const query = 'UPDATE cars SET make = ?, model = ?, year = ?, color = ? WHERE id = ?';
            const [result] = await this.database.query(query, [make, `${salt}:${hash}`, year, color, id]);
            return result;
        } catch (err) {
            console.error('Error en updateCars:', err);
            throw err;
        }
    }

    async addCars(make, model, year, color) {      
        const salt = crypto.randomBytes(16).toString('hex'); 
        const hash = crypto.pbkdf2Sync(model, salt, 1000, 64, 'sha512').toString('hex'); 
        try {
            const query = 'INSERT INTO cars (make, model, year, color) VALUES (?, ?, ?, ?)';
            const [result] = await this.database.query(query, [make, `${salt}:${hash}`, year, color]);
            return result;
        } catch (err) {
            console.error('Error en addCars:', err);
            throw err;
        }
    }
}

export default Cars;
