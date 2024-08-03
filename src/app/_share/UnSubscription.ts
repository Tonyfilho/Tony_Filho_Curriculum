import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";



@Injectable()

export abstract class UnSubscription implements OnDestroy {
  /**
   * That class is resposable to Unsubscribe all the
   * Observable that does not use Async Pipe.
   * All the class that extend that will can UnSubscribe the Observable
   */
  unSubscribe$ = new Subject<void>();


  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
