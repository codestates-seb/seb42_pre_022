import axios from "axios";

async function deleteData(url) {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}${url}`)
      return response.data
    } catch (err) {
      console.log(err)
    }
}

export default deleteData;

