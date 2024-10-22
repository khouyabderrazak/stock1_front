import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStypeForInput]',
  standalone: true
})
export class StypeForInputDirective implements OnInit {

  
  constructor(private element:ElementRef,private renderer2:Renderer2) { 
        //  element.nativeElement.style.backgroundColor='red';
  }

  ngOnInit(): void {
    //this.renderer2.setStyle(this.element.nativeElement,'backgroundColor','red');
  }


  @HostListener('focus') onFocus(){
      this.renderer2.setStyle(this.element.nativeElement,'border','solid 1px white');
      setTimeout(()=>{
      this.renderer2.setStyle(this.element.nativeElement,'border','rgb(91, 170, 249) 1px solid');
      },500);
  }
  

}
