import { useState } from "react";

export default useApi = (ApiHandler) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await ApiHandler(...args);
    setLoading(false);

    if (!response.ok) return setError(true);

    setError(false);
    setData(response.data);
  };

  return { data, error, loading, request };
};
