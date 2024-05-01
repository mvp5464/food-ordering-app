import { useEffect, useState } from "react";

export default function useProfile() {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch("/api/profile", { next: { revalidate: 3600 } }).then((res) => {
      res.json().then((data) => {
        setData(data);
        setLoading(false);
      });
    });
  }, []);
  return { loading, data };
}
