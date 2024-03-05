import axios from 'axios';

const loginAPI = async (username, password) => {
    try {
        const response = await axios.get(`http://localhost:8000/users?username=${username}&password=${password}`);
        return response.data;
      } catch (error) {
        throw error;
      }
}

export {loginAPI}