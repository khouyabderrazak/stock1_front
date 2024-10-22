import { Component} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck,faCube,faEllipsis,faFile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  faCircleCheck=faCircleCheck;
  faCube=faCube;
  faEllipsis=faEllipsis;
  faFile=faFile;  
  max=300;
  som=0;
}
  

