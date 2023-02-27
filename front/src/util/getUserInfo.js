import axios from "axios";

async function getUserInfo(accessToken) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/principal`, { headers: { "Authorization": accessToken } })
    return response.data.body.data
  } catch (err) {
    console.log(err)
  }
}

export default getUserInfo;