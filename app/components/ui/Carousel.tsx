import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from "@/app/components/ui/Image";
import Link from '@/app/components/ui/Link';
interface CarouselProps {
  images: { id: any; name: string }[]; // 图片数组
  autoplay?: boolean; // 是否自动播放
  autoplayDelay?: number; // 自动播放间隔时间
  loop?: boolean; // 是否循环
  imagesPerPage?: number; // 每页显示的图片数量
}

const Carousel: React.FC<CarouselProps> = ({ 
  images, 
  autoplay = true, 
  autoplayDelay = 12000, 
  loop = true,
  imagesPerPage = 6 // 默认每页显示6张图片
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const animationControls = useAnimation();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalPages = Math.ceil(images.length / imagesPerPage); // 计算总页数
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalPages); // 循环到第一页
  }, [totalPages]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages); // 循环到最后一页
  }, [totalPages]);

  const resetAutoplay = useCallback(() => {
    if (autoplay && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(handleNext, autoplayDelay);
    }
  }, [autoplay, autoplayDelay, handleNext]);

  useEffect(() => {
    if (autoplay) {
      timeoutRef.current = setTimeout(handleNext, autoplayDelay);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [autoplay, autoplayDelay, handleNext]);

  useEffect(() => {
    const width = 100 * currentIndex; // 每页的宽度滑动
    animationControls.start({
      x: `-${width}%`,
      transition: { duration: 0.5, ease: 'easeInOut' },
    });
    resetAutoplay();
  }, [currentIndex, animationControls, resetAutoplay]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides */}
      <motion.div
        className="flex w-full"
        animate={animationControls}
        initial={{ x: 0 }}
      >
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <div key={pageIndex} className="flex-none w-full flex">
            {images.slice(pageIndex * imagesPerPage, (pageIndex + 1) * imagesPerPage).map((img, index) => (  
              <div key={index} className="flex-none w-1/6">
                <Link  href={`/blog/`+ img.id}>
                <Image 
                    src={'/thumbnail/'+ img.id +'.png'} 
                    alt={`slide-${pageIndex * imagesPerPage + index}`}
                    className="w-full h-36 object-cover"
                    width= {360}
                    height= {400}
                    title= {img.name}
                /></Link>
              </div>  
            ))}
          </div>
        ))}
      </motion.div>

      {/* Arrows */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-pink-600 text-white rounded-full p-2"
        onClick={handlePrev}
      >
        ←
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-pink-600 text-white rounded-full p-2"
        onClick={handleNext}
      >
        →
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <div
            key={pageIndex}
            onClick={() => setCurrentIndex(pageIndex)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentIndex === pageIndex ? 'bg-pink-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
   