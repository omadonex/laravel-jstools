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
    if (this.options.mode === undefined) {
      return this.flatpickr.selectedDates[0] || null;
    }
    
    return this.flatpickr.selectedDates;
  }

  public setValue(date: any): void {
    this.flatpickr.setDate(date);
  }
}
