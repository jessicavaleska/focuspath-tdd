import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PomodoroTimerService {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private initialTime = 0;

  remainingTime = 0;
  isRunning = false;

  onTimerComplete = new Subject<void>();

  constructor() {}

  start(timeInMs?: number): void {
    if (this.isRunning) {
      return;
    }

    if (timeInMs !== undefined) {
      if (timeInMs <= 0) {
        return;
      }

      this.initialTime = timeInMs;
      this.remainingTime = timeInMs;
    }

    if (this.remainingTime <= 0) {
      this.remainingTime = this.initialTime;
    }

    if (this.remainingTime <= 0) {
      return;
    }

    this.isRunning = true;
    this.runTimer();
  }

  pause(): void {
    if (!this.isRunning) {
      return;
    }

    this.clearTimerInterval();
    this.isRunning = false;
  }

  reset(): void {
    this.clearTimerInterval();
    this.isRunning = false;
    this.remainingTime = this.initialTime;
  }

  private runTimer(): void {
    this.clearTimerInterval();

    this.intervalId = setInterval(() => {
      this.decreaseTime();
    }, 1000);
  }

  private decreaseTime(): void {
    if (this.remainingTime > 1000) {
      this.remainingTime -= 1000;
      return;
    }

    this.completeTimer();
  }

  private completeTimer(): void {
    this.remainingTime = 0;
    this.clearTimerInterval();
    this.isRunning = false;
    this.onTimerComplete.next();
  }

  private clearTimerInterval(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}