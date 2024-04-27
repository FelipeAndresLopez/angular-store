import { Component, Input, SimpleChanges, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({ required: true }) duration = 0;
  @Input({ required: true }) message = '';
  counter = signal(0);
  counterRef: number | undefined;

  constructor () {
    // before render
    // It is called only once
    console.log('-'.repeat(20));
    console.log('constructor');
  }

  ngOnInit() {
    // after render
    // It is called only once
    console.log('-'.repeat(20));
    console.log('ngOnInit');

    console.log('duration', this.duration);
    console.log('message', this.message);

    this.counterRef = window.setInterval(() => {
      console.log('run interval');

      this.counter.update((statePrev) => statePrev + 1);
    }, 1000)

  }

  ngOnChanges(changes: SimpleChanges) {
    // before and during render
    console.log('-'.repeat(20));
    console.log('ngOnChanges');
    console.log(changes);
  }

  ngAfterViewInit() {
    // after render
    // child views are initialized
    // It is called only once
    console.log('-'.repeat(20));
    console.log('ngAfterViewInit');
  }

  ngOnDestroy() {
    // when the component is destroyed
    console.log('-'.repeat(20));
    console.log('ngOnDestroy');
    window.clearInterval(this.counterRef);
  }


}
