import React, { useState, useEffect, useRef } from 'react';
import { useGetProductsQuery, Product } from '@/service/api';
import { fuzzySearch } from '@/utils/fuzzySearch';
import Image from 'next/image';
import Link from 'next/link';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const { data: products } = useGetProductsQuery();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchTerm('');
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (products && searchTerm) {
      const results = fuzzySearch(products, ['title', 'description', 'category'], searchTerm)
        .slice(0, 5)
        .map(scoredItem => scoredItem.item);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, products]);

  return (
    <div className="relative" ref={searchRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        className="w-full p-2 border rounded-md"
      />
      {searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto no-scrollbar">
          {searchResults.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <div className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={40}
                  height={40}
                  className="object-contain mr-2"
                />
                <div>
                  <p className="font-semibold truncate">{product.title}</p>
                  <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;