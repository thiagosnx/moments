import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Moment } from '../Moments';
import { Response } from '../Response';
import { environment } from '../../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}/api/moments`

  constructor(private http: HttpClient) { }

  getMoments():Observable<Response<Moment[]>> { //aqui o observable recebe uma resposta que contem um o array de moments
    return this.http.get<Response<Moment[]>>(this.apiUrl);
  }

  getMoment(id: number): Observable<Response<Moment>> { 
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Response<Moment>>(url);
  }

  createMoment(formData: FormData):Observable<FormData>{ //post
    return this.http.post<FormData>(this.apiUrl, formData);
  }//logica que chama a logica do newmoment.ts pra fazer uma requisição post
}
