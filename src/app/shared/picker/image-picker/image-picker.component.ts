import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CameraResultType, CameraSource, Capacitor, Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {

  @ViewChild('filePicker') filePicker:ElementRef<HTMLInputElement> //Access the native element
  @Output() imgPick = new EventEmitter<string | File>()
  selectedImage:string;
  usePicker=false;
  constructor(    
    private platform:Platform // this will be used to tell on which platform we are running the device
    ) {
   }

  ngOnInit() {

    console.log(this.platform.is('android'))

    if((this.platform.is('mobile') && !this.platform.is('hybrid'))|| this.platform.is('desktop'))
    {
      this.usePicker=true;
    }
  }

  pickImage()
    { 
      if(!Capacitor.isPluginAvailable("Camera"))
      {
        this.filePicker.nativeElement.click()
        return;
      }

      Plugins.Camera.getPhoto({
        quality:50, //Ranges between 1-100
        source:CameraSource.Prompt, //To let user choose whether he wants to click image or upload from gallery
        correctOrientation:true, //to have fixed orientation of img
        width:300,
        resultType:CameraResultType.DataUrl // to encode image in the string
      }).then(image=>
        {
          this.selectedImage=image.dataUrl;
          this.imgPick.emit(this.selectedImage)
        })
        .catch(error=>
          {
            console.log(error)
            if(this.usePicker)
            {
              this.filePicker.nativeElement.click()

            }
            return false

          })
    }
  
    onImageChoosen(event:any)
    {
      const pickedImg= event.target.files[0];
      if(!pickedImg)
      {
        return;
      }
      const fr=new FileReader(); //to read image file
      fr.onload=()=> //Loads after the completion of the whatever the file instance is performing
      {
        const dataurl = fr.result.toString();
        this.selectedImage=dataurl
        this.imgPick.emit(pickedImg)
      }
      fr.readAsDataURL(pickedImg) //async task to convert file into dataurl string
    }
}
