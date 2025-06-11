import { useState, useEffect } from 'react';

const useFetchSheetData = (url, transformFn = null) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        const text = await res.text();
        const json = JSON.parse(text.substring(47).slice(0, -2));

        const rows = json.table.rows.map(row => ({
          name: row.c[0]?.v || "",
          price: row.c[1]?.v || 0,
          discount: row.c[2]?.v || 0,
          stock: row.c[3]?.v || 0,
        }));

        const transformed = transformFn ? transformFn(rows) : rows;
        setData(transformed);
      } catch (err) {
        setError('فشل تحميل البيانات');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchSheetData;
