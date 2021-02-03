import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PlacesService } from '../../places.service';

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: 'app-new-offers',
  templateUrl: './new-offers.page.html',
  styleUrls: ['./new-offers.page.scss'],
})
export class NewOffersPage implements OnInit {

  form:FormGroup;
  Count=0;
  constructor(private placeService:PlacesService,
    private route:Router,
    private loadingController:LoadingController) {
   }

  ngOnInit() {

    this.form= new FormGroup(
      {
        title: new FormControl(null,
          {
            updateOn:'blur',
            validators:[Validators.required]
          }
        ),
        description:new FormControl(null,
          {
            updateOn:'change',
            validators:[Validators.required,Validators.maxLength(180)]
          }
        ),
        price:new FormControl(null,
          {
            updateOn:'blur',
            validators:[Validators.required,Validators.min(1)]
          }
        ),
        datefrom:new FormControl(null,
          {
            updateOn:'blur',
            validators:[Validators.required]
          }
        ),
        dateto:new FormControl(null,
          {
            updateOn:'blur',
            validators:[Validators.required]
          }
        ),
        imageFile:new FormControl(null)

      }
    )
  }
  onCreateOffer(){
    
    if(this.form.invalid || !this.form.get('imageFile').value)
    {
      return;
    }
    console.log(this.form)
    this.placeService.addPlace(
      this.form.get('title').value,
      this.form.get('description').value,
      this.form.get('price').value,
      this.form.get('datefrom').value,
      this.form.get('dateto').value,
    )
    this.loadingController.create({
      spinner:'lines',
      keyboardClose:true,
      message:'Creating the offer',
      backdropDismiss:false
    }).then(element=>
      {
        element.present();
        setTimeout(()=>
        {
          element.dismiss();
          this.route.navigateByUrl('/places/offer')
        },1500);
      })
     }

  charCount()
  {
    this.Count=this.form.get('description').value.length;
    console.log(this.Count)
  }

  pickedImage(imgData:string | File)
  {
    let imgFile;
    if(typeof imgData==='string')
    {
      try{
       imgFile=base64toBlob(imgData.replace('date:/jpeg;base64',''),'image/jpeg') //convert base64 to file and the second argument tells the image type

      }
      catch(error){
        console.log(error);
        return
      }
    }
    else{
      imgFile=imgData;
    }

    this.form.patchValue({imageFile:imgFile}); // patchValue attach value to formcontrol
  }

}
