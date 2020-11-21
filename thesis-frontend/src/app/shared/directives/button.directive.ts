import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[ts-button-primary], [ts-button-secondary], [ts-button-tertiary]'
})
export class ButtonDirective implements OnInit {

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // check if button is primary
    const isPrimary = !!this.elementRef.nativeElement.attributes['ts-button-primary'];
    const isSecondary = !!this.elementRef.nativeElement.attributes['ts-button-secondary'];
    const isTertiary = !!this.elementRef.nativeElement.attributes['ts-button-tertiary'];

    this.elementRef.nativeElement.classList.add('font-semibold', 'py-2', 'px-4', 'rounded');

    if (isPrimary || isSecondary) {
      // add base classes to button
      this.elementRef.nativeElement.classList.add('bg-white', 'hover:bg-gray-300', 'text-black');
    }

    if (isPrimary) {
      // add primary classes to element
      this.elementRef.nativeElement.classList.add('border', 'border-black', 'hover:border-gray-300');
    }

    if (isTertiary) {
      // add tertiary classes to element
      this.elementRef.nativeElement.classList.add('bg-black', 'hover:bg-gray-700', 'text-white');
    }
  }
}
