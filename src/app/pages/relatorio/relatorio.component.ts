import {Component, OnInit, inject} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Registro } from '../../models/registro';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RelatorioService } from '../../services/relatorio.service';
  
/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-relatorio',
  styleUrl: 'relatorio.component.css',
  templateUrl: 'relatorio.component.html',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButton,
    MatIcon,
  ],
})

export class RelatorioComponent implements OnInit{
  relatorio: Registro[] = [];
  registro: Registro = new Registro();

  private fb = inject(FormBuilder);
  private service = inject(RelatorioService);
  private router = inject(Router);

  formulario = this.fb.group({
    nome:  this.registro.nome,
    organizacao: this.registro.organizacao,
    descricao: this.registro.descricao,
  })

  constructor() {}
  
    ngOnInit(): void {
      this.getRelatorios();
    }

    getRelatorios():void {
      this.service.getRegistros().subscribe(
        {
          next: (response) => {
            this.relatorio = response;
            console.log(this.relatorio);
          },
          error: (erro: any) => {
            console.log('ocorreu algum erro');
            console.log(erro);
          }
        }
      )
    }

    onSubmit():void {
      if(this.formulario.controls['nome'].value)
        this.registro.nome = this.formulario.controls['nome'].value;
      if(this.formulario.controls['organizacao'].value)
        this.registro.organizacao = this.formulario.controls['organizacao'].value;
      if(this.formulario.controls['descricao'].value)
        this.registro.descricao = this.formulario.controls['descricao'].value;

      this.service.addRegistro(this.registro).subscribe({
        next: (response) => {
          console.log(response);
          this.getRelatorios();
          this.router.navigate(['']);
          // window.location.reload();
        },
        error: (erro) => {
          console.log('Ocorreu algum erro!');
          alert(erro);
        }
      })
    }

    inserirAssinatura(idElment:any) {
      this.router.navigate([`assinatura/${idElment}`]);
    }

    deletarRegistro(idElment:any) {
      this.service.deletRegistro(idElment).subscribe({
        next: (response) => {
          console.log(response);
          this.getRelatorios();
          this.router.navigate(['']);
          // window.location.reload();
        },
        error: (erro) => {
          console.log("algo deu errado!");
        }
      })
    }
  
  displayedColumns: string[] = ['nome', 'organizacao', 'descricao', 'assinatura', 'id'];
}