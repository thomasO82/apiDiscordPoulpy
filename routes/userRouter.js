const userRouter = require('express').Router();
const client = require('../services/discorBot');
const userController = require('../controllers/userController')

userRouter.get('/users/:id',async(req,res)=>{
    try {
        const guild = await client.guilds.fetch(process.env.GUILD_TOM);
        const member = await guild.members.fetch(req.params.id);
        res.json(member);
    }catch(err){
        res.status(400)
        res.json(err)
    }
})

userRouter.get('/users',async(req,res)=>{
    try {
        const guild = await client.guilds.fetch(process.env.GUILD_TOM);
        const members = await guild.members.fetch();
    res.json(members)
    }catch(err){
        res.status(400)
        res.json(err)
    }
})

userRouter.get('/roles',async(req,res)=>{
    try {
        const guild = await client.guilds.fetch(process.env.GUILD_TOM);
        const roles = await guild.roles.fetch();
        res.json(roles)
    }catch(err){
    res.status(400)
    res.json(err)
    }
})

userRouter.get('/me',async(req,res)=>{
    try {
       const userData= userController.getUserData(req)
        res.json(userData)
    }catch(err){
        res.status(400)
        res.json(err)
    }
})

module.exports = userRouter
