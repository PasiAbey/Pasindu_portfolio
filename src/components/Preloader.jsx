import React from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-100 bg-color flex items-center justify-center flex-col"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 1, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
        className="relative"
      >
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
          LOADING<span className="text-white">.</span>
        </h1>
        
        {/* Subtle white progress bar */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-1 bg-white/20 mt-4 rounded-full" 
        />
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-12 text-[10px] tracking-[0.3em] font-bold uppercase text-white/50"
      >
        Digital Environment Initializing
      </motion.p>
    </motion.div>
  );
};

export default Preloader;
