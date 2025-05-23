/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Empresa } from './entities/empresa.entity';

@Injectable()
export class EmpresasService {
  constructor(private prisma: PrismaService) {}

  async create(createEmpresaDto: CreateEmpresaDto): Promise<Empresa> {
    const empresa = await this.prisma.empresas.create({
      data: createEmpresaDto,
    });
    return this.mapToEntity(empresa);
  }

  async findAll(
    cnpj?: string,
    razaoSocial?: string,
    nomeFantasia?: string,
    inscricaoEstadual?: string,
  ): Promise<Empresa[]> {
    const empresas = await this.prisma.empresas.findMany({
      where: {
        ...(cnpj && {
          cnpj: {
            contains: cnpj,
            mode: 'insensitive',
          },
        }),
        ...(razaoSocial && {
          razaoSocial: {
            contains: razaoSocial,
            mode: 'insensitive',
          },
        }),
        ...(nomeFantasia && {
          nomeFantasia: {
            contains: nomeFantasia,
            mode: 'insensitive',
          },
        }),
        ...(inscricaoEstadual && {
          inscricaoEstadual: {
            contains: inscricaoEstadual,
            mode: 'insensitive',
          },
        }),
      },
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });

    if (!empresas.length) {
      throw new NotFoundException('Nenhuma empresa encontrada');
    }

    return empresas.map((empresa) => this.mapToEntity(empresa));
  }

  async findOne(id: number): Promise<Empresa> {
    const empresa = await this.prisma.empresas.findUnique({
      where: { id },
    });

    if (!empresa) {
      throw new NotFoundException('Empresa não encontrada');
    }

    return this.mapToEntity(empresa);
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto): Promise<Empresa> {
    const empresaExists = await this.prisma.empresas.findUnique({
      where: { id },
    });

    if (!empresaExists) {
      throw new NotFoundException('Empresa não encontrada');
    }

    const empresa = await this.prisma.empresas.update({
      where: { id },
      data: updateEmpresaDto,
    });

    return this.mapToEntity(empresa);
  }

  async remove(id: number): Promise<string> {
    const empresaExists = await this.prisma.empresas.findUnique({
      where: { id },
    });

    if (!empresaExists) {
      throw new NotFoundException('Empresa não encontrada');
    }

    await this.prisma.empresas.delete({
      where: { id },
    });

    return 'Empresa removida com sucesso';
  }

  private mapToEntity(empresa: any): Empresa {
    return {
      id: empresa.id,
      cnpj: empresa.cnpj,
      razaoSocial: empresa.razaoSocial,
      nomeFantasia: empresa.nomeFantasia,
      inscricaoEstadual: empresa.inscricaoEstadual,
    };
  }
}