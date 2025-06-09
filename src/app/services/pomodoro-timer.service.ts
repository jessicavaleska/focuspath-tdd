import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PomodoroTimerService {
  private intervalId: any;
  private initialTime: number = 0;
  remainingTime: number = 0;
  isRunning = false;

  onTimerComplete = new Subject<void>();

  constructor() { }

  start(timeInMs: number): void {
    if (this.isRunning) {
      return;
    }

    this.initialTime = timeInMs;
    this.remainingTime = timeInMs;
    this.isRunning = true;

    this.intervalId = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime -= 1000;
      } else {
        this.stop();
        this.onTimerComplete.next();
      }
    }, 1000);
  }

  pause(): void {
    if (this.isRunning) {
      clearInterval(this.intervalId);
      this.isRunning = false;
    }
  }

  reset(): void {
    this.pause();
    this.remainingTime = this.initialTime;
  }

  private stop(): void {
    clearInterval(this.intervalId);
    this.isRunning = false;
    this.remainingTime = 0;
  }
}
