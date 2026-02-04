import { useState } from 'react';
import coffeeData from '../data/coffee-reference.json';

interface CoffeeReference {
  brand: string;
  type: string;
  outerBurr: number;
  innerBurr: number;
  grams: number;
}

export default function CoffeeReference() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'brand' | 'grams' | 'outerBurr'>('brand');

  const filteredData = coffeeData.filter((coffee: CoffeeReference) =>
    coffee.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coffee.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === 'brand') {
      return a.brand.localeCompare(b.brand);
    } else if (sortBy === 'grams') {
      return b.grams - a.grams;
    } else {
      return b.outerBurr - a.outerBurr;
    }
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          Brewing Fundamentals
        </h2>
        <p className="text-neutral-600">
          Professional burr grinder settings and dosing recommendations for various coffee brands
        </p>
      </div>

      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search coffee brands or types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-warm-50"
          />
          <svg className="absolute right-3 top-2.5 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-neutral-700">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'brand' | 'grams' | 'outerBurr')}
            className="px-3 py-2 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-warm-50"
          >
            <option value="brand">Brand</option>
            <option value="grams">Dose (grams)</option>
            <option value="outerBurr">Outer Burr</option>
          </select>
        </div>
      </div>

      {/* Coffee Reference Table */}
      <div className="bg-white rounded-xl shadow-lg border border-warm-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary-50 border-b border-warm-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Brand</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Type</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-neutral-900">
                  <div className="flex flex-col">
                    <span>Outer Burr</span>
                    <span className="text-xs font-normal text-neutral-600">Setting</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-neutral-900">
                  <div className="flex flex-col">
                    <span>Inner Burr</span>
                    <span className="text-xs font-normal text-neutral-600">Setting</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-neutral-900">
                  <div className="flex flex-col">
                    <span>Dose</span>
                    <span className="text-xs font-normal text-neutral-600">Grams</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-100">
              {sortedData.map((coffee, index) => (
                <tr key={index} className="hover:bg-warm-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-neutral-900">{coffee.brand}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-neutral-700">{coffee.type}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-primary-100 text-primary-700 rounded-full font-bold">
                      {coffee.outerBurr}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-warm-100 text-neutral-700 rounded-full font-bold">
                      {coffee.innerBurr}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-10 bg-accent-100 text-accent-700 rounded-full font-bold">
                      {coffee.grams}g
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-warm-50 rounded-lg p-6 border border-warm-200">
        <h3 className="font-semibold text-neutral-900 mb-3">Grinder Settings Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary-100 rounded-full"></div>
            <span><strong>Outer Burr:</strong> Coarseness setting (lower = finer)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-warm-100 rounded-full"></div>
            <span><strong>Inner Burr:</strong> Fine adjustment (typically 4)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-accent-100 rounded-full"></div>
            <span><strong>Dose:</strong> Coffee weight in grams</span>
          </div>
        </div>
        <p className="text-neutral-600 mt-3 text-sm">
          These settings are optimized for espresso brewing. Adjust according to your taste preferences and equipment.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-warm-200 text-center">
          <div className="text-2xl font-bold text-primary-600">{coffeeData.length}</div>
          <div className="text-sm text-neutral-600">Coffee Varieties</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-warm-200 text-center">
          <div className="text-2xl font-bold text-primary-600">
            {new Set(coffeeData.map(c => c.brand)).size}
          </div>
          <div className="text-sm text-neutral-600">Brands</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-warm-200 text-center">
          <div className="text-2xl font-bold text-primary-600">
            {Math.min(...coffeeData.map(c => c.grams))}-{Math.max(...coffeeData.map(c => c.grams))}g
          </div>
          <div className="text-sm text-neutral-600">Dose Range</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-warm-200 text-center">
          <div className="text-2xl font-bold text-primary-600">
            {Math.min(...coffeeData.map(c => c.outerBurr))}-{Math.max(...coffeeData.map(c => c.outerBurr))}
          </div>
          <div className="text-sm text-neutral-600">Burr Range</div>
        </div>
      </div>
    </div>
  );
}