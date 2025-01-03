"use client"
import { API_URL } from '@/base/Api/Api';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Category {
  CatID: number;
  CatName: string;
  CatDesc: string;
  CatIcon: string;
}

const BlogDetailsCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/GetCategory`)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <aside className="w-full max-w-md p-8 mr-40 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <h3 className="font-bold text-2xl mb-8 text-gray-900">Categories</h3>
      <ul className="divide-y divide-gray-200">
        {categories.map((category) => (
          <li key={category.CatID} className="py-4 last:pb-0 first:pt-0 transform hover:translate-x-2 transition-transform duration-200 ease-out">
            <a href={`/Category/${category.CatName}`} className="flex items-center space-x-4">
              <Image src={category.CatIcon || "https://placehold.co/400"} alt={`Category Icon ${category.CatName}`} className="flex-shrink-0 w-12 h-12 rounded-full object-cover shadow-sm" width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }} />
              <div>
                <p className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-150 ease-in-out">{category.CatName}</p>
                <p className="text-sm text-gray-500">{category.CatDesc}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default BlogDetailsCategories;
