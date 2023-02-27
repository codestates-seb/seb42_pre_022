import axios from "axios";

const config = {
  headers: {
    "Authorization": JSON.parse(sessionStorage.getItem("accessToken"))
  }
}

async function deleteData(url) {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}${url}`, config)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export default deleteData;

