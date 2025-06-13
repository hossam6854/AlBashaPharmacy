// components/Cart.js
import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  setCustomerName,
  clearCart,
  updateQuantity,
} from "../redux/cartSlice";
import {
  FiSend,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiShoppingCart,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { items, customerName } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const total = useMemo(
    () =>
      items
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2),
    [items]
  );

  const itemNumber = items.length;

  useEffect(() => {
    if (items.length > 0) setIsExpanded(true);
  }, [items]);

  const generateWhatsAppLink = () => {
    const message = `الاسم: ${customerName}
الطلب:
  ${items
    .map(
      (item) =>
      `•${item.name} - الكمية${item.quantity} - الخصم${item.discount}%\n`
    )
    .join("")}
الإجمالي: ${total} ج.م`;

    return `https://wa.me/201110759890?text=${encodeURIComponent(message)}`;
  };

  const handleSend = () => {
    if (!customerName.trim()) return;

    window.open(generateWhatsAppLink(), "_blank");
    setIsAnimating(true);
    setTimeout(() => {
      dispatch(clearCart());
      setIsExpanded(false);
      setIsAnimating(false);
    }, 1000);
  };

  const handleQuantityChange = (id, change) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  if (items.length === 0 && !isAnimating) return null;

  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="mt-8 w-full md:px-8"
        >
          <div className="bg-white p-3 sm:p-6 rounded-2xl shadow-lg border border-green-200 max-w-4xl mx-auto">
            {/* العنوان */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-extrabold text-green-800 flex items-center gap-2">
                <FiShoppingCart className="text-green-600" />
                سلة الطلبات
              </h2>
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {itemNumber} عناصر
              </span>
            </div>


            <div className="max-h-72 overflow-y-auto sm:pr-2 mb-6 space-y-3 custom-scrollbar">          {/* العناصر */}
          {items.map((item) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white px-4 py-3 rounded-xl shadow border border-green-100 hover:shadow-md transition-shadow"
  >
    <button
      onClick={() => dispatch(removeFromCart(item.id))}
      className="absolute top-2 left-2 text-red-500 hover:text-red-700 transition-colors p-1 sm:hidden"
    >
      <FiTrash2 size={18} />
    </button>

    <div className="flex-1 min-w-[150px]">
      <span className="text-green-800 font-bold">{item.name}</span>
      <p className="text-sm text-gray-500 mt-1">
        {item.price} ج.م للواحد
      </p>
    </div>

    <div className="flex items-center justify-between w-full sm:w-auto mt-2 sm:mt-0 gap-4">
      <div className="flex items-center bg-green-50 rounded-lg overflow-hidden">
        <button
          onClick={() => handleQuantityChange(item.id, -1)}
          className="px-3 py-1 text-green-600 hover:bg-green-100 transition-colors"
        >
          <FiMinus size={16} />
        </button>
        <span className="px-3 text-green-800 font-semibold">
          {item.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(item.id, 1)}
          className="px-3 py-1 text-green-600 hover:bg-green-100 transition-colors"
        >
          <FiPlus size={16} />
        </button>
      </div>

      <span className="text-green-700 font-bold min-w-[80px] text-center">
        {(item.price * item.quantity).toFixed(2)} ج.م
      </span>

      <button
        onClick={() => dispatch(removeFromCart(item.id))}
        className="text-red-500 hover:text-red-700 transition-colors p-1 hidden sm:block"
      >
        <FiTrash2 size={18} />
      </button>
    </div>
  </motion.div>
))}
</div>

            {/* الإجمالي */}
            <div className="flex justify-between items-center font-bold text-lg text-gray-800 mb-5 px-1 border-t pt-4">
              <span>الإجمالي:</span>
              <span className="text-green-700">{total} ج.م</span>
            </div>

            {/* الاسم */}
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="ادخل اسم صيدليتك"
                value={customerName}
                onChange={(e) => dispatch(setCustomerName(e.target.value))}
                className="w-full p-3 pr-12 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none placeholder:text-gray-400 text-right bg-white"
              />
            </div>

            {/* زر الإرسال */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleSend}
              disabled={!customerName.trim()}
              className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-white transition-colors
                ${
                  customerName.trim()
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              <FiSend />
              إرسال عبر واتساب
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart;
