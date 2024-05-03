"use client";

import styles from "styles/template/mainSwiper.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import ChatBotMain from "template/chatBot/chatBotMain";
import ChatMain from "template/chat/chatMain";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function MainSwiper() {
  return (
    <div className={styles.wrapper}>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        autoHeight={true}
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <ChatMain />
        </SwiperSlide>
        <SwiperSlide>
          <ChatBotMain />
        </SwiperSlide>
        <SwiperSlide>slide 3</SwiperSlide>
      </Swiper>
    </div>
  );
}
