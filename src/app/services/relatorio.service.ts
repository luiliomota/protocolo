import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Registro } from '../models/registro';
import { Router } from '@angular/router';

const HttpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class RelatorioService implements OnInit{

  ngOnInit(): void {
  }
  
  private http = inject(HttpClient);
  private router = inject(Router);

  // BASE_URL: string = 'http://localhost:3000/';
  BASE_URL: string = 'https://json-server.alf5.com.br/';

  constructor() { }

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
    let url:string =  (this.BASE_URL + 'registro/' + registro.id);
    return this.http.put<Registro>(url, registro, HttpOptions);
  }

  deletRegistro(idRegistro: any): Observable<Registro> {
    let url:string = (this.BASE_URL + 'registro/' + idRegistro);
    return this.http.delete<Registro>(url, HttpOptions);
  }
}