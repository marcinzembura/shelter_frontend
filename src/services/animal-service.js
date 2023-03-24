import axios from "axios";
import authHeader from './auth-header';
const API_URL = "http://localhost:8080/api/animal/";

class AnimalService {
 
  getAnimals(){
    return axios.get(API_URL+'all');
  }

  getNumberOfActiveAnimals(){
    return axios.get(API_URL+'active',{ headers: authHeader() });
  }

  getNumberOfTypeAnimal(){
    return axios.get(API_URL+'type',{ headers: authHeader() });
  }
  getNumberOfAdoptedAnimals(){
    return axios.get(API_URL+'adopted',{ headers: authHeader() })
  }

  getNumberOfCats(){
    return axios.get(API_URL+'cats', { headers: authHeader() });
  }

  getNumberOfDogs(){
    return axios.get(API_URL+'dogs',{ headers: authHeader() });
  }
  getNumberOfTypeOther(){
    return axios.get(API_URL+'other',{ headers: authHeader() })
  }

  getNumberOfMales(){
    return axios.get(API_URL+'males', { headers: authHeader() });
  }

  getNumberOfFemales(){
    return axios.get(API_URL+'females',{ headers: authHeader() });
  }
  getNumberOfOlderAnimals(){
    return axios.get(API_URL+'older',{ headers: authHeader() })
  }


  addAnimal(animal){
    return axios.post(API_URL,animal,{ headers: authHeader() })
  }

  updateAnimal(animal){
    return axios.put(API_URL,animal,{ headers: authHeader() })
  }
  deleteAnimal(id){
    return axios.delete(API_URL+id,{ headers: authHeader() })
  }

  getActiveAnimals(){
    return axios.get(API_URL+'all/active')
  }


}

export default new AnimalService();