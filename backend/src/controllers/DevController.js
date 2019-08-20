const axios = require('axios');
const Dev = require('../models/Dev')


module.exports = {
    async index(req, res){
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } }, //filtra todos os usuarios menos ele mesmo
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes } },
            ],
        })

        return res.json(users);
    },

    //async = asincrona, o axios utilizando o await é asincrono, ou seja, demora um pouco pra executar
    //entao quando o node chegar no axios.get ele mostra que é asincrona e espera para executar.
    async store(req, res) {

    const {username} = req.body;

    //verificar usuario repetido
   const userExists = await Dev.findOne({ user: username});
     if(userExists){
       return res.json(userExists);
   }

    const response = await axios.get(`https://api.github.com/users/${username}`);

    const{ name, bio, avatar_url: avatar } = response.data;

    const dev = await Dev.create({ 
        name,
        user: username,
        bio,
        avatar
    })
        return res.json(dev);
    }
};