import { Directive, Input, OnChanges, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[myForDiretiva]'
})
export class ForDirective implements OnChanges {

  @Input('myForDiretivaBla') numbers!: number[];
  @Input('myForDiretivaUsando') texto!: string;

  constructor(private container: ViewContainerRef,
              private template: TemplateRef<any>)
  {

  }

    ngOnChanges(): void
    {
      for(let number of this.numbers)
      {
            this.container.createEmbeddedView(this.template,
                                              {$implicit: number});
      }
    }
}
