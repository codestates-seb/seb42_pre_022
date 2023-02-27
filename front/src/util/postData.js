import axios from "axios";

async function postData(url, data) {
  const config = {
    headers: {
      "Authorization": JSON.parse(sessionStorage.getItem("accessToken"))
    }
  }
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}${url}`, data, config)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export default postData;

