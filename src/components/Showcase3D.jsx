import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const Showcase3D = () => {
    const images = [
        "/images/slide1.png", // 3D Dashboard
        "/images/slide2.png", // 3D Mobile App
        "/images/project1.png", // E-Commerce
        "/images/project2.png", // Task Manager
        "/images/project3.png"  // Weather App
    ];

    return (
        <section className="py-20 bg-neutral-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">Visual Showcase</h2>

                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="w-full py-12"
                    style={{
                        '--swiper-pagination-color': '#3b82f6',
                        '--swiper-pagination-bullet-inactive-color': '#404040',
                    }}
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index} className="w-[300px] sm:w-[400px] md:w-[500px] bg-center bg-cover rounded-xl overflow-hidden border border-neutral-800">
                            <div className="aspect-video relative">
                                <img src={img} alt={`Showcase ${index + 1}`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Showcase3D;
