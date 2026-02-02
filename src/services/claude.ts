import Anthropic from '@anthropic-ai/sdk';
import type { CoffeeBean, BrewingMachine, BrewingRecommendation } from '../types';

const anthropic = new Anthropic({
  apiKey: import.meta.env.ANTHROPIC_API_KEY,
});

export class ClaudeService {
  async generateRecommendation(
    bean: CoffeeBean,
    machine: BrewingMachine
  ): Promise<BrewingRecommendation> {
    const systemPrompt = `You are a professional coffee brewing expert. Generate precise brewing recommendations based on the coffee bean and brewing equipment provided. Always respond with a valid JSON object matching the exact structure requested.`;

    const userPrompt = `Generate brewing recommendations for:

Coffee Bean:
- Brand: ${bean.brand}
- Origin: ${bean.origin}
- Roast Level: ${bean.roastLevel}
- Flavor Profile: ${bean.flavorProfile.join(', ')}

Brewing Equipment:
- Type: ${machine.type}
- Brand: ${machine.brand}
- Model: ${machine.model}

Please provide a JSON response with this exact structure:
{
  "temperature": {
    "fahrenheit": number,
    "celsius": number
  },
  "grindSize": "string (e.g., 'medium-fine', 'coarse', etc.)",
  "brewTime": {
    "minutes": number,
    "seconds": number
  },
  "waterRatio": {
    "coffee": number,
    "water": number,
    "description": "string (e.g., '1:16 ratio')"
  },
  "explanation": "string explaining why these parameters work best for this combination"
}

Consider the roast level, brewing method, and flavor profile to optimize extraction.`;

    try {
      const response = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        temperature: 0.3,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
      });

      const content = response.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response type from Claude');
      }

      // Parse the JSON response
      const recommendation = JSON.parse(content.text);
      
      // Validate the response structure
      if (!this.validateRecommendation(recommendation)) {
        throw new Error('Invalid recommendation structure from Claude');
      }

      return recommendation;
    } catch (error) {
      console.error('Claude API error:', error);
      throw new Error('Failed to generate AI recommendation');
    }
  }

  private validateRecommendation(rec: any): rec is BrewingRecommendation {
    return (
      rec &&
      typeof rec === 'object' &&
      rec.temperature &&
      typeof rec.temperature.fahrenheit === 'number' &&
      typeof rec.temperature.celsius === 'number' &&
      typeof rec.grindSize === 'string' &&
      rec.brewTime &&
      typeof rec.brewTime.minutes === 'number' &&
      typeof rec.brewTime.seconds === 'number' &&
      rec.waterRatio &&
      typeof rec.waterRatio.coffee === 'number' &&
      typeof rec.waterRatio.water === 'number' &&
      typeof rec.waterRatio.description === 'string' &&
      typeof rec.explanation === 'string'
    );
  }

  async isAvailable(): Promise<boolean> {
    try {
      // Simple test to check if the API key is configured
      return !!import.meta.env.ANTHROPIC_API_KEY;
    } catch {
      return false;
    }
  }
}

export const claudeService = new ClaudeService();