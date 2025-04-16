import {Pelicula} from "./pelicula.js";
import {ObjectId} from "mongodb";
import {client} from "../common/db.js";

const peliculaCollection = client.db('cine').collection('pelicula')

export async  function handleInsertPeliculaRequest(req, res) {
    try {
        const data = req.body;
        let pelicula = Pelicula
        pelicula.nombre = data.nombre;
        pelicula.generos = data.generos;
        pelicula.anioEstreno = data.anioEstreno;
        const result = await peliculaCollection.insertOne(pelicula);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error inserting pelicula:', error);
        res.status(500).json({error: 'Failed to insert pelicula'});
    }
}

export async function handleGetPeliculasRequest(req, res) {
    try {
        const peliculas = await peliculaCollection.find({}).toArray();
        res.status(200).json(peliculas);
    } catch (error) {
        console.error('Error fetching peliculas:', error);
        res.status(500).json({error: 'Failed to fetch peliculas'});
    }
}

export async function handleGetPeliculaByIdRequest (req, res) {
    try {
        const peliculaId = req.params.id;
        const pelicula = await peliculaCollection.findOne({_id: ObjectId.createFromHexString(peliculaId)});
        if (!pelicula) {
            return res.status(404).json({error: 'Pelicula not found'});
        }
        res.status(200).json(pelicula);
    } catch (error) {
        console.error('Error fetching pelicula by ID:', error);
        res.status(500).json({error: 'Failed to fetch pelicula'});
    }
}

export async function handleUpdatePeliculaByIdRequest(req, res) {
    try {
        const peliculaId = req.params.id;
        const data = req.body;
        const result = await peliculaCollection.updateOne(
            {_id: ObjectId.createFromHexString(peliculaId)},
            {$set: data}
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({error: 'Pelicula not found'});
        }
        res.status(200).json({message: 'Pelicula updated successfully'});
    } catch (error) {
        console.error('Error updating pelicula:', error);
        res.status(500).json({error: 'Failed to update pelicula'});
    }
}

export async function handleDeletePeliculaByIdRequest(req, res) {
    try {
        const peliculaId = req.params.id;
        const result = await peliculaCollection.deleteOne({_id: ObjectId.createFromHexString(peliculaId)});
        if (result.deletedCount === 0) {
            return res.status(404).json({error: 'Pelicula not found'});
        }
        res.status(200).json({message: 'Pelicula deleted successfully'});
    } catch (error) {
        console.error('Error deleting pelicula:', error);
        res.status(500).json({error: 'Failed to delete pelicula'});
    }
}

