import Anthropic from '@anthropic-ai/sdk';
import { config } from './config';
import { logger } from './logger';

export class AIClient {
  private client: Anthropic;
  private model: string;

  constructor(apiKey?: string, model?: string) {
    this.client = new Anthropic({
      apiKey: apiKey || config.anthropicApiKey,
    });
    this.model = model || config.anthropicModel;
  }

  async generateCompletion(
    prompt: string,
    systemPrompt?: string,
    options?: {
      maxTokens?: number;
      temperature?: number;
    }
  ): Promise<string> {
    try {
      logger.debug(`Generating completion with model: ${this.model}`);

      const response = await this.client.messages.create({
        model: this.model,
        max_tokens: options?.maxTokens || 16000,
        temperature: options?.temperature || 1.0,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const textContent = response.content.find(
        (block) => block.type === 'text'
      );

      if (!textContent || textContent.type !== 'text') {
        throw new Error('No text content in response');
      }

      return textContent.text;
    } catch (error) {
      logger.error('Failed to generate completion', error);
      throw error;
    }
  }

  async generateStructuredOutput<T>(
    prompt: string,
    systemPrompt: string,
    schema?: string
  ): Promise<T> {
    const fullPrompt = schema
      ? `${prompt}\n\nPlease structure your response according to this schema:\n${schema}`
      : prompt;

    const response = await this.generateCompletion(fullPrompt, systemPrompt, {
      maxTokens: 16000,
      temperature: 0.7,
    });

    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = response.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
      const jsonString = jsonMatch ? jsonMatch[1] : response;

      return JSON.parse(jsonString) as T;
    } catch (error) {
      logger.warn('Failed to parse structured output as JSON, returning raw response');
      return response as any;
    }
  }
}

export const aiClient = new AIClient();
