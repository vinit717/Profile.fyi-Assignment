import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useGetProductsQuery, useGetCategoriesQuery, Product } from '@/service/api';
import ProductCard from '@/components/Product/ProductCard';
import CategoryFilter from '@/components/Product/CategoryFilter';

const App: React.FC = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const { data: categories } = useGetCategoriesQuery();
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const productsPerPage = 8;

  useEffect(() => {
    let filtered = products ? [...products] : []; 
  
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
  
    if (sortOrder === 'asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }
  
    setFilteredProducts(filtered);
  }, [products, selectedCategory, sortOrder]);
  

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };


  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <Layout title="Home | E-commerce">
      <div className="container mx-auto px-4 py-8">
        <CategoryFilter 
          categories={categories || []} 
          selectedCategory={selectedCategory} 
          onSelectCategory={handleCategorySelect} 
        />
        <div className="mb-4">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded px-4 py-2"
          >
            <option value="asc">Sort by Price: Low to High</option>
            <option value="desc">Sort by Price: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex justify-between mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={indexOfLastProduct >= filteredProducts.length}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default App;
