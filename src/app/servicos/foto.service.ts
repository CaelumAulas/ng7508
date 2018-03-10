import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FotoComponent } from "../foto/foto.component";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'

const url = 'http://localhost:3000/v1/fotos/'

const cabecalho = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable()
export class FotoService {

    constructor(private conexaoApi: HttpClient){}

    listar(): Observable<FotoComponent[]>{
        return this.conexaoApi.get<FotoComponent[]>(url)
    }

    consultar(idFoto): Observable<FotoComponent> {
        return this.conexaoApi.get<FotoComponent>(url+idFoto)
    }

    cadastrar(foto: FotoComponent): Observable<Object> {
        return this.conexaoApi.post(url,foto,cabecalho)
                               .map(
                                    () => ({ mensagem: `${foto} inserida com sucesso`})
                                )   
    }

    atualizar(foto: FotoComponent): Observable<MensagensServico> {
        return this.conexaoApi.put(url+foto._id,foto,cabecalho)
                                .map(
                                    () => new MensagensServico(`${foto} inserida com sucesso`)
                                )
    }

    deletar(foto: FotoComponent): Observable<Object>{
        return this.conexaoApi.delete(url+foto._id)
    }

}

class MensagensServico {

    constructor(private mensagem){}

    get texto(){
        return this.mensagem
    }

}