import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Moment } from '../../../Moments';
import { MomentService } from '../../../services/moment.service';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrl: './new-moment.component.css'
})
export class NewMomentComponent {
  btnText = 'Share!';

  constructor(private momentService:MomentService, private messagesService:MessagesService, private router:Router){}

  async createHandler(moment: Moment){ //logica q cria o handler de novo moment que dps chama o metodo post pra concretizar
    const formData = new FormData()

    formData.append("title", moment.title);
    formData.append("description", moment.description);

    if(moment.image){
      formData.append("image", moment.image);
    }

  //enviar para o service
    await this.momentService.createMoment(formData).subscribe();

  //exibir msg
    this.messagesService.add('Successfully!');

  //redirect
    this.router.navigate(['/'])

  }


}
