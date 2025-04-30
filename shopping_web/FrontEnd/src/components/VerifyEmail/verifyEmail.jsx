import { useEffect, useState } from "react";
import { verifyEmail } from "../../services/auth";
import { useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Đang xác thực email...");

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      verifyEmail(token)
        .then((res) => {
          setMessage(res.message || "Xác thực email thành công!");
        })
        .catch((err) => {
          setMessage(err || "Xác thực thất bại.");
        });
    } else {
      setMessage("Không tìm thấy token xác thực.");
    }
  }, [searchParams]);

  return (
    <div style={{ padding: 20 }}>
      <h2>{message}</h2>
    </div>
  );
};

export default VerifyEmail;
