import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule, MatCheckboxModule, MatExpansionModule, MatInputModule } from '@angular/material';

import { ActionModule } from '../../action/action.module';
import { ActivatedRoute, ActivatedRouteStub } from '@testing/activated-route-stub';
import { click } from '@testing/click.function';
import { createTestGame } from '@game/testing/test-game';

import { Game } from '@game/game';
import { GameService } from '@game-service';
import { Item } from '@item/item';
import { ItemDetailsComponent } from './item-details.component';
import { ResponsiveService } from '@responsive-service';

describe('ItemDetailsComponent', () => {
  let component: ItemDetailsComponent;
  let fixture: ComponentFixture<ItemDetailsComponent>;
  let activatedRoute = new ActivatedRouteStub();

  let testGame: Game;
  const testItemId = 'TestItemPotion';
  const testItem = () => testGame.items[testItemId];

  beforeEach(() => {
    activatedRoute.setParamMap({ id: testItemId });
    testGame = createTestGame();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemDetailsComponent],
      imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatInputModule,
        NoopAnimationsModule,
        ActionModule
      ],
      providers: [
        GameService,
        ResponsiveService,
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ItemDetailsComponent);
      component = fixture.componentInstance;
      component.game.setGame(testGame);
      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeTruthy());

  it('should subscribe to route params and retrieve an item', () => {
    expect(component.itemId).toBe(testItemId);
    expect(component.item).toEqual(testItem());
    expect(component.hasSubscription).toBe(true);
  });

  it('should correctly return constants from Item', () => {
    expect(component.maximumNameLength).toBe(Item.maximumNameLength);
    expect(component.maximumDescriptionLength).toBe(Item.maximumDescriptionLength);
  });

  it('should display a mat-card with item details', fakeAsync(() => {
    tick();
    expect(fixture.debugElement.query(By.css('mat-card'))).not.toBeNull();
  }));

  it('should display a mat-accordion with item description and actions', fakeAsync(() => {
    tick();
    expect(fixture.debugElement.query(By.css('mat-accordion'))).not.toBeNull();
    expect(fixture.debugElement.queryAll(By.css('mat-expansion-panel')).length).toBe(2);
  }));

  it('should display an additional expansion panel when the readable checkbox is checked', fakeAsync(() => {
    tick();

    const readableCheckbox = fixture.debugElement.query(By.css('#readable label'));
    expect(readableCheckbox).not.toBeNull();

    click(readableCheckbox.nativeElement);
    fixture.detectChanges();
    tick();

    expect(component.item.isReadable).toBe(true);
    expect(fixture.debugElement.queryAll(By.css('mat-expansion-panel')).length).toBe(3);
  }));

  it('should double bind inputs', fakeAsync(() => {
    tick();

    const nameArea = fixture.debugElement.queryAll(By.css('textarea'))[0];
    const [valueInput, weightInput] = fixture.debugElement.queryAll(By.css('input[type=number]'));

    const changeValue = (input: DebugElement, newValue: string | number) => {
      input.nativeElement.value = newValue;
      input.nativeElement.dispatchEvent(new Event('input'));
    }

    expect(nameArea).not.toBeNull();
    expect(valueInput).not.toBeNull();
    expect(weightInput).not.toBeNull();

    expect(nameArea.nativeElement.value).toBe(component.item.name, 'name input binds with item name');
    expect(valueInput.nativeElement.value).toBe('' + component.item.value, 'value input binds with item value');
    expect(weightInput.nativeElement.value).toBe('' + component.item.weight, 'weight input binds with item weight');

    changeValue(nameArea, 'NewTestName');
    changeValue(valueInput, 666);
    changeValue(weightInput, 128.32);

    fixture.detectChanges();
    tick();

    expect(component.item.name).toBe('NewTestName', 'item name changes when name input changes value');
    expect(component.item.value).toBe(666, 'item value changes when value input changes value'); // MOAR VALUE
    expect(component.item.weight).toBe(128.32, 'item weight changes when weight input changes value');
  }));
});
