import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class ParametroConexion {

    public getUrlBase(): string{
        return 'http://localhost:8082'
    }

    public getJsonHeader(): any{
        return {
            'Content-type': 'application/json'
        };
    }

}
