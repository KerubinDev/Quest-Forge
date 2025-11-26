import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('health check', () => {
    it('should return health check object', () => {
      const result = appController.getHealthCheck();
      expect(result).toHaveProperty('status', 'ok');
      expect(result).toHaveProperty('message', 'QuestForge API is running');
      expect(result).toHaveProperty('timestamp');
    });
  });
});
