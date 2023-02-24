import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";

function useGET(url) {
  const [data, setData] = useState('');
  const [error, setError] = useState(null);
  const { pathname } = useLocation()
  // console.log(pathname)

  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}${url}`)
      setData(response.data.body.data)
    } catch (err) {
      setError(err)
    }
  }

  useEffect(() => {
    getData()
  }, [pathname])

  return [data, error]
}


export default useGET;

