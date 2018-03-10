import { Component, OnInit } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FotoService } from '../servicos/foto.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'cadastro',
    templateUrl: './cadastro.component.html',
    styles: []
})
export class CadastroComponent implements OnInit {

    foto = new FotoComponent()
    mensagem
    formCadastro: FormGroup

    constructor(private servico: FotoService, 
                private rota: ActivatedRoute,
                private roteador: Router,
                private formBuilder: FormBuilder) {

        this.formCadastro = this.formBuilder.group({
            titulo: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3)
            ])],
            url: '',
            descricao: ''
        })
        
    }

    ngOnInit() {

        this.rota.params.subscribe( parametros => {
            
            if(parametros.fotoId){

                this.servico.consultar(parametros.fotoId)
                            .subscribe(fotoApi => {
                                this.foto = fotoApi
                            })      

            }
        })

    }

    mensageria(verbo = 'cadastrada', tempo = 2000){
        this.mensagem = `Foto ${this.foto.titulo} foi ${verbo} com sucesso`

        setTimeout(()=>{
            this.roteador.navigate([''])
        }, tempo)
    }

    salvar() {

        if(this.foto._id){

            this.servico.atualizar(this.foto)
                        .subscribe(
                            mensagemServico => {
                                this.mensagem = mensagemServico.texto
                            }
                        )

        } 
        else {

            this.servico
                .cadastrar(this.foto)
                .subscribe(
                    mensagemServico => {
                        this.foto = new FotoComponent()
                    }
                    , erro => console.log(erro)
                )
        }
    }
}