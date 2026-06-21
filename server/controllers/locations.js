import {pool} from '../config/database.js'

export const getAllLocations = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM locations ORDER BY id ASC')
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getLocation = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query('SELECT * FROM locations WHERE id = $1', [id])
        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}