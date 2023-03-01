import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Token() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get("Authorization");
    localStorage.setItem("accessToken", accessToken);
    navigate("/");
  }, [])

  return (
    <></>
  )
}

export default Token;