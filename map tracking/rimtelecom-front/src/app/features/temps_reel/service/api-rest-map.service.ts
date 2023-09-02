import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArchEntry} from "../model/ArchEntry";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiRestMapService {

  constructor(private httpClient: HttpClient) { }

  getAll():Observable<ArchEntry[]>{
    return this.httpClient.get<ArchEntry[]>("http://localhost:8080/getArchEntries");
  }
}
