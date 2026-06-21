import express from 'express'
import { getAllEvents, getEvent, getEventsByLocation } from '../controllers/events.js'

const eventsRouter = express.Router()

eventsRouter.get('/', getAllEvents)
eventsRouter.get('/location/:location_id', getEventsByLocation)
eventsRouter.get('/:id', getEvent)


export default eventsRouter