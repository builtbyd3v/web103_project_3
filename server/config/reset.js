import './dotenv.js'
import { pool } from './database.js'

const reset = async () => {
    // locations = adventurers' guild lodges; order matches client route index 1..4
    // (echolounge, houseofblues, pavilion, americanairlines)
    const createLocationsTable = `
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE locations (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            address TEXT NOT NULL,
            city TEXT NOT NULL,
            state TEXT NOT NULL,
            zip TEXT NOT NULL,
            image TEXT
        );
    `

    const createEventsTable = `
        CREATE TABLE events (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            image TEXT,
            location_id INTEGER NOT NULL REFERENCES locations(id)
        );
    `

    const locations = [
        ['Ironhold Adventurers’ Guild', '88 Anvil Way', 'Dallas', 'TX', '75201', 'https://images.unsplash.com/photo-1700107959010-b9f5bd188dd9?w=800&q=80'],
        ['Mistral Wayfarers’ Lodge', '210 Harbor Reach', 'Dallas', 'TX', '75202', 'https://images.unsplash.com/photo-1604675194657-1f3212213bd2?w=800&q=80'],
        ['Stormpeak Expedition Hall', '5 Summit Pass', 'Dallas', 'TX', '75203', 'https://images.unsplash.com/photo-1584528904246-66767484ffa6?w=800&q=80'],
        ['Gilded Griffon Chapterhouse', '1300 Crown Plaza', 'Dallas', 'TX', '75204', 'https://images.unsplash.com/photo-1596113239195-012fdd66d174?w=800&q=80'],
    ]

    const events = [
        ['Crypt of the Forgotten King', '2026-07-18', '20:00:00', 'https://images.unsplash.com/photo-1728755833852-2c138c84cfb1?w=600&q=80', 1],
        ['Goblin Warrens Raid', '2026-08-02', '19:30:00', 'https://images.unsplash.com/photo-1685959133832-df8bdc3ef712?w=600&q=80', 1],
        ['The Drowned Catacombs', '2026-07-25', '18:00:00', 'https://images.unsplash.com/photo-1657465141082-2f0b05096648?w=600&q=80', 2],
        ['Lair of the Frost Wyrm', '2026-09-12', '21:00:00', 'https://images.unsplash.com/photo-1604135944117-97b0b4c15dc9?w=600&q=80', 2],
        ['Ruins of Emberhold', '2026-08-15', '17:00:00', 'https://images.unsplash.com/photo-1679236629076-e637858b1dd2?w=600&q=80', 3],
        ['The Shadowfen Descent', '2026-09-05', '19:00:00', 'https://images.unsplash.com/photo-1571989601904-c1b26bb0f25a?w=600&q=80', 3],
        ['Vault of the Lich Queen', '2026-10-03', '20:30:00', 'https://images.unsplash.com/photo-1613469425754-bf71d7280f65?w=600&q=80', 4],
        ['Abyssal Mines Expedition', '2026-11-21', '19:00:00', 'https://images.unsplash.com/photo-1651677584025-6c844f0bd65c?w=600&q=80', 4],
    ]

    try {
        await pool.query(createLocationsTable)
        for (const [name, address, city, state, zip, image] of locations) {
            await pool.query({
                text: `INSERT INTO locations (name, address, city, state, zip, image)
                       VALUES ($1, $2, $3, $4, $5, $6)`,
                values: [name, address, city, state, zip, image]
            })
        }
        console.log('🌱 locations table seeded')

        await pool.query(createEventsTable)
        for (const [title, date, time, image, location_id] of events) {
            await pool.query({
                text: `INSERT INTO events (title, date, time, image, location_id)
                       VALUES ($1, $2, $3, $4, $5)`,
                values: [title, date, time, image, location_id]
            })
        }
        console.log('🌱 events table seeded')
    } catch (err) {
        console.error('reset failed:', err)
    } finally {
        await pool.end()
    }
}

reset()
