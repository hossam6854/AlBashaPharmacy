import { useEffect, useState } from "react";
import sha256 from "js-sha256";
import UploadExcelForm from "../components/AdminUploadPage";

// ✅ هذا هو الهاش الصحيح لكلمة السر: admin123
const ADMIN_PASSWORD_HASH =
  "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    setIsAuthenticated(isAdmin);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const hash = sha256(password.trim());

    if (hash === ADMIN_PASSWORD_HASH) {
      localStorage.setItem("isAdmin", "true");
      setIsAuthenticated(true);
    } else {
      alert("كلمة السر غير صحيحة");
      setPassword("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAuthenticated(false);
    setPassword("");
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-80"
        >
          <h2 className="text-xl font-semibold text-center mb-4 text-red-700">
            دخول الأدمن
          </h2>
          <input
            type="password"
            placeholder="كلمة السر"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-4"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            دخول
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-red-700">لوحة تحكم الأدمن</h1>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded"
        >
          تسجيل الخروج
        </button>
      </div>

      <section className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold text-lg mb-2 text-indigo-700">
    رفع AllDrugs
  </h2>
  <UploadExcelForm uploadUrl="https://script.google.com/macros/s/AKfycbwRgCjWNg4t95AWDD-0nyy-_yqcDwzp2ZfBA-wlsws5w8jakTJ1losTsFznc5vSEbeo/exec" />
</section>

<section className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold text-lg mb-2 text-indigo-700">
    رفع NewArrivals
  </h2>
  <UploadExcelForm uploadUrl="https://script.google.com/macros/s/AKfycbyFtjKKAeuB1mDqVhNClaSUe8PKlovPU9b_fSAjhofHH4MMVbrevr6nwebqOrTBk_UG/exec" />
</section>

<section className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold text-lg mb-2 text-indigo-700">
    رفع Offers
  </h2>
  <UploadExcelForm uploadUrl="https://script.google.com/macros/s/AKfycbzu6ZTY9RmB0LvhrmnEPGN5L_n5eYUDPO4GNn4QRAvXzmFRV3dZub_FU_nkVYfzEGoz/exec" />
</section>

    </div>
  );
};

export default AdminPage;
