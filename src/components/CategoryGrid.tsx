import { useNavigate } from 'react-router-dom'; // Not using router, so we'll use scroll logic
import { useEffect, useRef } from 'react';

interface Category {
  name: string;
  image: string;
  count: number;
}

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  const scrollToCategory = (categoryName: string) => {
    const element = document.getElementById(`category-${categoryName}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => scrollToCategory(category.name)}
          className="group text-left focus:outline-none"
        >
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-slate-800 border border-slate-700 group-hover:border-amber-500/50 transition-colors">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-bold text-lg leading-tight mb-1">
                {category.name}
              </h3>
              <p className="text-slate-300 text-sm">
                {category.count} product{category.count !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}