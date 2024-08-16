import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useGetProductsQuery, useGetCategoriesQuery, Product } from '@/service/api';
import ProductCard from '@/components/Product/ProductCard';
import CategoryFilter from '@/components/Product/CategoryFilter';
import Pagination from '@/components/Pagination';

const App: React.FC = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const { data: categories } = useGetCategoriesQuery();
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const productsPerPage = 8;

  useEffect(() => {
    if (products) {
      let filtered = [...products];
      if (selectedCategory) {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }
      filtered.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
      setFilteredProducts(filtered);
      setCurrentPage(1);
    }
  }, [products, selectedCategory, sortOrder]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  const handleCategorySelect = (category: string) => setSelectedCategory(category);
  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

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
          {Array.from({ length: productsPerPage }).map((_, index) => (
            <ProductCard key={index} isLoading={isLoading} product={isLoading ? undefined : currentProducts[index]} />
          ))}
        </div>
        {!isLoading && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </Layout>
  );
};

export default App;
