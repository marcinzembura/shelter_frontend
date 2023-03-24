import axios from "axios";
import authHeader from './auth-header';
const API_URL = "http://localhost:8080/api/meal/";

class MedicalCardService {

  getMealAnomaly(){
    return axios.get(API_URL+'all',{ headers: authHeader() });
  }

  updateMealAnomaly(mealAnomaly){
    return axios.put(API_URL,mealAnomaly,{ headers: authHeader() })
  }

  deleteMealAnomaly(id){
    return axios.delete(API_URL+id,{headers: authHeader() })
  }

  addMealAnomaly(mealAnomaly){
     return axios.post(API_URL,mealAnomaly,{ headers: authHeader() })
  }

}

export default new MedicalCardService();
