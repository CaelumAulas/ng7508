import { Component, OnInit } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { FotoService } from "../servicos/foto.service";

@Component({
    selector: 'app-listagem',
    templateUrl: './listagem.component.html',
    styles: []
})
export class ListagemComponent implements OnInit {

    listaFotos: FotoComponent[] = []
    mensagem

    constructor(private servico: FotoService) {
        this.servico
            .listar()
            .subscribe(
                fotosApi => this.listaFotos = fotosApi
                , erro => console.log(erro)
            )
    }

    ngOnInit() {
    }

    deletar(foto: FotoComponent) {

        this.servico
            .deletar(foto)
            .subscribe(
                () => {
                   /*  this.listaFotos = this.listaFotos.filter( 
                        function(fotoDaLista){
                            if(fotoDaLista != foto){
                                return fotoDaLista
                            }
                        }) */

                        this.mensagem = `Foto ${foto.titulo} apagada com sucesso!`

                        this.listaFotos = this.listaFotos.filter( fotosDaLista => fotosDaLista != foto )

                        setTimeout( () => this.mensagem = '', 3000)
                }

                , erro => console.log(erro)

            )

        console.log(foto);
    }
}
