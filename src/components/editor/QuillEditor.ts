import { AnyObjInterface } from '../../interfaces/AnyObjInterface';
import { ComponentContract } from '../contracts/ComponentContract';
import Quill from 'quill';

export class QuillEditor implements ComponentContract {
  private quillId: string;
  private quill: any;

  constructor(quillId: string, options: AnyObjInterface, data?: AnyObjInterface[]) {
    this.quillId = quillId;
    this.quill = new Quill(`#${quillId}`, options);
  }

  public getValue(): null | string {
    const delta = this.quill.getContents();

    return JSON.stringify(delta);
  }

  public setValue(json: string): void {
    this.quill.setContents(json);
  }
}
