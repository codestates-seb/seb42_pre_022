import axios from "axios";

const config = {
  headers: {
    "Authorization": JSON.parse(sessionStorage.getItem("accessToken"))
  }
}

async function patchData(url, data) {
  try {
    const response = await axios.patch(`${process.env.REACT_APP_API_URL}${url}`, data, config)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export default patchData;

