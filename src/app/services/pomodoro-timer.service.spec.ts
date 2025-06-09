import { TestBed } from '@angular/core/testing';

import { PomodoroTimerService } from './pomodoro-timer.service';

describe('PomodoroTimerService', () => {
  let service: PomodoroTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PomodoroTimerService);

    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should start the timer and count down correctly', () => {
    service.start(5000);

    jasmine.clock().tick(1000);
    expect(service.remainingTime).toBe(4000);

    jasmine.clock().tick(1000);
    expect(service.remainingTime).toBe(3000);
  });

  it('should pause the timer', () => {
    service.start(5000);

    jasmine.clock().tick(2000);
    service.pause();

    jasmine.clock().tick(2000);
    expect(service.remainingTime).toBe(3000);
  });

  it('should reset the timer', () => {
    service.start(5000);

    jasmine.clock().tick(2000);
    service.reset();

    expect(service.remainingTime).toBe(5000);
  });

  it('should emit an event when timer reaches zero', (done) => {
    service.onTimerComplete.subscribe(() => {
      expect(service.remainingTime).toBe(0);
      done();
    });

    service.start(2000);

    jasmine.clock().tick(2000);
  });
});
