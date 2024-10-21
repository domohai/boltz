import React from 'react';

const Banner = () => {
  return (
<div className="relative w-scren h-screen">
    <div className="absolute inset-y-0 right-0 w-1/2 h-3/4 flex items-center justify-normal">
        <img 
          src="/assets/images/banner.jpg" 
          alt="BoltZ Background" 
          className="w-full h-full object-cover" 
        />
    </div>
    <div className="absolute inset-y-0 mt-12 left-0 w-1/2 h-1/2 flex items-center justify-center">
    <div className="bg-white py-8 px-6 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">FAST & FREE DELIVERY</h1>
      <p className="text-gray-600 mb-6">
        Speedy Delivery, Right to Your Door!
      </p>
      <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md">
        READ MORE
      </button>
    </div>
    </div>
</div>
  );
};

export default Banner;