import { Injectable } from '@angular/core';

@Injectable()
export class ResponsiveService {
  private workspaceWidth: number = window.innerWidth;

  setWidth(newWidth: number): void {
    this.workspaceWidth = newWidth;
  }

  isMobile(): boolean {
    return this.workspaceWidth < 600;
  }

  isDesktop(): boolean {
    return !this.isMobile();
  }
}
