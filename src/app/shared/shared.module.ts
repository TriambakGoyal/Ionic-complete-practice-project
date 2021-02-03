import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LocationPickerComponent } from './picker/location-picker/location-picker.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [LocationPickerComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ],
  exports:[LocationPickerComponent]
})
export class SharedModule { }
