import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirection = () => {
  const [count, setCount] = useState(5);

  let navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && navigate("/login");

    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <p>Redirecting you in {count} seconds</p>
        </div>
      </div>
    </div>
  );
};

export default Redirection;
