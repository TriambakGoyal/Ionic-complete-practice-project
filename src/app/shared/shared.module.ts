import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LocationPickerComponent } from './picker/location-picker/location-picker.component';
import { ImagePickerComponent } from './picker/image-picker/image-picker.component';

@NgModule({
  declarations: [LocationPickerComponent,ImagePickerComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ],
  exports:[LocationPickerComponent,ImagePickerComponent]
})
export class SharedModule { }
