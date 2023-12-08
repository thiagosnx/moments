import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { MomentService } from '../../../services/moment.service';
import { Moment } from '../../../Moments';
import { environment } from '../../../../enviroments/enviroment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  allMoments: Moment[] = []  //getall 
  moments: Moment[] = []  //filter pela search
  baseApiUrl = environment.baseApiUrl;




  constructor(private momentService: MomentService){}
  
  ngOnInit():void{ //recuperando dados da resposta que recebe do back
    this.momentService.getMoments().subscribe((items)=>{
      const data = items.data;

      data.map((item)=>{
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR'); //mudando a data pra ptbr
      });

      this.allMoments = data; //passando os dados pro front
      this.moments = data;
    });
  }

  //search
  faSearch = faSearch
  searchTerm: string = "";

  search(e:Event):void{ //evento do input
    const target = e.target as HTMLInputElement //pegando oq vem do input
    const value = target.value //definindo o valor

    this.moments = this.allMoments.filter((moment)=>{ //filtrando todos os momentos pelo value do input
      return moment.title.toLowerCase().includes(value);
    });
  }
}
