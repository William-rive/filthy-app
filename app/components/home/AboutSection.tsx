import React from 'react';
import Image from 'next/image';

const AboutSection: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row items-center p-10 bg-white mt-10">
            <div className="md:w-1/2 p-10">
                <Image src="/assets/filthy.png" alt="filthy inc logo" className="rounded-lg" width={800} height={800} />
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0 md:ml-6 p-10">
                <h2 className="text-5xl font-bold mb-4">About us</h2>
                <p className="text-gray-700 mb-4">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo modi unde eveniet ut ad odit, a dolores natus
                    nisi provident, veniam corporis et possimus illo voluptatibus maxime molestiae. Reprehenderit, similique.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum culpa amet, voluptas molestiae asperiores
                    illum omnis quis commodi fugit, deleniti, mollitia harum ad aliquam non quam esse libero. Provident, harum?
                </p>
            </div>
        </div>
    );
};

export default AboutSection;