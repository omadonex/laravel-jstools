import { AnyObjInterface } from '../../interfaces/AnyObjInterface';
import { ComponentContract } from '../contracts/ComponentContract';

export class JsTree implements ComponentContract {
  private treeId: string;
  private $tree: any;
  private tree: any;

  constructor(treeId: string, options: AnyObjInterface, data?: AnyObjInterface[]) {
    this.treeId = treeId;
    this.$tree = $(`#${treeId}`);
    this.$tree.jstree(options);
    this.tree = this.$tree.jstree(true);

    this.setListeners();
    if (data) {
      this.setData(data);
    }
  }

  private setListeners(): void {
    this.$tree.on('hover_node.jstree', () => {
      const bar = this.$tree.find('.jstree-wholerow-hovered');
      bar.css('height', bar.parent().children('a.jstree-anchor').height() + 'px');
    });

    $(`#${this.treeId}__collapse`).on('click', () => {
      this.closeAll();
    });

    $(`#${this.treeId}__expand`).on('click', () => {
      this.openAll();
    });

    $(`#${this.treeId}__deselect`).on('click', () => {
      this.deselectAll();
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

  public on(event: string, closure: (params: any) => any) {
    this.$tree.on('changed.jstree', closure);
  }

  public setData(data: AnyObjInterface[], value?: number | string): void {
    if (value) {
      this.$tree.on('refresh.jstree', () => {
        this.select(value);
        this.$tree.off('refresh.jstree');
      });
    }

    this.closeAll();
    this.tree.settings.core.data = this.prepareData(data);
    this.tree.refresh();
  }

  public select(value: number | string): void {
    this.reset();
    this.tree.select_node(`${this.treeId}_${value}`);
  }

  public getValue(): null | string {
    const selected = this.tree.get_selected(true)[0];

    return selected ? selected.li_attr['data-value'] : null;
  }

  public closeAll(): void {
    this.tree.close_all();
  }

  public deselectAll(): void {
    this.tree.deselect_all();
  }

  public openAll(): void {
    this.tree.open_all();
  }

  public reset(): void {
    this.closeAll();
    this.deselectAll();
  }
}
