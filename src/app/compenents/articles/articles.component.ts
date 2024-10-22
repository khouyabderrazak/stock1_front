// import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ElementRef, ErrorHandler, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TabArticleData } from '../../models/tabArticles/TabArticleData';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from "primeng/autocomplete";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from "primeng/card";
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from "primeng/toast";
import { ConfirmationService, MenuItem, MessageService } from "primeng/api";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { ImageModule } from "primeng/image";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { PanelModule } from "primeng/panel";
import { SplitterModule } from "primeng/splitter";
import { TabRow } from "../../models/tabArticles/TabRow";
import { Tax } from "../../models/tax/Tax";
import { DividerModule } from "primeng/divider";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ListboxModule } from "primeng/listbox";
import { ArticleService } from "../../services/article.service";
import { Article, ArticleLite } from "../../models/article/article";
import { elementAt, lastValueFrom, map } from "rxjs";
import { SkeletonModule } from "primeng/skeleton";
import { AnimateModule } from "primeng/animate";
import { TaxService } from "../../services/tax.service";
import { MessageModule } from "primeng/message";
import { MessagesModule } from "primeng/messages";

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [FormsModule, CardModule,
    FontAwesomeModule, DropdownModule, ImageModule, InputGroupModule, InputGroupAddonModule,
    CommonModule, AutoCompleteModule, InputTextModule, ConfirmPopupModule,
    TableModule, ButtonModule, PanelModule, SplitterModule, ListboxModule,
    SplitButtonModule, ToastModule, CheckboxModule, DividerModule,
    InputNumberModule, InputTextareaModule, SkeletonModule, AnimateModule, MessageModule, MessagesModule,
    ReactiveFormsModule
  ],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
  providers: [MessageService, ConfirmationService, ArticleService, TaxService]
})
export class ArticlesComponent implements OnInit {

  @Output()
  sendData:EventEmitter<any>=new EventEmitter<any>();
  @ViewChild('submitBtn') submitBtn:ElementRef

  TabArticles: FormGroup
  articles = []
  taxes: any[] = []
  list_Tax_Value: Map<string, Tax_Value> = new Map()
  ListTaxTotal:Map<string,number>=new Map();
  allTax :[string,number][]=[]
  total:number=0.0;
  sousTotal:number=0.0
  messageErreur:string
  isSubmit:boolean=false;

  // fb:FormBuilder
  /**
   *
   */
  constructor(private fb: FormBuilder,
    private articleServices: ArticleService,
    private taxService: TaxService
  ) {
    this.TabArticles = this.fb.group({
      id:new FormControl(0),
      fraisdexpedition: [null],
      total:[null],
      sousTotal:[null],
      taxTotal:[null],
      articlesInfo: this.fb.array(
        [
          new FormGroup({
            id:new FormControl(0),
            articleId: new FormControl(null, Validators.required),
            quantite: new FormControl(null, Validators.required),
            taux: new FormControl(null, Validators.required),
            taxId: new FormControl(null),
            montant: new FormControl(null),
            note: new FormControl(null)
          }),
          
        ]
      )
    }
    )
  }

  ngOnInit(): void {
    this.articleServices.getArticles().subscribe(
      (value) => {
        this.articles = value;
      }
    )

    this.taxService.getTaxes()
      .subscribe((value: any) => {
        this.taxes = value;
      })

  }

  isValid(groupName:string,chanps:string):boolean{
    return this.TabArticles.get('articlesInfo').get(groupName).get(chanps).invalid && this.isSubmit;
  }

  submit() {
   
    this.isSubmit = true; 
   
    if(this.TabArticles.invalid){
      this.messageErreur="please remplir tous les champs demandes"
       
      setTimeout(
        ()=>{
              this.messageErreur=null;
        },2000
      )
      console.log("invlid")
      this.sendData.emit(null);
    }else{
      this.sendData.emit(this.TabArticles.value);      
    }

  }

  getMontant(groupName: string): number {
    // this.calculTaxes()
    const quantite = this.TabArticles.get('articlesInfo').get(groupName).get('quantite').value;
    const taux = this.TabArticles.get('articlesInfo').get(groupName).get('taux').value;
    const montant = quantite * taux;
    this.TabArticles.get('articlesInfo').get(groupName).get('montant').setValue(montant);
    return montant;
  }

  getSousTotal() {
    this.sousTotal=0;
    this.TabArticles.get('articlesInfo')?.['controls'].forEach(element => {
      this.sousTotal += element.get('montant').value
    });

    this.getTotal();
     
    return this.sousTotal;

  }

  calculTaxes(groupName: string) {

    const montant = this.TabArticles.get('articlesInfo').get(groupName).get('montant').value;

    const taxId = this.TabArticles.get('articlesInfo').get(groupName).get('taxId').value
    
    if(!taxId){
         this.list_Tax_Value.delete(groupName);
    }else{
      const tax = this.taxes.find(t => t.id == taxId)
      let next = {
        title: tax?.title,
        total: (+montant * (tax?.ratio)) / 100
      }
      this.list_Tax_Value.set(groupName , next);
    }
      
      this.ListTaxTotal.clear();
      this.list_Tax_Value.forEach(
        (value:Tax_Value)=>{
              if(this.ListTaxTotal.has(value.title)){
                     let last=this.ListTaxTotal.get(value.title);
                     this.ListTaxTotal.set(value.title,last+value.total);
              }else{
                     this.ListTaxTotal.set(value.title,value.total);
              }     
        }   
      )

       this.allTax=Array.from(this.ListTaxTotal.entries());
    }
    
    getTotal(){
      this.total=this.sousTotal;
      if(this.allTax.length>0)
          this.allTax?.forEach(
               (item)=>{
                   this.total+=item[1];
          }
      )
     const frais=this.TabArticles.get('fraisdexpedition').value;

     if(frais){
      this.total+=frais;
      this.TabArticles.get('taxTotal').setValue(this.total-this.sousTotal-frais);
     }else{
      this.TabArticles.get('taxTotal').setValue(this.total-this.sousTotal);
     }
     this.TabArticles.get('sousTotal').setValue(this.sousTotal);
     this.TabArticles.get('total').setValue(this.total);
    }

    ajoute(){
   (<FormArray>this.TabArticles.get('articlesInfo')).push(
    new FormGroup({
            id:new FormControl(0),
            articleId: new FormControl(null, Validators.required),
            quantite: new FormControl(null, Validators.required),
            taux: new FormControl(null, Validators.required),
            taxId: new FormControl(null),
            montant: new FormControl(null),
            note: new FormControl(null)
    }),
   )
    }

    delete(groupName:number){
           (<FormArray>this.TabArticles.get('articlesInfo')).removeAt(groupName);
    }

    OnSelectArticle(groupName:string){
      const artid = this.TabArticles.get('articlesInfo').get(groupName).get('articleId').value
      const article=this.articles.find(a=>a.id==artid);
      if(article.taux){
        this.TabArticles.get('articlesInfo').get(groupName).get('taux').setValue(article.taux);
      }else{

      }
      this.TabArticles.get('articlesInfo').get(groupName).get('quantite').setValue(1.0);
    }

  }

interface Tax_Value {
  title: string
  total: number
}






