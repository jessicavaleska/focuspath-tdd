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

    expect(service.isRunning).toBeTrue();
    expect(service.remainingTime).toBe(5000);

    jasmine.clock().tick(1000);
    expect(service.remainingTime).toBe(4000);

    jasmine.clock().tick(1000);
    expect(service.remainingTime).toBe(3000);
  });

  it('should pause the timer', () => {
    service.start(5000);

    jasmine.clock().tick(2000);
    service.pause();

    expect(service.isRunning).toBeFalse();
    expect(service.remainingTime).toBe(3000);

    jasmine.clock().tick(2000);
    expect(service.remainingTime).toBe(3000);
  });

  it('should reset the timer', () => {
    service.start(5000);

    jasmine.clock().tick(2000);
    service.reset();

    expect(service.isRunning).toBeFalse();
    expect(service.remainingTime).toBe(5000);
  });

  it('should emit an event when timer reaches zero', () => {
    const completeSpy = jasmine.createSpy('completeSpy');

    service.onTimerComplete.subscribe(completeSpy);

    service.start(2000);
    jasmine.clock().tick(2000);

    expect(service.remainingTime).toBe(0);
    expect(service.isRunning).toBeFalse();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should not start a new timer if already running', () => {
    service.start(5000);
    service.start(10000);

    expect(service.remainingTime).toBe(5000);
    expect(service.isRunning).toBeTrue();
  });

  it('should restore the initial time when reset is called', () => {
    service.start(3000);

    jasmine.clock().tick(1000);
    service.reset();

    expect(service.remainingTime).toBe(3000);
    expect(service.isRunning).toBeFalse();
  });

  it('should not start the timer with invalid time', () => {
    service.start(0);

    expect(service.isRunning).toBeFalse();
    expect(service.remainingTime).toBe(0);
  });
});