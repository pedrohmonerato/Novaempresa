/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpresaDto } from './create-empresa.dto';
import { IsString } from 'class-validator';

export class UpdateEmpresaDto extends PartialType(CreateEmpresaDto) {

    @IsString()
    cnpj: string;

    @IsString()
    razaoSocial: string;

    @IsString()
    nomeFantasia: string;

    @IsString()
    inscricaoEstadual: string;
    
}
