'use client';

import { FaCheckSquare } from 'react-icons/fa';

export default function FutureBuilding() {
  const features = [
    { title: 'AI-Powered DApps', description: 'Creating AI-driven decentralized applications across industries.' },
    { title: 'Data Marketplace', description: 'A secure platform for AI model training & data sharing.' },
    { title: 'DeFi & AI Integration', description: 'AI-enhanced financial services, lending, and automated trading.' },
    { title: 'Autonomous Smart Contracts', description: 'AI-enhanced decision-making in blockchain transactions.' },
    { title: 'Enterprise Solutions', description: 'Bringing AI-powered automation to businesses worldwide.' }
  ];

  return (
    <div className=" text-white flex justify-center my-36 px-6">
      <div className="text-center">
      <h2 className="text-white font-bold text-[40px] md:text-[60px]  leading-tight">           The Future We&apos;re Building</h2>
      <p className="mt-2 text-gray-400 text-lg md:text-xl">
           Once the ICO phase is complete, we will begin the development of our cutting-edge AI ecosystem
         </p>
         <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-3  text-left">
          {features.map((feature, index) => (
            <>
              <div key={`title-${index}`} className="flex items-center space-x-5">
                <FaCheckSquare className="text-[#14e266] text-2xl" />
                <p className="font-semibold text-lg text-white">{feature.title} :</p>
              </div>
              <p key={`desc-${index}`} className="text-gray-300 text-base">{feature.description}</p>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
