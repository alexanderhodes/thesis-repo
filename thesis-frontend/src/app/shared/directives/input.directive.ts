import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[ts-input]'
})
export class InputDirective implements OnInit {

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.classList.add('border', 'border-solid', 'border-gray-400', 'rounded', 'p-1', 'w-full');
  }

}
