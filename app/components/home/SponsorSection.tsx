import React from 'react';
import Image from 'next/image';

const SponsorSection: React.FC = () => {
    return (
        <div className="flex flex-col items-center mt-10 bg-slate-800 p-6">
            <h2 className='text-5xl text-white mb-4'>Sponsor</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4 w-full">
                <div className="flex justify-center">
                    <Image src="/assets/backgroundfilthy.gif" alt="Image 1" className="rounded-lg" width={300} height={200} unoptimized />
                </div>
                <div className="flex justify-center">
                    <Image src="/assets/backgroundfilthy.gif" alt="Image 2" className="rounded-lg" width={300} height={200} unoptimized />
                </div>
                <div className="flex justify-center">
                    <Image src="/assets/backgroundfilthy.gif" alt="Image 3" className="rounded-lg" width={300} height={200} unoptimized />
                </div>
                <div className="flex justify-center">
                    <Image src="/assets/backgroundfilthy.gif" alt="Image 4" className="rounded-lg" width={300} height={200} unoptimized />
                </div>
                <div className="flex justify-center">
                    <Image src="/assets/backgroundfilthy.gif" alt="Image 5" className="rounded-lg" width={300} height={200} unoptimized />
                </div>
            </div>
        </div>
    );
};

export default SponsorSection;