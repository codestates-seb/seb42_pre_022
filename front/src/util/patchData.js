import axios from "axios";

async function patchData(url, data) {
  const config = {
    headers: {
      "Authorization": JSON.parse(localStorage.getItem("accessToken"))
    }
  }
  try {
    const response = await axios.patch(`${process.env.REACT_APP_API_URL}${url}`, data, config)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export default patchData;

