import * as $ from 'jquery';

declare global {
  interface Window {
    $: any;
  }

  interface JQuery {
    omxInputFilter(inputFilter: any): JQuery;

    omxNumberGet(fromData?: boolean): number;
    omxNumberSet(value: any, omxValue: any): JQuery;
    omxNumberRound(value: number, round: boolean, decimals?: number): number;
    omxNumberFormat(value: number, decimals?: number): string;
  }
}

$.fn.omxInputFilter = function (inputFilter: any): JQuery {
  return this.on(
    'input keydown keyup mousedown mouseup select contextmenu drop',
    function (
      this: (HTMLInputElement | HTMLTextAreaElement) & {
        oldValue: string;
        oldSelectionStart: number | null;
        oldSelectionEnd: number | null;
      },
    ) {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty('oldValue')) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = '';
      }
    },
  );
};

$.fn.omxNumberRound = function (value: number, round: boolean, decimals?: number): number {
  if (!round) {
    return value;
  }

  if (!decimals) {
    return Math.round(value);
  }

  return parseFloat(value.toFixed(decimals));
};

$.fn.omxNumberGet = function (fromData?: boolean): number {
  if (fromData) {
    return this.data('omxValue') as number;
  }

  const val: string = this.val() as string;

  return val ? parseFloat(val.replace(',', '.').trim()) : 0;
};

$.fn.omxNumberSet = function (value: any, omxValue: any): JQuery {
  this.data('omx-value', omxValue);
  this.attr('data-omx-value', omxValue);
  this.val(value);

  return this;
};

$.fn.omxNumberFormat = function (value: number, decimals?: number): string {
  const parts = (decimals ? value.toFixed(decimals).replace('.', ',') : value.toString()).split(',');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return parts.join(',');
};

window.$ = $;
