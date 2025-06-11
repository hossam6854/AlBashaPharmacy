import { motion } from "framer-motion";

const FullPageLoader = ({ isError = false, onRetry }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white font-tajawal">
      {/* رمز الصيدلة */}
      <motion.div
        className="relative mb-10"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.95, 1, 0.95],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* الوعاء */}
        <div className="w-20 h-16 border-4 border-green-500 rounded-lg relative shadow-inner shadow-green-500/20">
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-500"></div>
        </div>

        {/* الثعبان */}
        <motion.div
          className="absolute top-2 left-1/2 w-12 h-8 origin-left"
          animate={{
            rotate: [0, 10, -10, 0],
            x: ["-50%", "-50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-2 bg-green-500 rounded-full"></div>
          <div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full shadow-md shadow-white/50"></div>
        </motion.div>
      </motion.div>

      {/* عند حدوث خطأ */}
      {isError && (
        <div className="text-center mt-6">
          <p className="text-red-600 font-bold mb-4">
            حدث خطأ أو انقطاع في الاتصال بالإنترنت
          </p>
          <button
            onClick={onRetry}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            إعادة المحاولة 🔄
          </button>
        </div>
      )}

      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-4">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-green-500 rounded-full shadow-md shadow-white/30"
            animate={{
              y: [0, -5, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FullPageLoader;
