"use client";

import { motion } from "framer-motion";

export function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00f9ff]/[0.02] blur-[120px] rounded-full" />

      <svg
        viewBox="0 0 100 100"
        className="absolute w-[140vw] h-[140vw] md:w-[100vw] md:h-[100vw] opacity-100" 
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "50% 50%" }}
        >
          <ellipse cx="50" cy="50" rx="45" ry="25" stroke="#00F9FF" strokeWidth="0.2" fill="none" opacity="0.3" />
          <circle cx="95" cy="50" r="0.5" fill="#00F9FF">
            <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
          </circle>
        </motion.g>

        <motion.g
          initial={{ rotate: 60 }}
          animate={{ rotate: 420 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "50% 50%" }}
        >
          <ellipse cx="50" cy="50" rx="45" ry="25" stroke="#00F9FF" strokeWidth="0.2" fill="none" opacity="0.3" />
          <circle cx="5" cy="50" r="0.5" fill="#00F9FF" />
        </motion.g>

        <motion.g
          initial={{ rotate: 120 }}
          animate={{ rotate: -240 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "50% 50%" }}
        >
          <ellipse cx="50" cy="50" rx="45" ry="25" stroke="#00F9FF" strokeWidth="0.2" fill="none" opacity="0.3" />
          <circle cx="50" cy="5" r="0.5" fill="#00F9FF" />
        </motion.g>
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
    </div>
  );
}