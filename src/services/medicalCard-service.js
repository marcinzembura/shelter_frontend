import axios from "axios";
import authHeader from './auth-header';
const API_URL = "http://localhost:8080/api/medicalcard/";

class MedicalCardService {

  getMedicalCards() {
    return axios.get(API_URL + 'all', { headers: authHeader() });
  }

  updateMedicalCard(medicalCard) {
    return axios.put(API_URL, medicalCard, { headers: authHeader() })
  }

  deleteMedicalCard(id) {
    return axios.delete(API_URL + id, { headers: authHeader() })
  }

  addMedicalCard(medicalCard) {
    return axios.post(API_URL, medicalCard, { headers: authHeader() })
  }
}
export default new MedicalCardService();

