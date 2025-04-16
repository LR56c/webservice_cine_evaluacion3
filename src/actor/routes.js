import express from "express";
import {
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaRequest,
    handleGetActoresRequest,
    handleInsertActorRequest
} from "./controller.js";

export const routes = express.Router()

routes.post('/actor', handleInsertActorRequest)
routes.get('/actores', handleGetActoresRequest)
routes.get('/actor/:id', handleGetActorByIdRequest)
routes.get('/actor/pelicula/:id', handleGetActoresByPeliculaRequest)
