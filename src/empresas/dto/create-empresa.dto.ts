/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import {IsString } from 'class-validator';

export class CreateEmpresaDto {

    @IsString()
    cnpj: string;

    @IsString()
    razaoSocial: string;

    @IsString()
    nomeFantasia: string;

    @IsString()
    inscricaoEstadual: string;
    
}
