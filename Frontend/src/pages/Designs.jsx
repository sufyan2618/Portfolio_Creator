import React, { useEffect } from 'react';
import DesignCard from '../components/DesignCard';
import useDesignStore from '../Store/useDesignStore';

const Designs = () => {
  const { FetchDesigns, designs, isFetchingDesigns } = useDesignStore();

  useEffect(() => {
    // This useEffect will run once and fetch the designs
    FetchDesigns();
  }, [FetchDesigns]);

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 py-12 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Designs</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Explore our collection of stunning designs.</p>
          </div>
        </div>
      </section>

      {/* Add a container for the design cards */}
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isFetchingDesigns ? (
          <p className="text-center col-span-full">Loading designs...</p>
        ) : (
          // Map over the designs array and render a card for each one
          designs.map((design) => (
            <DesignCard key={design._id} design={design} />
          ))
        )}
      </div>
    </div>
  );
};

export default Designs;
