import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-loading-indicator',
  standalone: true,
  imports: [CommonModule,MessagesModule],
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.css'
})
export class LoadingIndicatorComponent implements OnInit {
  
  isTimeOut:Boolean=false
  
  messages: Message[] | undefined;

  
  ngOnInit(): void {
    this.messages = [{ severity: 'info', detail: 'Pas de données disponibles' }];
      setTimeout(
        ()=>{
              this.isTimeOut=true
        },
        10000
      )
  }



  @Input()
  items

}
