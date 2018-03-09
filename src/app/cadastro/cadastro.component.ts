import { Component, OnInit } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FotoService } from '../servicos/foto.service';

@Component({
    selector: 'cadastro',
    templateUrl: './cadastro.component.html',
    styles: []
})
export class CadastroComponent implements OnInit {

    foto = new FotoComponent()

    constructor(private servico: FotoService) { }

    ngOnInit() { }

    salvar() {

        console.log(this.foto)

        this.servico
            .cadastrar(this.foto)
            .subscribe(
                () => this.foto = new FotoComponent()
                , erro => console.log(erro)
            )

    }
}