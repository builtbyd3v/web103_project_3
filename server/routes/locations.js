import express from 'express'
import { getAllLocations, getLocation } from '../controllers/locations.js'

const locationsRouter = express.Router()

locationsRouter.get('/', getAllLocations)
locationsRouter.get('/:id', getLocation)

export default locationsRouter