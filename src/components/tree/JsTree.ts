import { AnyObjInterface } from '../../interfaces/AnyObjInterface';
import { ComponentContract } from '../contracts/ComponentContract';

export class JsTree implements ComponentContract {
  private treeId: string;
  private $tree: any;
  private tree: any;

  private callbackCollapseAll: any;
  private collapseAllDefault: boolean = true;
  private callbackExpandAll: any;
  private expandAllDefault: boolean = true;
  private callbackDeselectAll: any;
  private deselectAllDefault: boolean = true;

  constructor(treeId: string, options: AnyObjInterface, data?: AnyObjInterface[]) {
    this.treeId = treeId;
    this.$tree = $(`#${treeId}`);
    this.$tree.jstree(options);
    this.tree = this.$tree.jstree(true);

    this.setListeners();
    if (data) {
      this.setData(data, this.$tree.data('value'));
    } else {
      this.selectInitial();
    }
  }

  public setCollapseAllCallback(callback: any, saveDefault: boolean = true) {
    this.callbackCollapseAll = callback;
    this.collapseAllDefault = saveDefault;
  }

  public setExpandAllCallback(callback: any, saveDefault: boolean = true) {
    this.callbackExpandAll = callback;
    this.expandAllDefault = saveDefault;
  }

  public setDeselectAllCallback(callback: any, saveDefault: boolean = true) {
    this.callbackDeselectAll = callback;
    this.deselectAllDefault = saveDefault;
  }

  private setListeners(): void {
    this.$tree.on('hover_node.jstree', () => {
      const bar = this.$tree.find('.jstree-wholerow-hovered');
      bar.css('height', bar.parent().children('a.jstree-anchor').height() + 'px');
    });

    $(`#${this.treeId}__collapse`).on('click', () => {
      if (this.collapseAllDefault) {
        this.closeAll();
      }

      if (this.callbackCollapseAll) {
        this.callbackCollapseAll();
      }
    });

    $(`#${this.treeId}__expand`).on('click', () => {
      if (this.expandAllDefault) {
        this.openAll();
      }

      if (this.callbackExpandAll) {
        this.callbackExpandAll();
      }
    });

    $(`#${this.treeId}__deselect`).on('click', () => {
      if (this.deselectAllDefault) {
        this.deselectAll();
      }
      
      if (this.callbackDeselectAll) {
        this.callbackDeselectAll();
      }
    });
  }

  private prepareData(data: AnyObjInterface[]): AnyObjInterface[] {
    const nodeData: AnyObjInterface[] = [];
    data.forEach((item) => {
      const nodeItem: AnyObjInterface = {};
      nodeItem.id = `${this.treeId}_${item.value}`;
      nodeItem.li_attr = { 'data-value': item.value };
      nodeItem.a_attr = { 'data-value': item.value };
      nodeItem.text = item.text;
      nodeItem.children = this.prepareData(item.children);
      nodeData.push(nodeItem);
    });

    return nodeData;
  }

  public on(event: string, closure: any) {
    this.$tree.on(event, closure);
  }

  public onChanged(closure: any): void {
    this.$tree.on('changed.jstree', (e: any, data: any) => {
      if (!['ready'].includes(data.action)) {
        closure(e, data);
      }
    });
  }

  public setData(data: AnyObjInterface[], value?: number | string): void {
    if (value) {
      this.$tree.on('refresh.jstree', () => {
        this.select(value, true);
        this.$tree.off('refresh.jstree');
      });
    }

    this.closeAll();
    this.tree.settings.core.data = this.prepareData(data);
    this.tree.refresh();
  }

  public select(value: number | string, suppressEvent: boolean = false, preventOpen: boolean = false): void {
    this.reset(true);
    this.tree.select_node(`${this.treeId}_${value}`, suppressEvent, preventOpen);
  }

  public getValue(): null | string {
    const selected = this.tree.get_selected(true)[0];

    return selected ? selected.li_attr['data-value'] : null;
  }

  public closeAll(): void {
    this.tree.close_all();
  }

  public deselectAll(suppressEvent: boolean = false): void {
    this.tree.deselect_all(suppressEvent);
  }

  public openAll(): void {
    this.tree.open_all();
  }

  public reset(suppressEvent: boolean = false): void {
    this.closeAll();
    this.deselectAll(suppressEvent);
  }

  public selectInitial(): void {
    this.select(this.$tree.data('value'), true);
  }
}
