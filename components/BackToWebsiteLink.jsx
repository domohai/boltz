// components/BackToWebsiteLink.jsx
import React from 'react';
import Link from 'next/link';

const BackToWebsiteLink = () => {
  return (
    <Link href="/" className="mt-10 w-fit text-zinc-950 dark:text-white">
      <div className="flex w-fit items-center lg:pl-0 lg:pt-0 xl:pt-0">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 320 512"
          className="mr-3 h-[13px] w-[8px] text-zinc-950 dark:text-white"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path>
        </svg>
        <p className="ml-0 text-sm text-zinc-950 dark:text-white">Back to the website</p>
      </div>
    </Link>
  );
};

export default BackToWebsiteLink;