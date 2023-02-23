import axios from "axios";

async function patchData(url, data) {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}${url}`, data)
      return response.data
    } catch (err) {
      console.log(err)
    }
}

export default patchData;

