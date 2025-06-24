import { useState } from "react";
import banner from "../../assets/banner.jpg";
import { motion } from "framer-motion";
const Banner = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="w-full my-30">
      <div
        className="relative w-full h-[500px] cursor-pointer overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Banner Image */}
        <img src={banner} alt="Banner" className="w-[600px] md:w-full h-full object-cover" />

        {/* Overlay Dark layer for better text visibility */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Text on top of image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center"
        >
          <motion.h1
            whileHover={{
              x: [0, -5, 5, -5, 5, 0], // left-right wiggle
              transition: { duration: 1 },
            }}
            className="lg:w-1/2 mx-auto text-2xl md:text-5xl font-bold leading-7 md:leading-10 lg:leading-16"
          >
            The future is{" "}
            <span className="text-red-400">Artificial Inteligence</span> trends
            and impalication.
          </motion.h1>
          <p className="w-fit md:w-3/4 mx-auto text-xs md:text-lg font-normal text-white mt-10 md:leading-8">
            Artificial Intelligence (AI) is rapidly transforming the future of
            technology, business, and society. While it promises improved
            efficiency and innovation, it also raises concerns about privacy,
            job displacement, and ethical responsibility. Preparing for an
            AI-driven future requires thoughtful regulation, upskilling of the
            workforce, and a strong focus on responsible AI development.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
