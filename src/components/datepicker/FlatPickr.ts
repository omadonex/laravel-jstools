import { AnyObjInterface } from '../../interfaces/AnyObjInterface';
import { ComponentContract } from '../contracts/ComponentContract';
import flatpickr from 'flatpickr';

export class FlatPickr implements ComponentContract {
  private id: string;
  private flatpickr: any;

  constructor(id: string, options: AnyObjInterface) {
    this.id = id;
    this.flatpickr = flatpickr(`#${id}`, options);
  }

  public getValue(): null | string {
    return this.flatpickr.selectedDates;
  }

  public setValue(date: any): void {
    this.flatpickr.setDate(date);
  }
}
