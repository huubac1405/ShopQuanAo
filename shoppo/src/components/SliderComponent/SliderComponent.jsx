// import React from 'react'
import {Image} from 'antd'
import Slider from 'react-slick'
import PropTypes from 'prop-types';
const SliderComponent = ({arrImages}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <Slider {...settings}>
        {arrImages.map((image, index) => (
  <div key={index}>
    <Image src={image} alt={`slider-${index}`} preview={false} width="100%"/>
  </div>
))}

    </Slider>
  )
};
SliderComponent.propTypes = {
  arrImages: PropTypes.array.isRequired, // Kiểm tra props
};

export default SliderComponent