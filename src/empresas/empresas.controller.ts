/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('empresas')
export class EmpresasController {
  constructor(
    private readonly empresasService: EmpresasService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  create(@Headers('x-api-token') token: string, @Body() createEmpresaDto: CreateEmpresaDto) {
    if (!token) {
      throw new UnauthorizedException('Token não Enviado');
    }
    this.authService.validateToken(token);

    return this.empresasService.create(createEmpresaDto);
  }

  @Get()
  findAll(
    @Headers('x-api-token') token: string,
    @Query('cnpj') cnpj?: string,
    @Query('razaoSocial') razaoSocial?: string,
    @Query('nomeFantasia') nomeFantasia?: string,
    @Query('inscricaoEstadual') inscricaoEstadual?: string,
  ) {
    if (!token) {
      throw new UnauthorizedException('Token não Enviado');
    }
    this.authService.validateToken(token);

    return this.empresasService.findAll(cnpj, razaoSocial, nomeFantasia, inscricaoEstadual);
  }

  @Get(':id')
  findOne(@Headers('x-api-token') token: string, @Param('id') id: string) {
    if (!token) {
      throw new UnauthorizedException('Token não Enviado');
    }
    this.authService.validateToken(token);

    return this.empresasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Headers('x-api-token') token: string,
    @Param('id') id: string,
    @Body() updateEmpresaDto: UpdateEmpresaDto,
  ) {
    if (!token) {
      throw new UnauthorizedException('Token não Enviado');
    }
    this.authService.validateToken(token);

    return this.empresasService.update(+id, updateEmpresaDto);
  }

  @Delete(':id')
  remove(@Headers('x-api-token') token: string, @Param('id') id: string) {
    if (!token) {
      throw new UnauthorizedException('Token não Enviado');
    }
    this.authService.validateToken(token);

    return this.empresasService.remove(+id);
  }
}