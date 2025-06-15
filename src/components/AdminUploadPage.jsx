import { useState } from "react";
import * as XLSX from "xlsx";

const ExcelUploader = ({ uploadUrl }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("اختر ملف أولاً");
      return;
    }

    try {
      setStatus("جاري معالجة الملف...");

      const reader = new FileReader();
      reader.onload = async (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // تحويل الورقة إلى CSV
        const csv = XLSX.utils.sheet_to_csv(worksheet);

        // تحويل CSV إلى base64
        const base64Csv = btoa(unescape(encodeURIComponent(csv)));

        setStatus("جاري رفع الملف...");

        const response = await fetch(uploadUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            data: base64Csv,
          }),
        });

        const text = await response.text();
        setStatus(text.includes("✅") ? "✅ تم رفع الملف وتحديث البيانات" : "❌ فشل التحديث");
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error(error);
      setStatus("❌ حدث خطأ أثناء معالجة أو رفع الملف");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow w-full max-w-md mx-auto space-y-4">
      <h3 className="text-lg font-semibold text-center text-green-700">
        رفع ملف Excel جديد
      </h3>
      <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
      >
        رفع الملف
      </button>
      {status && <p className="text-center text-sm text-gray-700">{status}</p>}
    </div>
  );
};

export default ExcelUploader;
