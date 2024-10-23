import React from 'react';

const Banner = () => {
  return (
    // <div className="relative w-scren h-screen">
    //     <div className="absolute inset-y-0 right-0 w-1/2 h-3/4 flex items-center justify-normal">
    //         <img 
    //         src="/assets/images/banner.jpg" 
    //         alt="BoltZ Background" 
    //         className="w-full h-full object-cover" 
    //         />
    //     </div>
    //     <div className="absolute inset-y-0 mt-12 left-0 w-1/2 h-1/2 flex items-center justify-center">
    //     <div className="bg-white py-8 px-6">
    //     <h1 className="text-4xl font-bold text-gray-800 mb-4">FAST & FREE DELIVERY</h1>
    //     <p className="text-gray-600 mb-6">
    //         Speedy Delivery, Right to Your Door!
    //     </p>
    //     </div>
    //     </div>
    // </div>

    <div className="flex w-scren h-fit flex-row justify-center gap-32 mt-[4rem]">
    
        <div className="flex items-center justify-center ">
            <div className="bg-white py-8 px-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">FAST & FREE DELIVERY</h1>
                <p className="text-gray-600 mb-6">
                    Speedy Delivery, Right to Your Door!
                </p>
            </div>
    </div>

    <div className="flex items-center justify-normal">
        <img 
        src="/assets/images/banner.jpg" 
        alt="BoltZ Background" 
        className="w-[700px] object-cover cursor-pointer" 
        />
    </div>
</div>
  );
};

export default Banner;