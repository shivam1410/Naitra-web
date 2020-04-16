import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor() { }

  fetchdata(imageData){
    console.log(imageData);
  }

  queryModel(imageData, query){
    console.log(imageData, query);
  }

  storeDataFirebase(){

  }
}
