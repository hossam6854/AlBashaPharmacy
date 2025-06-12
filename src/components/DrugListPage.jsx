import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { FiCheckCircle, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useFetchSheetData from "../hooks/useFetchSheetData";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import Toast from "./Toast";
import FullPageLoader from "./FullPageLoader";
import Cart from "./Cart";

const DrugListPage = ({ title, sheetUrl, idPrefix = "item" }) => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search.query);
  const cartItems = useSelector((state) => state.cart.items);

  const [currentPage, setCurrentPage] = useState(1);
  const [quantities, setQuantities] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isAtCartSection, setIsAtCartSection] = useState(false);
  const cartRef = useRef(null);



  const drugsPerPage = 10;

  const {
    data: drugs,
    loading,
    error,
  } = useFetchSheetData(sheetUrl, (rows) =>
    rows.map((row, index) => ({
      ...row,
      id: `${idPrefix}${index + 1}`,
      stock: parseInt(row.stock) || 0,
      price: parseFloat(row.price) || null,
      discount: parseFloat(row.discount) || null,
    }))
  );

  useEffect(() => {
    const checkOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", checkOnlineStatus);
    window.addEventListener("offline", checkOnlineStatus);

    return () => {
      window.removeEventListener("online", checkOnlineStatus);
      window.removeEventListener("offline", checkOnlineStatus);
    };
  }, []);

  const filteredDrugs = useMemo(() => {
    return drugs.filter((drug) =>
      drug.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [drugs, searchQuery]);

  const currentDrugs = useMemo(() => {
    const start = (currentPage - 1) * drugsPerPage;
    return filteredDrugs.slice(start, start + drugsPerPage);
  }, [filteredDrugs, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredDrugs.length / drugsPerPage);
  }, [filteredDrugs]);

  const priceAfterDiscount = (drug) =>
    drug.discount
      ? Math.max(
          0,
          parseFloat((drug.price * (1 - drug.discount / 100)).toFixed(2))
        )
      : drug.price;

  const handleAddToCart = useCallback(
    (drug) => {
      const rawQty = parseInt(quantities[drug.id]) || 1;
      const validQty = Math.max(1, Math.min(rawQty, drug.stock));
      if (drug.stock === 0) return;

      const updatedItem = {
        ...drug,
        price: priceAfterDiscount(drug),
        quantity: validQty,
      };

      dispatch(addToCart(updatedItem));
      setToastMessage(`تم الإضافه إلى السلة`);
      setShowToast(true);
      if (cartRef.current) {
        const rect = cartRef.current.getBoundingClientRect();
        const atCart = rect.top < window.innerHeight && rect.bottom > 0;
        setIsAtCartSection(atCart);
      }
    },
    [quantities, dispatch]
  );

  const handleQuantityChange = useCallback((id, value) => {
    // اسمح بقيمة فارغة مؤقتًا
    setQuantities((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleQuantityBlur = useCallback((id, stock, value) => {
    let qty = parseInt(value);
    if (isNaN(qty) || qty < 1) qty = 1;
    if (qty > stock) qty = stock;
    setQuantities((prev) => ({ ...prev, [id]: qty }));
  }, []);

  const handleIncrement = useCallback((id, stock) => {
    setQuantities((prev) => {
      const current = parseInt(prev[id]) || 1;
      const newQty = current + 1 > stock ? stock : current + 1;
      return { ...prev, [id]: newQty };
    });
  }, []);

  const handleDecrement = useCallback((id) => {
    setQuantities((prev) => {
      const current = parseInt(prev[id]) || 1;
      const newQty = current - 1 < 1 ? 1 : current - 1;
      return { ...prev, [id]: newQty };
    });
  }, []);

  useEffect(() => {
    const checkCartPosition = () => {
      if (cartRef.current) {
        const rect = cartRef.current.getBoundingClientRect();
        // تحقق إذا كان قسم السلة مرئي في الشاشة
        setIsAtCartSection(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    checkCartPosition();
    window.addEventListener('scroll', checkCartPosition);
    return () => window.removeEventListener('scroll', checkCartPosition);
  }, []);

  if (!isOnline || loading || error)
    return (
      <FullPageLoader
        isError={!!error || !isOnline}
        onRetry={() => window.location.reload()}
      />
    );

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-200 md:p-8"
      dir="rtl"
    >
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-green-800">{title}</h1>
      </div>

      <div className="space-y-4 mb-12">
        {currentDrugs.map((drug) => (
          <div
            key={drug.id}
            className="bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row md:items-center justify-between border-r-4 border-green-600 relative"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-800">{drug.name}</h3>
              <div className="flex items-center gap-2 md:gap-10 mt-2 text-sm text-gray-600">
                {drug.discount ? (
                  <>
                    <span className="line-through text-gray-400 text-base">
                      {drug.price.toFixed(2)} ج.م
                    </span>
                    <span className="text-green-700 font-bold text-lg">
                      {priceAfterDiscount(drug).toFixed(2)} ج.م
                    </span>
                    <span className="text-red-500 font-bold bg-red-100 px-2 py-0.5 rounded-full">
                      خصم {drug.discount}%
                    </span>
                  </>
                ) : (
                  <span className="text-green-600 font-bold text-lg">
                    {drug.price.toFixed(2)} ج.م
                  </span>
                )}
              </div>
              <p className="text-gray-500 mt-1">الكمية المتاحة: {drug.stock}</p>
            </div>
            <div className="flex items-center justify-between gap-10 mt-3 md:mt-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecrement(drug.id)}
                  className="w-10 h-10 bg-green-100 text-green-700 border border-green-300 rounded-md text-xl hover:bg-green-200 active:scale-90 transition duration-200 shadow-sm"
                >
                  −
                </button>

                <input
                  type="tel"
                  inputMode="numeric"
                  max={drug.stock}
                  value={quantities[drug.id] ?? 1}
                  onChange={(e) =>
                    handleQuantityChange(drug.id, e.target.value)
                  }
                  onBlur={(e) =>
                    handleQuantityBlur(drug.id, drug.stock, e.target.value)
                  }
                  className="w-14 h-10 text-center border border-green-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none text-lg text-green-800 bg-white"
                />

                <button
                  onClick={() => handleIncrement(drug.id, drug.stock)}
                  className="w-10 h-10 bg-green-100 text-green-700 border border-green-300 rounded-md text-xl hover:bg-green-200 active:scale-90 transition duration-200 shadow-sm"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleAddToCart(drug)}
                disabled={drug.stock === 0}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2  ${
                  drug.stock === 0
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                <FiCheckCircle className="text-lg" />
                اضف
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDrugs.length > drugsPerPage && (
        <div className="flex justify-center my-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 mx-1 disabled:opacity-50"
          >
            <FiChevronRight />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`p-2 px-4 rounded-lg mx-1 ${
                currentPage === number
                  ? "bg-green-600 text-white"
                  : "border border-gray-300"
              }`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 mx-1 disabled:opacity-50"
          >
            <FiChevronLeft />
          </button>
        </div>
      )}

<div ref={cartRef}>
        <Cart />
      </div>

      {/* عرض زر السلة فقط إذا كان هناك عناصر ولم يكن المستخدم في قسم السلة */}
      {cartItems.length > 0 && !isAtCartSection && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              })
            }
            className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-800 transition cursor-pointer"
          >
            🛒 عرض السلة
          </button>
        </div>
      )}

      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
};

export default DrugListPage;
