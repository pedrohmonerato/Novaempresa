/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { EmpresasController } from './empresas.controller';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [EmpresasController],
  providers: [EmpresasService, PrismaService, AuthService],
})
export class EmpresasModule {}
