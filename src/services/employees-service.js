import axios from "axios";
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/account/';

class EmployeesService{

    getAllEmployees(){
        return axios.get(API_URL+'all', { headers: authHeader() });
    }

    deleteEmployeeAccount(id){
        return axios.delete(API_URL+id,{ headers: authHeader() });
    }

    getAccountById(id){
        return axios.get(API_URL+id,{ headers: authHeader() });
    }

    updateEmployee(employee){
        return axios.put(API_URL, employee,{ headers: authHeader() })
    }

}

export default new EmployeesService();