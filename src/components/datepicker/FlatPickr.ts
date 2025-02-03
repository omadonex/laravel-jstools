import { AnyObjInterface } from '../../interfaces/AnyObjInterface';
import { ComponentContract } from '../contracts/ComponentContract';
import flatpickr from 'flatpickr';

export class FlatPickr implements ComponentContract {
  private id: string;
  private flatpickr: any;
  private options: AnyObjInterface;

  constructor(id: string, options: AnyObjInterface) {
    this.id = id;
    this.flatpickr = flatpickr(`#${id}`, options);
    this.options = options;
  }

  public getValue(): null | string {
    const value = this.flatpickr.selectedDates[0] || null;

    if (value) {
      return this.flatpickr.formatDate(value, this.flatpickr.config.dateFormat);
    }

    return null;
  }

  public setValue(date: any): void {
    this.flatpickr.setDate(date);
  }
}
