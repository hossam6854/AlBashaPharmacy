import { useEffect, useState } from "react";
import sha256 from "js-sha256";
import ExcelUploader from "../components/ExcelUploader";
import { FiLogOut, FiLock, FiUploadCloud, FiShield } from "react-icons/fi";

const ADMIN_PASSWORD_HASH =
  "80439244e16fc65b16891cea15954f00ec09bc40d55d86f709fb5bf0f0df2fb3";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const expiry = parseInt(localStorage.getItem("adminExpiry") || "0");
    if (isAdmin && Date.now() < expiry) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const hash = sha256(password.trim());

    if (hash === ADMIN_PASSWORD_HASH) {
      const expiryTime = Date.now() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("adminExpiry", expiryTime.toString());
      setIsAuthenticated(true);
    } else {
      alert("❌ كلمة السر غير صحيحة");
      setPassword("");
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminExpiry");
    setIsAuthenticated(false);
    setPassword("");
  };

  if (!isAuthenticated) {
    return (
      <div
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100"
        dir="rtl"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-6 border border-gray-200"
        >
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <FiShield className="text-4xl text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              نظام إدارة الأدوية
            </h2>
            <p className="text-gray-500 text-sm">
              الرجاء إدخال كلمة المرور للوصول إلى لوحة التحكم
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                autoFocus
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center gap-2 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all cursor-pointer ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  جاري التحقق...
                </>
              ) : (
                <>
                  <FiLock className="text-sm" />
                  دخول
                </>
              )}
            </button>
          </div>

          <div className="text-center text-xs text-gray-400 pt-4 border-t border-gray-100">
            نظام آمن ومحمي بكلمة مرور قوية
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8" dir="rtl">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-2">
              <FiShield className="text-indigo-500" />
              لوحة تحكم الأدمن
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-all cursor-pointer"
          >
            <FiLogOut className="text-sm" />
            تسجيل الخروج
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiUploadCloud className="text-indigo-500" />
            تحديث قواعد البيانات
          </h2>
        </div>

        <ExcelUploader
          label="تحديث بيانات (كل الاصناف)"
          uploadUrl="https://script.google.com/macros/s/AKfycbyoLVKvxoydlEqgo36llysK0iG6SzE5DsQnhTKtc-ig77JWoC6t-Dj6ze2vLN0vQj9b/exec"
        />

        <ExcelUploader
          label="تحديث بيانات (الوارد حديثا)"
          uploadUrl="https://script.google.com/macros/s/AKfycbxuM4mSVmqiDLvNhf1KenWcJmk3xqILgETKBBRl4DdKDw12TzeKfpS4EG2QvZldp9LY/exec"
        />

        <ExcelUploader
          label="تحديث بيانات (العروض)"
          uploadUrl="https://script.google.com/macros/s/AKfycbx3cFITtMJgeVBTv8DR3l4NX3xjqQ37L-5dSjkkKEGxxY2q3Z8G7ibwGtKKImQmG-K_/exec"
        />
      </div>
    </div>
  );
};

export default AdminPage;
