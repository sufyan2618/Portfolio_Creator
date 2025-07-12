import React from 'react'

const DesignCard = () => {

    const handleRouting = () => {
    // Navigate to the design details page
    window.open('/designs/design1/index.html', '_blank')
    }


  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto">
      <img
        src="/portImages/Portfolio1.png"
        alt="Design Thumbnail"
        className="w-full h-40 object-cover rounded-t-lg mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">Design Title</h2>
      <p className="text-gray-600 mb-4">
        A brief description of the design goes here. It should be concise and informative.
      </p>
      <button onClick={handleRouting} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
        View Design
      </button>     
    </div>
  )
}

export default DesignCard