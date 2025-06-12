import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose, AiOutlineMedicineBox } from "react-icons/ai";
import { MdLocalPharmacy, MdHealthAndSafety } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/searchSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search.query);

  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(setSearchQuery(""));
  }, [location.pathname]);

  return (
    <nav className="bg-white text-green-900 shadow-md sticky top-0 z-50 font-tajawal" dir="rtl">
      <div className="container mx-auto px-4 py-3 flex flex-col gap-3">

        {/* الجزء العلوي: الاسم في اليمين وزر القائمة في اليسار على الموبايل */}
        <div className="flex items-center justify-between md:flex-col md:items-center md:gap-2">
          {/* اسم الصيدلية */}
          <div className="flex items-center space-x-2 md:justify-center">
            <div className="text-2xl md:text-3xl font-bold text-right">
              <span className="text-green-700">الباشا</span>
              <span className="text-green-900"> للأدويه</span>
            </div>
            <MdLocalPharmacy className="text-3xl text-green-900" />
          </div>

          {/* زر القائمة - للموبايل فقط */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-2xl focus:outline-none p-1 rounded-md hover:bg-green-100 transition"
            >
              {isOpen ? <AiOutlineClose /> : <HiOutlineMenuAlt3 />}
            </button>
          </div>
        </div>

        {/* شريط البحث + الروابط */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

          {/* الروابط + القائمة الجانبية للهاتف */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
            <div className={`${isOpen ? "block" : "hidden"} md:flex gap-2`}>
              <Link
                to="/"
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition ${
                  currentPath === "/"
                    ? "bg-green-600 text-white shadow"
                    : "hover:bg-green-100 text-green-900"
                }`}
              >
                <AiOutlineMedicineBox className="ml-2" />
                كل الأصناف
              </Link>

              <Link
                to="/new"
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition ${
                  currentPath === "/new"
                    ? "bg-green-600 text-white shadow"
                    : "hover:bg-green-100 text-green-900"
                }`}
              >
                <MdHealthAndSafety className="ml-2" />
                الوارد حديثاً
              </Link>

              <Link
                to="/offers"
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition ${
                  currentPath === "/offers"
                    ? "bg-green-600 text-white shadow"
                    : "hover:bg-green-100 text-green-900"
                }`}
              >
         % العروض والتخفيضات
              </Link>
            </div>
          </div>

          {/* شريط البحث */}
          <form onSubmit={handleSearch} className="relative w-full md:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              placeholder="ابحث عن دواء أو منتج..."
              className="w-full py-2 px-4 pr-12 rounded-lg border border-green-300 text-green-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <FiSearch className="absolute right-4 top-3 text-green-500 text-xl" />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
