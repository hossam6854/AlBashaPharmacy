import { useState } from "react";
import * as XLSX from "xlsx";
import { FiUpload } from "react-icons/fi";

const ExcelUploader = ({ uploadUrl, label }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      ![
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ].includes(selectedFile.type)
    ) {
      setStatus("❌ الملف ليس من نوع Excel");
      return;
    }
    setFile(selectedFile);
    setStatus("");
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("❌ اختر ملفًا أولًا");
      return;
    }

    setUploading(true);
    setStatus("📊 جاري معالجة الملف...");

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (!jsonData.length) {
          setStatus("❌ الملف فارغ");
          setUploading(false);
          return;
        }

        const headers = Object.keys(jsonData[0]);
        if (
          !headers.includes("item") ||
          !headers.includes("sales price") ||
          !headers.includes("stock") ||
          !headers.includes("discount")
        ) {
          setStatus("❌ الملف لا يحتوي على الأعمدة المطلوبة");
          setUploading(false);
          return;
        }

        const csv = XLSX.utils.sheet_to_csv(worksheet);
        const base64Csv = btoa(unescape(encodeURIComponent(csv)));

        setStatus("☁️ جاري رفع الملف...");

        const response = await fetch(uploadUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ data: base64Csv }),
        });

        const result = await response.text();
        const success = result.includes("✅");

        setStatus(
          success ? "✅ تم رفع الملف وتحديث البيانات" : "❌ فشل في رفع الملف"
        );
      };

      reader.readAsArrayBuffer(file);
    } catch (err) {
      console.error(err);
      setStatus("❌ حدث خطأ أثناء الرفع");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-3" dir="rtl">
      <h3 className="font-semibold text-indigo-700">{label}</h3>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        className="w-full border rounded p-2 cursor-pointer"
      />

      {file && (
        <p className="text-sm text-gray-700">
          🧾 {file.name} ({(file.size / 1024).toFixed(1)} KB)
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition cursor-pointer ${
          uploading ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        <FiUpload />
        {uploading ? "جاري الرفع..." : "رفع الملف"}
      </button>

      {status && <p className="text-sm text-center">{status}</p>}
    </div>
  );
};

export default ExcelUploader;
