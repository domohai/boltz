import { Image } from '@nextui-org/image';

const Banner = () => {
  return (
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
        <Image 
          src="/assets/images/banner.jpg" 
          alt="BoltZ Background" 
          className="w-[700px] object-cover cursor-pointer" 
        />
      </div>
    </div>
  );
};

export default Banner;