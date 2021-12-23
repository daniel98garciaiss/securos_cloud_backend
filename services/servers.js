const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');
// aqui va la toda la logica del software
// los services se encargan de recibir la informacion de las rutas y peticiones 

class ServersService {
    constructor(){
        this.collection = 'servers';
        this.mongoDB = new MongoLib();
    }
    

    async getServers({query}){
        const servers = await this.mongoDB.getAll(this.collection, {query});
        return servers;
    }

    // async getUserWithOutPassword({ userId }){
    //     const user = await this.mongoDB.get(this.collection, userId);
    //     delete user.password;
    //     return user || {};
    // }

    // async updateUser({ userId, user } = {}){ 
    //     // const sentFriendRequestId = await Promise.resolve(friendsMock[0].id); //EJEMPLO MOCK
    //     const updateUserId = await this.mongoDB.update(this.collection, userId, user);
    //     return updateUserId;
    // }   

    async createServer({ server }){
        const { 
            name,
            ip,
            vpn,
            ipNormal,
            ipVpn,
            config,
            } = server ;

        const createServerId = await this.mongoDB.create(this.collection, {
            name,
            ip,
            vpn,
            ipNormal ,
            ipVpn ,
            config,
            state: false,
        });

        return createServerId;
    }
}

module.exports = ServersService;