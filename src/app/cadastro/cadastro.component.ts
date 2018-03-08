import { Component, OnInit } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'cadastro',
  templateUrl: './cadastro.component.html',
  styles: []
})
export class CadastroComponent implements OnInit {

  foto = new FotoComponent()
  
  constructor(private conexaoApi: HttpClient) {}

  ngOnInit() {}

  salvar(evento: Event){

    evento.preventDefault()
    console.log(this.foto)

    /* 
      this.conexaoApi.post(
      'http://localhost:3000/v1/fotos'
      ,this.foto
      
    ) */ 
  
  }
}