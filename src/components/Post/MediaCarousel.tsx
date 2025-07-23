import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Box } from '@mui/material';

interface MediaCarouselProps {
  media: string[];
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({ media }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      style={{ width: '100%', height: '100%' }}
    >
      {media.map((url, index) => {
        const isVideo = url.match(/\.(mp4|webm|ogg)$/i);

        return (
          <SwiperSlide key={index}>
            <Box sx={{ width: '100%', height: '100%', aspectRatio: '1 / 1', overflow: 'hidden' }}>
              {isVideo ? (
                <video controls style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                  <source src={url} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={url}
                  alt={`media-${index}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </Box>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
export default MediaCarousel;