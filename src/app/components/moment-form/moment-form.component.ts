import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Moment } from '../../Moments';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrl: './moment-form.component.css'
})
export class MomentFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Moment>()
  @Input() btnText!:string

  momentForm!: FormGroup;

  ngOnInit(): void {
      this.momentForm = new FormGroup({
        id: new FormControl(''),
        title: new FormControl('',[Validators.required]),
        description: new FormControl('',[Validators.required]),
        image: new FormControl(''),
        
      });
      
  }

  get title(){
    return this.momentForm.get('title')!; //a exclamação significa q eles vao existir pro angular relaxar
  }

  
  get description(){
    return this.momentForm.get('description')!;
  }

  onFileSelected(event: any){
    const file: File = event.target.files[0] //pega o primeiro arquivo
    this.momentForm.patchValue({ image:file });
  }

  submit(){
    if(this.momentForm.invalid){
      return;
    }
    console.log(this.momentForm.value);
    
    this.onSubmit.emit(this.momentForm.value);
  }
}
