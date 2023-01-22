import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/quotes')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/random')
  async randomQuote(): Promise<string> {
    return await this.appService.getRandomQuote();
  }

  @Get('/:character')
  async randomQuoteByCharacter(@Param() params): Promise<string> {
    return await this.appService.getRandomQuoteByCharacter(params.character);
  }
}
