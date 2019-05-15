import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';

import {
  MatButtonModule, MatDialog, MatDialogModule, MatInputModule, MatOption, MatSelectModule
} from '@angular/material';

import { click } from '@testing/click.function';

import { AddEntityDialogComponent } from './add-entity.component';

@Component({ template: '' })
class NoopComponent { }

const TEST_DIRECTIVES = [
  AddEntityDialogComponent,
  NoopComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    NoopAnimationsModule
  ],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [AddEntityDialogComponent],
})
class DialogTestModule { }

describe('AddEntityDialogComponent', () => {
  let dialog: MatDialog;
  let noop: ComponentFixture<NoopComponent>;
  let overlayContainerElement: HTMLElement;

  const createDialog = (): AddEntityDialogComponent => {
    TestBed.configureTestingModule({
      imports: [DialogTestModule],
      providers: [{
        provide: OverlayContainer,
        useFactory: () => {
          overlayContainerElement = document.createElement('div');
          return { getContainerElement: () => overlayContainerElement };
        }
      }]
    });

    dialog = TestBed.get(MatDialog);
    noop = TestBed.createComponent(NoopComponent);

    dialog.open(AddEntityDialogComponent, {
      data: {
        type: 'npc',
        id: '',
        name: ''
      }
    });
    noop.detectChanges();

    return dialog.openDialogs[0].componentInstance;
  }

  it('should open with a preselected type and a disabled save button', fakeAsync(() => {
    const component = createDialog();

    tick();
    noop.detectChanges();

    expect(component.typeSelect).not.toBeNull();

    const selected: MatOption = component.typeSelect.selected as MatOption;
    expect(selected.value).toBe('npc');

    const saveButton: HTMLButtonElement = overlayContainerElement.querySelector('button[color=primary]');
    expect(saveButton).not.toBeNull();
    expect(saveButton.disabled).toBe(true);

    flush();
  }));

  it('should enable save with valid values', fakeAsync(() => {
    const component = createDialog();
    const newId = 'TestValidNPCId';
    const newName = 'Very Clever Guy';

    spyOn(component, 'onSave').and.callThrough();
    component.dialogRef.afterClosed().subscribe(result => expect(result).toEqual({
      type: 'npc',
      id: newId,
      name: newName
    }));

    component.data.id = newId;
    component.data.name = newName;

    tick();
    noop.detectChanges();

    const saveButton: HTMLButtonElement = overlayContainerElement.querySelector('button[color=primary]');
    expect(saveButton.disabled).toBe(false);

    click(saveButton);

    noop.detectChanges();
    flush();

    expect(component.onSave).toHaveBeenCalled();
  }));
});
