import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RelatorioService } from '../../services/relatorio.service';

@Component({
  selector: 'app-assinatura',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './assinatura.component.html',
  styleUrl: './assinatura.component.css'
})

export class AssinaturaComponent implements OnInit, AfterViewInit {
  idRegistro:string = "";

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private service = inject(RelatorioService);

  constructor() {}

  ngOnInit(): void {
    this.idRegistro = this.route.snapshot.params['id'];
  }

  @ViewChild('signatureCanvas') canvasElement: ElementRef | undefined;
  @ViewChild('clearButton') clearButtonElement: ElementRef | undefined;
  @ViewChild('saveButton') saveButtonElement: ElementRef | undefined;

  ngAfterViewInit(): void {

    const canvas = this.canvasElement?.nativeElement;
    const clearButton = this.clearButtonElement?.nativeElement;
    const saveButton = this.saveButtonElement?.nativeElement;

    const ctx = canvas.getContext('2d');
    
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    function drawLine(x: number, y: number) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
        lastX = x;
        lastY = y;
    }
    
    function handleStart(event: { preventDefault: () => void; touches: { clientY: number; clientX: number}[]; clientX: number; clientY: number; }) {
        event.preventDefault();
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        lastX = event.touches ? event.touches[0].clientX - rect.left : event.clientX - rect.left;
        lastY = event.touches ? event.touches[0].clientY - rect.top : event.clientY - rect.top;
    }
    
    function handleMove(event: { preventDefault: () => void; touches: { clientY: number; clientX: number}[]; clientX: number; clientY: number; }) {
        if (!isDrawing) return;
        event.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const x = event.touches ? event.touches[0].clientX - rect.left : event.clientX - rect.left;
        const y = event.touches ? event.touches[0].clientY - rect.top : event.clientY - rect.top;
        drawLine(x, y);
    }
    
    function handleEnd(event: { preventDefault: () => void; }) {
        event.preventDefault();
        isDrawing = false;
    }
    
    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('mouseout', handleEnd);
    
    canvas.addEventListener('touchstart', handleStart);
    canvas.addEventListener('touchmove', handleMove);
    canvas.addEventListener('touchend', handleEnd);

    clearButton.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    
    saveButton.addEventListener('click', () => {
        const dataURL = canvas.toDataURL('image/png');
        let registro;
        this.service.getRegistro(this.idRegistro).subscribe({
          next: (response) => {
            registro = response;
            registro.assinatura = dataURL;
            this.service.editRegistro(registro).subscribe({
              next: (response) => {
                console.log(response);
                this.router.navigate(['/relatorio']);
              },
              error: (erro) => {
                console.log("algo deu errado");
              }
            });
          },
          error: (erro) => {
            console.log("Algo deu errado!");
          }
        });
    });
  }

}