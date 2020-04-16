import { Component, ElementRef, Renderer2, ViewChild, OnInit ,Directive, Input} from '@angular/core';
import { ModelService } from './service/model.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    video;
    canvas: HTMLCanvasElement ;

    videoWidth = 0;
    videoHeight = 0;

    constraints = {
      video: {
          facingMode: "environment",
          width: { ideal: 4096 },
          height: { ideal: 2160 }
      }
    };

    queryString = '';
    imageData = {};
    constructor(
      private renderer: Renderer2,
      private modelService: ModelService,
      ) {}

      ngOnInit(): void {
        this.video = document.getElementById('video');
        this.canvas =  <HTMLCanvasElement>document.getElementById('canvas');
        this.startCamera();
      }
      ngAfterViewInit(){
        this.startCamera();
        console.log(this.imageData)
      }

      startCamera() {
        console.log(this.video, this.canvas)
        if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) { 
          navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
        } else {
            alert('Sorry, camera not available.');
        }
    }
    attachVideo(stream) {
      this.renderer.setProperty(this.video, 'srcObject', stream);
      this.renderer.listen(this.video, 'play', (event) => {
          this.videoHeight = this.video.videoHeight;
          this.videoWidth = this.video.videoWidth;
      });
    }

    capture() {
      this.renderer.setProperty(this.canvas, 'width', this.videoWidth);
      this.renderer.setProperty(this.canvas, 'height', this.videoHeight);
      this.canvas.getContext('2d').drawImage(this.video, 0, 0);
      this.imageData = this.canvas.getContext('2d').getImageData(0,0,this.videoHeight,this.videoWidth)
      // this.modelService.fetchdata(this.imageData);
  }

  queryModel(query){
    console.log(query)
    if(this.imageData && query){
      this.modelService.queryModel(query,this.imageData);
    }
  }
    handleError(error) {
      console.log('Error: ', error);
  }
}
