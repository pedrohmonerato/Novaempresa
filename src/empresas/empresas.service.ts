/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Empresa } from './entities/empresa.entity';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class EmpresasService {
  constructor(private prisma: PrismaService) {}
  async create(createEmpresaDto: CreateEmpresaDto) : Promise<Empresa> {
    const empresa = await this.prisma.empresas.create({
      data: createEmpresaDto,
    });
    return this.mapToEntity(empresa);
  }

  async findAll(): Promise<Empresa[]> {
    const empresas = await this.prisma.empresas.findMany();
    return empresas.map((empresa) => this.mapToEntity(empresa));
  }

  async findOne(id: number) {
    const empresa = await this.prisma.empresas.findUnique({
      where: { id },
    });
    return this.mapToEntity(empresa);
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    const empresa = await this.prisma.empresas.update({
      where: { id },
      data: updateEmpresaDto
    });
    return this.mapToEntity(empresa);
  }

  async remove(id: number) {
    const empresa = await this.prisma.empresas.delete({
      where: { id },
    });
    return this.mapToEntity(empresa);
  }

  private mapToEntity(empresa: any) : Empresa {
    return {
      id: empresa.id,
      cnpj: empresa.cnpj,
      razaoSocial: empresa.razaoSocial,
      nomeFantasia: empresa.nomeFantasia,
      inscricaoEstadual: empresa.inscricaoEstadual,
    };
  }
}