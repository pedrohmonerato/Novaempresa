/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpresasModule } from './empresas/empresas.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EmpresasModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
