import { render } from '@stencil/core/testing';
import { DigutilCountdownTimer } from './du-countdown-timer';

describe('du-countdown-timer', () => {
  it('should build', () => {
    expect(new DigutilCountdownTimer()).toBeTruthy();
  });

  describe('units', () => {

    let component;
    beforeEach(async () => {
      component = new DigutilCountdownTimer();
    });

    describe('should validate date', () => {

      it('should return true with a valid date', () => {
        let dateValidation = component.isValidDate('01/01/2000');
        expect(dateValidation).toBeTruthy();
      });

      it('should return false with a invalid date', () => {
        let dateValidation = component.isValidDate('31/12/2000');
        expect(dateValidation).toBeFalsy();
      });

      it('should return false with a string of character', () => {
        let dateValidation = component.isValidDate('fake date');
        expect(dateValidation).toBeFalsy();
      });

    });

  });

  describe('rendering', () => {

    it('should work without parameters', async () => {
      let element = await render({
        components: [DigutilCountdownTimer],
        html: '<du-countdown-timer></du-countdown-timer>'
      });

      expect(element.textContent.trim()).toEqual('0days0hours0minutes0seconds');
    });

    it('should work with a invalid date', async () => {
      let element = await render({
        components: [DigutilCountdownTimer],
        html: '<du-countdown-timer time-target="99/99/9999"></du-countdown-timer>'
      });

      expect(element.textContent.trim()).toEqual('0days0hours0minutes0seconds');
    });

    it('should work with a valid date', async () => {
      let now = new Date();
      let numberOfDaysToAdd = 1;
      now.setDate(now.getDate() + numberOfDaysToAdd);

      let timeTargetString: string = (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();

      let element = await render({
        components: [DigutilCountdownTimer],
        html: '<du-countdown-timer time-target="'+timeTargetString+'"></du-countdown-timer>'
      });

      let DCT = new DigutilCountdownTimer();
      let remainingTime = DCT.getRemainingTime(timeTargetString);

      let expectedString = remainingTime.days+'days'+
        remainingTime.hours+'hours'+
        remainingTime.minutes+'minutes'+
        remainingTime.seconds+'seconds';

      expect(element.textContent.trim()).toEqual(expectedString);
    });

    it('should zero out with a negative date', async () => {
      let element = await render({
        components: [DigutilCountdownTimer],
        html: '<du-countdown-timer time-target="01/01/2000"></du-countdown-timer>'
      });

      expect(element.textContent.trim()).toEqual('0days0hours0minutes0seconds');
    });

  });
});
