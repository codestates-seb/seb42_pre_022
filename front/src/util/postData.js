import axios from "axios";

async function postData(url, data) {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}${url}`, data)
      return response.data.body.data
    } catch (err) {
      console.log(err)
    }
}

export default postData;

