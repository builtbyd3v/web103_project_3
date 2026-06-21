import {pool} from '../config/database.js'

export const getAllEvents = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM events ORDER BY id ASC')
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getEvent = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query('SELECT * FROM events WHERE id = $1', [id])
        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getEventsByLocation = async (req, res) => {
    try {
        const { location_id } = req.params
        const result = await pool.query('SELECT * FROM events WHERE location_id = $1 ORDER BY date', [location_id])
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
