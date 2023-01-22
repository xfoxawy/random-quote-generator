import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { _ } from 'lodash';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    const quotesBuffer = readFileSync(
      join(process.cwd(), 'src/data/office_quotes.json'),
    );
    const quotes: { quote_id: number; quote: string; character: string }[] =
      JSON.parse(quotesBuffer.toString());
    const charactersMap: Map<string, string[]> = new Map<
      string,
      Array<string>
    >();
    quotes.forEach((q) => {
      if (charactersMap[q.character]) {
        const quotesArray: string[] = charactersMap[q.character];
        charactersMap[q.character] = [...quotesArray, q.quote];
      } else {
        charactersMap[q.character] = [q.quote];
      }
    });
    this.cacheManager.set('quotes', quotes);
    this.cacheManager.set('characters', charactersMap);
  }

  async getRandomQuote(): Promise<string> {
    const cachedQuotes: any[] = await this.cacheManager.get('quotes');
    const randomID = _.random(0, cachedQuotes.length);
    return Promise.resolve(cachedQuotes[randomID].quote);
  }

  async getRandomQuoteByCharacter(name: string): Promise<string> {
    const characterMap: Map<string, string[]> = await this.cacheManager.get(
      'characters',
    );
    if (characterMap && characterMap[name]) {
      const randomID = _.random(0, characterMap[name].length - 1);
      return characterMap[name][randomID];
    }
    return Promise.reject('unknown character');
  }
}
