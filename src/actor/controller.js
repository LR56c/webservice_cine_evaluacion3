import {Actor} from "./actor.js";
import {ObjectId} from "mongodb";
import {client} from "../common/db.js";

const actorCollection = client.db('cine').collection('actor')


export async function handleInsertActorRequest(req, res) {
    try {
        const data = req.body;
        let actor = Actor
        actor.idPelicula = data.idPelicula;
        actor.nombre = data.nombre;
        actor.edad = data.edad;
        actor.estaRetirado = data.estaRetirado;
        actor.premios = data.premios;
        const result = await actorCollection.insertOne(actor);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error inserting actor:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}

export async function handleGetActoresRequest(req, res) {
    try {
        const actors = await actorCollection.find({}).toArray();
        res.status(200).json(actors);
    } catch (error) {
        console.error('Error fetching actors:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}

export async function handleGetActorByIdRequest(req, res) {
    try {
        const actorId = req.params.id;
        const actor = await actorCollection.findOne({_id: ObjectId.createFromHexString(actorId)});
        if (!actor) {
            return res.status(404).json({error: 'Actor not found'});
        }
        res.status(200).json(actor);
    } catch (error) {
        console.error('Error fetching actor by ID:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}

export async function handleGetActoresByPeliculaRequest(req, res) {
    try {
        const peliculaId = req.params.id;
        const actores = await actorCollection.find({idPelicula: peliculaId}).toArray();
        if (!actores) {
            return res.status(404).json({error: 'Actores not found'});
        }
        res.status(200).json(actores);
    } catch (error) {
        console.error('Error fetching actores by pelicula ID:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}
