"use client";

import styles from "styles/template/mainSwiper.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import ChatBotMain from "template/chatBot/chatBotMain";
import ChatMain from "template/chat/chatMain";
import RecoFunctionMain from "template/recoFunction/recoFunctionMain";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function MainSwiper() {
  return (
    <div className={styles.mainSwiper}>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        autoHeight={true}
        // navigation
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <RecoFunctionMain />
        </SwiperSlide>
        <SwiperSlide>
          <ChatBotMain />
        </SwiperSlide>
        <SwiperSlide>
          <ChatMain />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
