import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import swal from 'sweetalert2';

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.scss']
})
export class DropZoneComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    allowedFileType: ['image']
  });
  hasBaseDropZoneOver = false;

  @Input()
  srcUrl: any;

  @Output()
  imageBlob = new EventEmitter<String | ArrayBuffer>();
  constructor() { }

  ngOnInit() {
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileDropped(file: File[]) {
    if (this.uploader.queue.length === 0) {
      swal('Fout', 'Je mag alleen foto\'s uploaden', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.returnValue) {
        this.srcUrl = reader.result;
        this.imageBlob.emit(reader.result);
      }
      this.uploader.clearQueue();
    };
    reader.readAsDataURL(file[0]);


  }

  removeImageInHtml() {
    this.srcUrl = null;
    this.imageBlob.emit(null);
  }
}
