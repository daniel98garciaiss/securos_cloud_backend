const MongoLib = require("../lib/mongo");
// aqui va la toda la logica del software
// los services se encargan de recibir la informacion de las rutas y peticiones 
class ApiKeysService {

    constructor(){
        this.collection = 'api-keys';
        this.mongoDB = new MongoLib();
    }

    async getApiKey({token}){
        // const friends = await Promise.resolve(friendsMock); //EJEMPLO MOCK
        const [apiKey] = await this.mongoDB.getAll(this.collection, { token });
        return apiKey;
    }
}

module.exports = ApiKeysService;