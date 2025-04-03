import {Service} from "laravel-jstools-di";
import {DashlyServiceContract} from "./contracts/DashlyServiceContract";
import {DashlyThemeEnum} from "./DashlyThemeEnum";
import {DashlySidebarBehaviourEnum} from "./DashlySidebarBehaviourEnum";

export class DashlyService extends Service implements DashlyServiceContract {

    private setTheme(theme: DashlyThemeEnum): void {
        const isDark = window.matchMedia(`(prefers-color-scheme: ${DashlyThemeEnum.dark})`).matches;
        if (theme === DashlyThemeEnum.auto && isDark) {
            document.documentElement.dataset.theme = isDark ? DashlyThemeEnum.dark : DashlyThemeEnum.light;
        } else {
            document.documentElement.dataset.theme = theme;
        }

        localStorage.setItem('theme', theme);
    };

    private getPreferredTheme(): DashlyThemeEnum {
        if (localStorage.getItem('theme') != null) {
            return localStorage.getItem('theme') as DashlyThemeEnum;
        }

        return document.documentElement.dataset.theme as DashlyThemeEnum;
    };

    private showActiveTheme(theme: DashlyThemeEnum): void {
        const activeBtn = document.querySelector(`[data-theme-value="${theme}"]`);

        document.querySelectorAll('[data-theme-value]').forEach((element: any) => {
            element.classList.remove('active');
        });

        activeBtn && activeBtn.classList.add('active');
    };

    private reloadPage(): void {
        window.location.reload();
    }

    public enableThemeSwitcher(): void {
        let themeSwitcher = document.getElementById('themeSwitcher');

        this.setTheme(this.getPreferredTheme());

        if (typeof themeSwitcher !== 'undefined') {
            window.matchMedia(`(prefers-color-scheme: ${DashlyThemeEnum.dark})`).addEventListener('change', e => {
                if (localStorage.getItem('theme') != null) {
                    if (localStorage.getItem('theme') === DashlyThemeEnum.auto) {
                        this.reloadPage();
                    }
                }
            });

            window.addEventListener('load', () => {
                this.showActiveTheme(this.getPreferredTheme());

                document.querySelectorAll('[data-theme-value]').forEach(element => {
                    element.addEventListener('click', () => {
                        const theme = element.getAttribute('data-theme-value') as DashlyThemeEnum;
                        localStorage.setItem('theme', theme);
                        this.reloadPage();
                    })
                })
            });
        }
    }

    private setSidebarBehaviour(sidebarBehaviour: DashlySidebarBehaviourEnum): void {
        document.documentElement.dataset.sidebarBehaviour = sidebarBehaviour;
        localStorage.setItem('sidebarBehaviour', sidebarBehaviour);
    };

    private getPreferredSidebarBehaviour(): DashlySidebarBehaviourEnum {
        if (localStorage.getItem('sidebarBehaviour') != null) {
            return localStorage.getItem('sidebarBehaviour') as DashlySidebarBehaviourEnum;
        }

        return document.documentElement.dataset.sidebarBehaviour as DashlySidebarBehaviourEnum;
    };

    private showActiveSidebarBehaviour(sidebarBehaviour: DashlySidebarBehaviourEnum): void {
        const activeBtn = document.querySelector(`[data-sidebar-behaviour-value="${sidebarBehaviour}"]`);

        document.querySelectorAll('[data-sidebar-behaviour-value]').forEach((element: any) => {
            element.classList.remove('active');
        });

        activeBtn && activeBtn.classList.add('active');
    };

    public enableSidebarBehaviourChanger(): void {
        let sidebarBehaviourChanger = document.getElementById('sidebarBehaviourChanger');

        this.setSidebarBehaviour(this.getPreferredSidebarBehaviour());

        if (typeof sidebarBehaviourChanger !== 'undefined') {
            window.addEventListener('load', () => {
                this.showActiveSidebarBehaviour(this.getPreferredSidebarBehaviour());

                document.querySelectorAll('[data-sidebar-behaviour-value]').forEach(element => {
                    element.addEventListener('click', () => {
                        const sidebarBehaviour = element.getAttribute('data-sidebar-behaviour-value') as DashlySidebarBehaviourEnum;
                        localStorage.setItem('sidebarBehaviour', sidebarBehaviour);
                        this.reloadPage();
                    })
                })
            });
        }
    }
}
