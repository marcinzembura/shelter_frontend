import axios from "axios";
import authHeader from './auth-header';
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
const API_URL = 'http://localhost:8080/api/owner/';

class OwnerService{

    getAllOwners(){
        return axios.get(API_URL+'all', { headers: authHeader() });
    }

    deleteOwner(id){
        return axios.delete(API_URL+id,{ headers: authHeader() });
    }

    getOwnersById(id){
        return axios.get(API_URL+id,{ headers: authHeader() });
    }

    updateOwner(employee){
        return axios.put(API_URL, employee,{ headers: authHeader() })
    }

    addOwner(owner){
        return axios.post(API_URL,owner,{ headers: authHeader() })
    }

}

export default new OwnerService();