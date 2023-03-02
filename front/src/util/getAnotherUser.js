import axios from "axios"


async function getAnotherUserInfo(userID) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userID}`)
    return response.data.body.data
  } catch (err) {
    console.log(err)
  }
}

export default getAnotherUserInfo;