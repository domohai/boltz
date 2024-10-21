import React from 'react';

const Banner = () => {
  return (
    <div className="w-screen h-screen overflow-hidden">
    <img 
      src="/assets/images/banner.jpg" 
      alt="BoltZ Background" 
      className="w-full h-full object-cover" 
    />
  </div>
  );
};

export default Banner;