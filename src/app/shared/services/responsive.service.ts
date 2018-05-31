import { Injectable } from '@angular/core';

@Injectable()
export class ResponsiveService {
  private workspaceWidth: number = window.innerWidth;

  public setWidth(newWidth: number): void {
    this.workspaceWidth = newWidth;
  }

  public isMobile(): boolean {
    return this.workspaceWidth < 600;
  }

  public isDesktop(): boolean {
    return !this.isMobile();
  }
}
