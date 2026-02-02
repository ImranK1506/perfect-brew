export interface CoffeeBean {
  id: string;
  brand: string;
  origin: string;
  roastLevel: 'medium' | 'dark';
  flavorProfile: string[];
}

export interface BrewingMachine {
  id: string;
  type: 'espresso' | 'pour-over' | 'french-press' | 'aeropress' | 'drip' | 'full-automatic';
  brand: string;
  model: string;
}

export interface BrewingRecommendation {
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
  confidence?: number;
}

export interface RecommendationRequest {
  beanId: string;
  machineId: string;
}

export interface RecommendationResponse {
  success: boolean;
  data?: BrewingRecommendation;
  error?: string;
  fallbackUsed?: boolean;
}