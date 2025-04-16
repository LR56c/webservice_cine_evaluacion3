import express from "express";
import {
    handleDeletePeliculaByIdRequest,
    handleGetPeliculaByIdRequest,
    handleGetPeliculasRequest,
    handleInsertPeliculaRequest,
    handleUpdatePeliculaByIdRequest
} from "./controller.js";

export const routes = express.Router()

routes.post('/pelicula', handleInsertPeliculaRequest)
routes.get('/peliculas', handleGetPeliculasRequest)
routes.get('/pelicula/:id', handleGetPeliculaByIdRequest)
routes.put('/pelicula/:id', handleUpdatePeliculaByIdRequest)
routes.delete('/pelicula/:id', handleDeletePeliculaByIdRequest)
