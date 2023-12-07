import { Component } from '@angular/core';
import { Moment } from '../../../Moments';
import { MomentService } from '../../../services/moment.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrl: './new-moment.component.css'
})
export class NewMomentComponent {
  btnText = 'Share!';

  constructor(private momentService: MomentService){}

  async createHandler(moment: Moment){
    const formData = new FormData()

    formData.append("title", moment.title);
    formData.append("description", moment.description);

    if(moment.image){
      formData.append("image", moment.image);
    }


    await this.momentService.createMoment(formData).subscribe();

    
  //enviar para o service


  //exibir msg

  //redirect

  }


}
