import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChattingRoomComponent } from './chatting-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ChattingRoomComponent],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  exports: [ChattingRoomComponent]
})
export class ChattingRoomModule { }
