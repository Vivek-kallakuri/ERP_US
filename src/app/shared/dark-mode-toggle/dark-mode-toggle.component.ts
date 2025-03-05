import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html'
})
export class DarkModeToggleComponent implements OnInit {
  isDarkMode: boolean = false;

  ngOnInit(): void {
    const storedSetting = localStorage.getItem('darkMode');
    this.isDarkMode = storedSetting === 'true';
    this.applyTheme(this.isDarkMode);
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.applyTheme(this.isDarkMode);
  }

  private applyTheme(dark: boolean): void {
    if (dark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
