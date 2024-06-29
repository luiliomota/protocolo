import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registro } from '../models/registro';

const HttpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  registro:Registro = new Registro();

  // BASE_URL: string = 'http://localhost:3000/';
  BASE_URL: string = 'https://json-server.alf5.com.br/';

  constructor(private http:HttpClient) { }

  getRegistros():Observable<Registro[]> {
    let url:string = (this.BASE_URL + 'registro?_sort=id');
    return this.http.get<Registro[]>(url, HttpOptions);
  }

  getRegistro(id:any):Observable<Registro>{
    let url:string = (this.BASE_URL + 'registro/' + id);
    return this.http.get<Registro>(url, HttpOptions);
  }

  addRegistro(registro: any): Observable<Registro> {
    let url:string = (this.BASE_URL + 'registro/');
    return this.http.post<Registro>(url, registro, HttpOptions);
  }

  editRegistro(registro: any): Observable<Registro>{
    this.registro = registro;
    if(registro.nome) this.registro.nome = registro.nome;
    if(registro.organizacao) this.registro.organizacao = registro.organizacao;
    if(registro.descricao) this.registro.descricao = registro.descricao;
    if(registro.assinatura) this.registro.assinatura = registro.assinatura;
    let url:string =  (this.BASE_URL + 'registro/' + registro.id);
    return this.http.put<Registro>(url, this.registro, HttpOptions);
  }

  deletRegistro(idRegistro: any): Observable<Registro> {
    let url:string = (this.BASE_URL + 'registro/' + idRegistro);
    return this.http.delete<Registro>(url, HttpOptions);
  }
}