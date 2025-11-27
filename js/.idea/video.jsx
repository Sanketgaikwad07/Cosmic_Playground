import { motion } from "framer-motion";
import { useRef } from "react";

export default function DhoniVideo() {
    const videoRef = useRef(null);

    const playPause = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-indigo-900">
            {/* Title Animation */}
            <motion.h1
                className="text-white text-3xl font-bold mb-6"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                🔥 Dhoni Entry 🔥
            </motion.h1>

            {/* Video Box Animation */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="rounded-2xl shadow-lg overflow-hidden border-4 border-yellow-400"
            >
                <video
                    ref={videoRef}
                    width="480"
                    className="rounded-2xl"
                    controls
                >
                    <source src="/dhoni.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </motion.div>

            {/* Button Animation */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={playPause}
                className="mt-5 px-6 py-2 bg-yellow-500 text-black font-bold rounded-full shadow-lg"
            >
                ▶ Play / ⏸ Pause
            </motion.button>
        </div>
    );
}
