import axios from "axios";

async function getUserInfo() {
  const config = {
    headers: {
      "Authorization": JSON.parse(localStorage.getItem("accessToken"))
    }
  }
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/principal`, config)
    return response.data.body.data
  } catch (err) {
    console.log(err)
  }
}

export default getUserInfo;