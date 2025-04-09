declare global {
  interface Window {
    bootstrap: any;

    // From Dashly Bootstrap
    Alert: any;
    Button: any;
    Carousel: any;
    Collapse: any;
    Dropdown: any;
    Modal: any;
    Offcanvas: any;
    Popover: any;
    ScrollSpy: any;
    Tab: any;
    Toast: any;
    Tooltip: any;
  }
}

const bootstrap = {
  Alert: window.Alert,
  Button: window.Button,
  Carousel: window.Carousel,
  Collapse: window.Collapse,
  Dropdown: window.Dropdown,
  Modal: window.Modal,
  Offcanvas: window.Offcanvas,
  Popover: window.Popover,
  ScrollSpy: window.ScrollSpy,
  Tab: window.Tab,
  Toast: window.Toast,
  Tooltip: window.Tooltip,
};

window.bootstrap = bootstrap;

export {};
