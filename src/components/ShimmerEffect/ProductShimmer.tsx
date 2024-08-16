import React from 'react';

const ProductShimmer: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 shadow-md animate-pulse">
      <div className="w-full h-48 bg-gray-300 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-3 bg-gray-300 rounded mb-2 "></div>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        <div className="h-8 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default ProductShimmer;
