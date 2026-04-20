import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Image from '@/app/components/ui/Image'
import Link from '@/app/components/ui/Link'
interface CarouselProps {
  images: { id: string; name: string }[] // 图片数组
  autoplay?: boolean // 是否自动播放
  autoplayDelay?: number // 自动播放间隔时间
  loop?: boolean // 是否循环
  imagesPerPage?: number // 每页显示的图片数量
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoplay = true,
  autoplayDelay = 12000,
  loop = true,
  imagesPerPage = 6, // 默认每页显示6张图片
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const animationControls = useAnimation()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const totalPages = Math.ceil(images.length / imagesPerPage) // 计算总页数
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalPages) // 循环到第一页
  }, [totalPages])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages) // 循环到最后一页
  }, [totalPages])

  const resetAutoplay = useCallback(() => {
    if (autoplay && timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(handleNext, autoplayDelay)
    }
  }, [autoplay, autoplayDelay, handleNext])

  useEffect(() => {
    if (autoplay) {
      timeoutRef.current = setTimeout(handleNext, autoplayDelay)
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [autoplay, autoplayDelay, handleNext])

  useEffect(() => {
    const width = 100 * currentIndex // 每页的宽度滑动
    animationControls.start({
      x: `-${width}%`,
      transition: { duration: 0.5, ease: 'easeInOut' },
    })
    resetAutoplay()
  }, [currentIndex, animationControls, resetAutoplay])

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides */}
      <motion.div className="flex w-full" animate={animationControls} initial={{ x: 0 }}>
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <div key={pageIndex} className="flex w-full flex-none">
            {images
              .slice(pageIndex * imagesPerPage, (pageIndex + 1) * imagesPerPage)
              .map((img, index) => (
                <div key={index} className="w-1/6 flex-none">
                  <Link href={`/blog/` + img.id}>
                    <Image
                      src={'/thumbnail/' + img.id + '.png'}
                      alt={`slide-${pageIndex * imagesPerPage + index}`}
                      className="h-36 w-full object-cover"
                      width={360}
                      height={400}
                      title={img.name}
                    />
                  </Link>
                </div>
              ))}
          </div>
        ))}
      </motion.div>

      {/* Arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-pink-600 p-2 text-white"
        onClick={handlePrev}
      >
        ←
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-pink-600 p-2 text-white"
        onClick={handleNext}
      >
        →
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => setCurrentIndex(pageIndex)}
            aria-label={`Go to page ${pageIndex + 1}`}
            className={`h-3 w-3 cursor-pointer rounded-full ${
              currentIndex === pageIndex ? 'bg-pink-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
