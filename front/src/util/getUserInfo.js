import axios from "axios";

const config = {
  headers: {
    "Authorization": JSON.parse(sessionStorage.getItem("accessToken"))
  }
}

async function getUserInfo() {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/principal`, config)
    return response.data.body.data
  } catch (err) {
    console.log(err)
  }
}

export default getUserInfo;