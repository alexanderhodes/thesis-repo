import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[ts-input]'
})
export class InputDirective implements OnInit {

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.classList.add('border', 'border-solid', 'border-black', 'rounded', 'p-2', 'w-full');
  }

}
