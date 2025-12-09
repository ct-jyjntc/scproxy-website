import { Directive, ElementRef, inject, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appObserveElement]',
  standalone: true
})
export class ObserveElementDirective implements AfterViewInit {
  private elementRef = inject(ElementRef);

  // Fix: Replaced `afterRender` with the `ngAfterViewInit` lifecycle hook.
  // This hook is called once after the view is initialized, which is the perfect time
  // to set up the IntersectionObserver and avoids issues with `afterRender` not being found.
  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible');
          obs.unobserve(element);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(element);
  }
}
