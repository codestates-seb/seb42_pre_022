import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Token() {

  // 리다이렉트 주소에 포함된 accessToken 값을 활용
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // 주소에 접속했을 때 accessToken 값을 얻고 로컬스토리지에 저장한 뒤 홈으로 이동
  useEffect(() => {
    const accessToken = searchParams.get("Authorization");
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    navigate("/");
  }, [])

  return (
    <></>
  )
}

export default Token;