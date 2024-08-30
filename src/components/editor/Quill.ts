import { AnyObjInterface } from '../../interfaces/AnyObjInterface';
import { ComponentContract } from '../contracts/ComponentContract';
import QuillNpm from 'quill';

export class Quill implements ComponentContract {
  private quillId: string;
  private quill: any;

  constructor(quillId: string, options: AnyObjInterface, data?: AnyObjInterface[]) {
    this.quillId = quillId;
    this.quill = new QuillNpm(quillId, options);
  }

  public getValue(): null | string {
    // const selected = this.tree.get_selected(true)[0];
    // var delta = editor.getContents();
    // var text = editor.getText();
    // var justHtml = editor.root.innerHTML;
    // preciousContent.innerHTML = JSON.stringify(delta);
    // justTextContent.innerHTML = text;
    // justHtmlContent.innerHTML = justHtml;
    return null;
  }

  public setValue(json: string): void {
    this.quill.setContents(json);
  }
}
