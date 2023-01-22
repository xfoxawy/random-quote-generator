import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return a random quote', async () => {
      expect(await (await appController.randomQuote()).length).toBeGreaterThan(
        1,
      );
    });

    it('should return a random quote by character name', async () => {
      expect(
        await (
          await appController.randomQuoteByCharacter('Pam')
        ).length,
      ).toBeGreaterThan(1);
    });
  });
});
