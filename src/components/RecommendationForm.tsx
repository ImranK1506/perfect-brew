import React, { useState } from 'react';

interface CoffeeBean {
  id: string;
  brand: string;
  origin: string;
  roastLevel: 'medium' | 'dark';
  flavorProfile: string[];
}

interface BrewingMachine {
  id: string;
  type: 'espresso' | 'pour-over' | 'french-press' | 'aeropress' | 'drip' | 'full-automatic';
  brand: string;
  model: string;
}

interface BrewingRecommendation {
  temperature: {
    fahrenheit: number;
    celsius: number;
  };
  grindSize: string;
  brewTime: {
    minutes: number;
    seconds: number;
  };
  waterRatio: {
    coffee: number;
    water: number;
    description: string;
  };
  explanation: string;
}

const sampleBeans: CoffeeBean[] = [
  {
    id: '1',
    brand: 'Dark Roast',
    origin: 'Australian',
    roastLevel: 'dark',
    flavorProfile: ['bold', 'smoky', 'rich']
  },
  {
    id: '2',
    brand: 'Medium Roast',
    origin: 'Australian',
    roastLevel: 'medium',
    flavorProfile: ['balanced', 'smooth', 'caramel']
  },
  {
    id: '3',
    brand: 'Illy',
    origin: 'Brazil',
    roastLevel: 'medium',
    flavorProfile: ['smooth', 'nutty', 'classic']
  },
  {
    id: '4',
    brand: 'Illy',
    origin: 'Guatemala',
    roastLevel: 'dark',
    flavorProfile: ['rich', 'chocolatey', 'full-bodied']
  }
];

const sampleMachines: BrewingMachine[] = [
  {
    id: '1',
    type: 'pour-over',
    brand: 'Hario',
    model: 'V60'
  },
  {
    id: '2',
    type: 'french-press',
    brand: 'Bodum',
    model: 'Chambord'
  },
  {
    id: '3',
    type: 'espresso',
    brand: 'Breville/Sage',
    model: 'Barista Express'
  },
  {
    id: '4',
    type: 'espresso',
    brand: 'Breville/Sage',
    model: 'Barista Pro'
  },
  {
    id: '5',
    type: 'espresso',
    brand: 'De\'Longhi',
    model: 'La Specialista'
  },
  {
    id: '6',
    type: 'full-automatic',
    brand: 'Jura',
    model: 'E8'
  },
  {
    id: '7',
    type: 'full-automatic',
    brand: 'Saeco',
    model: 'PicoBaristo'
  },
  {
    id: '8',
    type: 'espresso',
    brand: 'Gaggia',
    model: 'Classic Pro'
  },
  {
    id: '9',
    type: 'aeropress',
    brand: 'AeroPress',
    model: 'Original'
  }
];

export default function RecommendationForm() {
  const [selectedBean, setSelectedBean] = useState<CoffeeBean | null>(null);
  const [selectedMachine, setSelectedMachine] = useState<BrewingMachine | null>(null);
  const [recommendation, setRecommendation] = useState<BrewingRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendation = async () => {
    if (!selectedBean || !selectedMachine) {
      setError('Please select both a coffee bean and brewing machine');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          beanId: selectedBean.id,
          machineId: selectedMachine.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendation');
      }

      const data = await response.json();
      if (data.success) {
        setRecommendation(data.data);
      } else {
        throw new Error(data.error || 'Failed to get recommendation');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Bean Selection */}
      <div>
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
            <span className="text-primary-600 font-bold text-sm">1</span>
          </div>
          <h3 className="text-xl font-semibold text-neutral-900">
            Choose Your Coffee Bean
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sampleBeans.map((bean) => (
            <button
              key={bean.id}
              onClick={() => setSelectedBean(bean)}
              className={`group p-6 border-2 rounded-xl text-left transition-all duration-200 hover:shadow-lg ${
                selectedBean?.id === bean.id
                  ? 'border-primary-500 bg-primary-50 shadow-lg'
                  : 'border-neutral-200 hover:border-primary-300 bg-white'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-neutral-900 text-lg">
                  {bean.brand}
                </h4>
                {selectedBean?.id === bean.id && (
                  <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-primary-600 font-medium mb-2">{bean.origin}</p>
              <p className="text-sm text-neutral-600 capitalize mb-3">
                {bean.roastLevel} roast
              </p>
              <div className="flex flex-wrap gap-1">
                {bean.flavorProfile.map((flavor, index) => (
                  <span key={index} className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
                    {flavor}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Machine Selection */}
      <div>
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center mr-3">
            <span className="text-accent-600 font-bold text-sm">2</span>
          </div>
          <h3 className="text-xl font-semibold text-neutral-900">
            Select Your Brewing Equipment
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sampleMachines.map((machine) => (
            <button
              key={machine.id}
              onClick={() => setSelectedMachine(machine)}
              className={`group p-6 border-2 rounded-xl text-left transition-all duration-200 hover:shadow-lg ${
                selectedMachine?.id === machine.id
                  ? 'border-accent-500 bg-accent-50 shadow-lg'
                  : 'border-neutral-200 hover:border-accent-300 bg-white'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-neutral-900 text-lg">
                  {machine.brand} {machine.model}
                </h4>
                {selectedMachine?.id === machine.id && (
                  <div className="w-5 h-5 bg-accent-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-accent-600 font-medium capitalize">
                {machine.type === 'full-automatic' ? 'Fully Automatic' : machine.type.replace('-', ' ')} brewing
              </p>
              <p className="text-sm text-neutral-600 mt-2">
                Perfect for {
                  machine.type === 'pour-over' ? 'precise control' : 
                  machine.type === 'espresso' ? 'rich crema' :
                  machine.type === 'full-automatic' ? 'convenience' :
                  machine.type === 'french-press' ? 'full immersion' :
                  machine.type === 'aeropress' ? 'clean extraction' :
                  'rich extraction'
                }
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Get Recommendation Button */}
      <div className="text-center pt-4">
        <button
          onClick={handleGetRecommendation}
          disabled={!selectedBean || !selectedMachine || loading}
          className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
        >
          {loading ? (
            <>
              <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Brewing Your Perfect Recipe...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              Get My Perfect Brew Recipe
            </>
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
            </svg>
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Recommendation Display */}
      {recommendation && (
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-200 rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">
              Your Perfect Brew Recipe
            </h3>
            <p className="text-neutral-600">
              Optimized for {selectedBean?.brand} {selectedBean?.origin} with {selectedMachine?.brand} {selectedMachine?.model}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-neutral-900">Temperature</h4>
              </div>
              <p className="text-2xl font-bold text-primary-600">
                {recommendation.temperature.fahrenheit}°F
              </p>
              <p className="text-neutral-600 text-sm">
                ({recommendation.temperature.celsius}°C)
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-neutral-900">Grind Size</h4>
              </div>
              <p className="text-2xl font-bold text-primary-600 capitalize">
                {recommendation.grindSize}
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-neutral-900">Brew Time</h4>
              </div>
              <p className="text-2xl font-bold text-primary-600">
                {recommendation.brewTime.minutes}m {recommendation.brewTime.seconds}s
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-neutral-900">Water Ratio</h4>
              </div>
              <p className="text-2xl font-bold text-primary-600">
                {recommendation.waterRatio.description}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="font-semibold text-neutral-900 mb-3 flex items-center">
              <svg className="w-5 h-5 text-accent-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Why This Recipe?
            </h4>
            <p className="text-neutral-700 leading-relaxed">{recommendation.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}