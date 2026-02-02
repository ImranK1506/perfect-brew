import type { APIRoute } from 'astro';
import { claudeService } from '../../services/claude';
import type { RecommendationRequest, RecommendationResponse, CoffeeBean, BrewingMachine } from '../../types';

// Sample data (same as in the component)
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

// Fallback recommendations for when AI is unavailable
const fallbackRecommendations = {
  'dark-espresso': {
    temperature: { fahrenheit: 200, celsius: 93 },
    grindSize: 'fine',
    brewTime: { minutes: 0, seconds: 25 },
    waterRatio: { coffee: 1, water: 2, description: '1:2 ratio' },
    explanation: 'Dark roast with espresso requires slightly lower temperature to avoid over-extraction and bitter flavors.'
  },
  'medium-espresso': {
    temperature: { fahrenheit: 205, celsius: 96 },
    grindSize: 'fine',
    brewTime: { minutes: 0, seconds: 30 },
    waterRatio: { coffee: 1, water: 2, description: '1:2 ratio' },
    explanation: 'Medium roast with espresso benefits from higher temperature for optimal extraction.'
  },
  'dark-pour-over': {
    temperature: { fahrenheit: 195, celsius: 90 },
    grindSize: 'medium-coarse',
    brewTime: { minutes: 4, seconds: 0 },
    waterRatio: { coffee: 1, water: 15, description: '1:15 ratio' },
    explanation: 'Dark roast pour-over needs lower temperature and shorter contact time to prevent over-extraction.'
  },
  'medium-pour-over': {
    temperature: { fahrenheit: 205, celsius: 96 },
    grindSize: 'medium',
    brewTime: { minutes: 4, seconds: 30 },
    waterRatio: { coffee: 1, water: 16, description: '1:16 ratio' },
    explanation: 'Medium roast pour-over allows for higher temperature and longer extraction time.'
  },
  'default': {
    temperature: { fahrenheit: 200, celsius: 93 },
    grindSize: 'medium',
    brewTime: { minutes: 4, seconds: 0 },
    waterRatio: { coffee: 1, water: 15, description: '1:15 ratio' },
    explanation: 'Balanced brewing parameters suitable for most coffee and equipment combinations.'
  }
};

function getFallbackRecommendation(bean: CoffeeBean, machine: BrewingMachine) {
  const roastLevel = bean.roastLevel;
  const machineType = machine.type;
  
  const key = `${roastLevel}-${machineType}` as keyof typeof fallbackRecommendations;
  return fallbackRecommendations[key] || fallbackRecommendations.default;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: RecommendationRequest = await request.json();
    const { beanId, machineId } = body;

    // Find the selected bean and machine
    const selectedBean = sampleBeans.find(bean => bean.id === beanId);
    const selectedMachine = sampleMachines.find(machine => machine.id === machineId);

    if (!selectedBean || !selectedMachine) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid bean or machine selection'
        } as RecommendationResponse),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    let recommendation;
    let fallbackUsed = false;

    try {
      // Try to get AI recommendation first
      const isAIAvailable = await claudeService.isAvailable();
      
      if (isAIAvailable) {
        recommendation = await claudeService.generateRecommendation(selectedBean, selectedMachine);
      } else {
        throw new Error('AI service not available');
      }
    } catch (error) {
      console.log('AI service failed, using fallback:', error);
      // Use fallback recommendation
      recommendation = getFallbackRecommendation(selectedBean, selectedMachine);
      fallbackUsed = true;
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: recommendation,
        fallbackUsed
      } as RecommendationResponse),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error'
      } as RecommendationResponse),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};