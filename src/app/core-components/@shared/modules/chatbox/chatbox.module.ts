import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatboxComponent } from './chatbox.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';




@NgModule({
  declarations: [ChatboxComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ChatboxComponent]
})
export class ChatboxModule { }
