import { Component, State, Prop } from '@stencil/core';
import { CountdownTimerModel } from "./du-countdown-timer.model";

@Component({
  tag: 'du-countdown-timer',
  styleUrl: 'du-countdown-timer.scss',
  shadow: true
})
export class DigutilCountdownTimer {

  @Prop() timeTarget: string;
  @State() timeRemaining: CountdownTimerModel;

  private interval: any;

  componentWillLoad() {
    this.timeRemaining = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }

  componentDidLoad() {
    if(this.isValidDate(this.timeTarget)) {
      this.interval = setInterval(() => this.tick(), 1000);
      this.tick();
    }
  }

  componentDidUnload() {
    clearInterval(this.interval);
  }

  public isValidDate(date): boolean {
    let formattedDate = new Date(date).toDateString();
    return formattedDate !== 'Invalid Date';
  }

  public getTimeToTargetInMilliseconds(date: string): number {
    return new Date(date).getTime() - Date.now()
  }

  public getRemainingTime(date: string): CountdownTimerModel {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const millisecondsPerHour = 1000 * 60 * 60;
    const millisecondsPerMinute = 1000 * 60;
    const millisecondsPerSecond = 1000;
    let remainder;

    let result = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    const timeToTarget: number = this.getTimeToTargetInMilliseconds(date);

    if(timeToTarget < 0) {
      return result;
    }

    result.days = Math.floor(timeToTarget / millisecondsPerDay);
    remainder = timeToTarget - (result.days * millisecondsPerDay);
    result.hours = Math.floor(remainder / (millisecondsPerHour));
    remainder -= result.hours * millisecondsPerHour;
    result.minutes = Math.floor(remainder / millisecondsPerMinute);
    remainder -= result.minutes * millisecondsPerMinute;
    result.seconds = Math.floor(remainder / millisecondsPerSecond);

    return result;
  }

  public tick() {
    if(this.timeTarget === undefined) {
      return;
    }

    this.timeRemaining = this.getRemainingTime(this.timeTarget);
  }

  render() {
    return (
      <div class="container">
        <div class="counter">
          <div>{this.timeRemaining.days}</div>
          <span>days</span>
        </div>

        <div class="counter">
          <div>{this.timeRemaining.hours}</div>
          <span>hours</span>
        </div>

        <div class="counter">
          <div>{this.timeRemaining.minutes}</div>
          <span>minutes</span>
        </div>

        <div class="counter">
          <div>{this.timeRemaining.seconds}</div>
          <span>seconds</span>
        </div>
      </div>
    );
  }
}
