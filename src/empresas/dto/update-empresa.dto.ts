/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpresaDto } from './create-empresa.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmpresaDto extends PartialType(CreateEmpresaDto) {

    @IsString({ message: 'O CNPJ deve ser uma string' })
    @IsNotEmpty({ message: 'O CNPJ não pode ser vazio' })
    cnpj: string;
    
    @IsString({ message: 'A razão social deve ser uma string' })
    @IsNotEmpty({ message: 'A razão social não pode ser vazia' })
    razaoSocial: string;
    
    @IsString({ message: 'O nome fantasia deve ser uma string' })
    @IsNotEmpty({ message: 'O nome fantasia não pode ser vazio' })
    nomeFantasia: string;
    
    @IsString({ message: 'A inscrição estadual deve ser uma string' })
    @IsNotEmpty({ message: 'A inscrição estadual não pode ser vazia' })
    inscricaoEstadual: string;
}
