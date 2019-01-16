import { Component, OnInit, ElementRef, AfterViewChecked, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'fiar-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit, AfterViewChecked, OnDestroy {

  fragment: string;

  _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private _elementRef: ElementRef,
    private _route: ActivatedRoute) { }

  ngOnInit() {

  }

  ngAfterViewChecked() {
    this._route.fragment.pipe(
      takeUntil(this._destroyed$),
      filter(f => this.fragment !== f)
    ).subscribe(f => {
      if (f) {
        this.scrollToFragment(f);
        this.fragment = f;
      }
    });
  }

  scrollToFragment(fragmentName: string) {
    const { nativeElement } = this._elementRef;
    const section = nativeElement.querySelector(`a[name="${fragmentName}"]`);
    if (section) {
      setTimeout(() => section.scrollIntoView(), 0);
    }
  }

  ngOnDestroy() {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }

}
