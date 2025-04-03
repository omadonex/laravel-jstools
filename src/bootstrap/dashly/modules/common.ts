declare global {
  interface Window {
    timeoutList: any;
    csrf: string;

    timeout: (uniqueId: string, callback: any, time?: number) => void;
  }
}

window.timeoutList = {};
window.csrf = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content;

window.timeout = function (uniqueId: string, callback: any, time: number = 500): void {
  if (window.timeoutList.hasOwnProperty(uniqueId)) {
    const timerId: any = window.timeoutList[uniqueId];
    clearTimeout(timerId);
  }

  window.timeoutList[uniqueId] = setTimeout(() => {
    delete window.timeoutList[uniqueId];
    callback();
  }, time);
};

export {};
