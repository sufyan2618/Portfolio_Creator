import React, { useEffect } from 'react'
import DesignCard from '../components/DesignCard'
import useDesignStore from '../Store/useDesignStore'
const Designs = () => {

  const { FetchDesigns, designs, isFetchingDesigns } = useDesignStore();
  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        await FetchDesigns();
      } catch (error) {
        console.error('Error fetching designs:', error);
      }
    };
    fetchDesigns();

  } , [FetchDesigns]);
  



  return (
    <>
       <div>
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6 py-12 md:py-24">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Designs</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Explore our collection of stunning designs.</p>
            </div>
            </div>
        </section>
    </div>
      <DesignCard/>
    </>
  )
}

export default Designs