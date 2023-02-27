import axios from "axios";

async function deleteData(url) {
  const config = {
    headers: {
      "Authorization": JSON.parse(sessionStorage.getItem("accessToken"))
    }
  }
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}${url}`, config)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export default deleteData;

