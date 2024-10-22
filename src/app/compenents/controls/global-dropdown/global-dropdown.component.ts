import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {ButtonModule} from "primeng/button";
import {ListboxModule} from "primeng/listbox";
import {CdkListbox} from "@angular/cdk/listbox";
import {OverlayOptions} from "primeng/api";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'global-dropdown',
  standalone: true,
  imports: [DropdownModule, FormsModule, OverlayPanelModule, ButtonModule, ListboxModule, CdkListbox, InputTextModule],
  templateUrl: './global-dropdown.component.html',
  styleUrl: './global-dropdown.component.css'
})
export class GlobalDropdownComponent {
  @Input() options:any[] = [
    {
      name:"mohamed",
      age:21
    },
    {
      name:"mosaab",
      age:25
    },
    {
      name:"mokhtar",
      age:55
    },
    {
      name:"fatiha",
      age:48
    },
    {
      name:"alaa",
      age:10
    },
    {
      name:"sofiane",
      age:35
    }
  ];
  @Input() filter:boolean = true;
  @Input() optionLabel:string = "name";
  @Input() placeholder:string = "Entrer un choix";
  @Input() styleClass:string = "";
  @Input() selectedOption:any;
  @Input() filterBy:string = "name";
  @Input() showClear:boolean = true;
  @Input() style: {[p: string]: any} | null | undefined;
  @Output() onChange : EventEmitter<any> = new EventEmitter();
  onSelectChange(event:any){
    this.onChange.emit(event?.value);
    let elements = document.getElementsByClassName('my-try')
    console.log(elements)
  }
}
