import 'datatables.net';
// import '../vendor/chart.js.bundle';
// import '../vendor/jsvectormap.bundle';
// import '../vendor/list.bundle';
// import '../vendor/theme.bundle';
// import '../vendor/quill.bundle';
import 'jstree';
import { Russian as FlatPickrRussian } from 'flatpickr/dist/l10n/ru.js';
import { AnyObjInterface } from '../../../interfaces/AnyObjInterface';

declare global {
  interface Window {
    components: AnyObjInterface;
    cmpJsTreeOptions: any;
    cmpQuillOptions: any;
    cmpFlatPickrOptions: any;
  }
}

window.cmpJsTreeOptions = {
  plugins: ['wholerow'],
  multiple: false,
  core: {
    themes: {
      dots: false,
      icons: false,
    },
  },
};

window.cmpQuillOptions = {
  modules: {
    toolbar: true,
  },
  theme: 'snow',
};

window.cmpFlatPickrOptions = {
  dateFormat: 'd.m.Y',
  locale: FlatPickrRussian,
  wrap: true,
};

const dt: any = window.$.fn.dataTable;
window.$.extend(true, dt.defaults, {
  language: {
    processing: 'Подождите...',
    search: 'Поиск:',
    lengthMenu: 'Показать _MENU_ записей',
    info: 'Записи с _START_ до _END_ из _TOTAL_ записей',
    infoEmpty: 'Записи с 0 до 0 из 0 записей',
    infoFiltered: '(отфильтровано из _MAX_ записей)',
    infoPostFix: '',
    loadingRecords: 'Загрузка записей...',
    zeroRecords: 'Записи отсутствуют.',
    emptyTable: 'В таблице отсутствуют данные',
    paginate: {
      first: 'Первая',
      previous: 'Предыдущая',
      next: 'Следующая',
      last: 'Последняя',
    },
    aria: {
      sortAscending: ': активировать для сортировки столбца по возрастанию',
      sortDescending: ': активировать для сортировки столбца по убыванию',
    },
  },
  pageLength: 25,
  processing: true,
  serverSide: true,
});
