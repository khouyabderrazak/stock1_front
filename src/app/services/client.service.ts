import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, tap} from "rxjs";
import {apiUrls} from "../data/data";
import {Client, ClientLite} from "../models/client/client";
import { ScopedNode } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clients:Client[] = [];
  constructor(private http:HttpClient) { }

  getClients():Observable<Client[]>{
    if (this.clients.length > 0) {
      return of(this.clients);
    }
    else {
      return this.http.get<Client[]>(apiUrls.clients).pipe(
        tap(clients => {
          this.clients = clients;
        }),
        catchError(error => {
          console.error('Error fetching Payment Conditions: ', error);
          return of([]);
        })
      );
    }
  }
  
  getClientsLite():Observable<ClientLite[]>{
    return this.getClients().pipe(
      map(clients => clients.map((client:Client) :ClientLite => ({
        id:client.id,
        displayName:client.displayName
      })))
    );
  }

  addClient(client:Client,associatedDocs:File[]):Observable<any>{
    const formData = new FormData();
    if (associatedDocs.length>0) {
      associatedDocs.forEach(
        (doc)=>{
          formData.append('file', doc as File , doc.name);
        }
      )
    }
    formData.append('client', JSON.stringify(client));
    return this.http.post("https://localhost:7020/api/Client",formData);
  }
}
