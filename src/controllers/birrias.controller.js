import {getConnection} from "../database/database"

const getBirrias = async (req,res) => {
    try{
    const connection = await getConnection()
    const result = await connection.query("SELECT birria_id, place, date, time, max, players FROM birrias")
    res.json(result)
    }
    catch(error){
        res.status(500)
        res.send(error.message)
    }
}

const getBirria = async (req,res) => {
    try{
    const {id} = req.params
    const connection = await getConnection()
    const result = await connection.query("SELECT birria_id, place, date, time, max, players FROM birrias WHERE birria_id = ?", id)
    res.json(result)
    }
    catch(error){
        res.status(500)
        res.send(error.message)
    }
}

const addBirrias = async (req,res) => {
    try{
    const { birria_id, place, date, time, max, players } = req.body
    if(place===undefined || date===undefined || time===undefined || players===undefined){
        res.status(400).json({message:"Debe completar los campos obligatorios"})
    }
    else{
        const newBirria = {
            place, 
            date, 
            time, 
            max, 
            players: 
                players 
            
        }
        const connection = await getConnection()
        const result = await connection.query("INSERT INTO birrias SET ?", newBirria)
        res.json({message:"Agregado correctamente"})
    }
   
    }
    catch(error){
        res.status(500)
        res.send(error.message)
    }
}

const deleteBirria = async (req,res) => {
    try{
    const {id} = req.params
    const connection = await getConnection()
    const result = await connection.query("DELETE FROM birrias WHERE birria_id = ?", id)
    res.json(result)
    }
    catch(error){
        res.status(500)
        res.send(error.message)
    }
}

const updateBirria = async (req,res) => {
    try{
    const {id} = req.params
    const { birria_id, place, date, time, max, players } = req.body
    if(place===undefined || date===undefined || time===undefined || max===undefined){
        res.status(400).json({message:"Debe completar los campos obligatorios"})
    }
    else{
        const newBirria = {
            place, 
            date, 
            time, 
            max, 
            players: [
                players 
            ]
        }
        const connection = await getConnection()
        const result = await connection.query("UPDATE birrias SET ? WHERE birria_id = ?", [newBirria, id])
        res.json("result")
    }
    
    }
    catch(error){
        res.status(500)
        res.send(error.message)
    }
}

const addPlayer = async (req,res) => {
    try{
    const {id} = req.params
    const { players } = req.body
    console.log(players)
    const connection = await getConnection()
    const currentBirria = await connection.query("SELECT birria_id, place, date, time, max, players FROM birrias WHERE birria_id = ?", id)
    let aux = currentBirria[0]
    console.log(currentBirria)
    aux.players = aux.players + ", " + players
    if(players===undefined ){
        res.status(400).json({message:"Debe completar los campos obligatorios"})
    }
    else{
        const newBirria = aux
        const result = await connection.query("UPDATE birrias SET ? WHERE birria_id = ?", [newBirria, id])
        res.json(result)
    }
    
    }
    catch(error){
        res.status(500)
        res.send(error.message)
    }
}



export const methods = {
    getBirrias,
    addBirrias,
    getBirria,
    deleteBirria,
    updateBirria,
    addPlayer
}