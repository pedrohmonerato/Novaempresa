/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
    private readonly validToken = 'autenticacao';

    validateToken(token: string): void{
        if(token !== this.validToken){
            throw new UnauthorizedException('Token Invalido')
        }
    }
}