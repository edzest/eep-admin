import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appFileDragNDrop]'
})
export class FileDragNDropDirective {

  @Output() private filesChangeEmitter: EventEmitter<FileList> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event']) public onDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  @HostListener('drop', ['$event']) public onDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    let files = e.dataTransfer?.files;
    this.filesChangeEmitter.emit(files);
  }

}
