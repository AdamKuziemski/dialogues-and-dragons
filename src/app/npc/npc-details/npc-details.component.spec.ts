import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ActivatedRoute, ActivatedRouteStub } from '@testing/activated-route-stub';
import { click } from '@testing/click.function';
import { Game, GameService, createTestGame } from '@game/testing/test-game';
import { RouterLinkDirectiveStub } from '@testing/router-link-directive-stub';

import { NPC } from '@npc/npc';
import { NpcDetailsComponent } from './npc-details.component';
import { ResponsiveService } from '@responsive-service';

describe('NpcDetailsComponent', () => {
  let component: NpcDetailsComponent;
  let fixture: ComponentFixture<NpcDetailsComponent>;
  let testGame: Game;

  const activatedRoute = new ActivatedRouteStub();
  const testNpcId = 'TestNPCQuestGiver';
  const testNPC = () => testGame.npcs.get(testNpcId);

  beforeEach(() => {
    activatedRoute.setParamMap({ id: testNpcId });
    testGame = createTestGame();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NpcDetailsComponent,
        RouterLinkDirectiveStub
      ],
      imports: [
        FormsModule,
        MatCardModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        NoopAnimationsModule
      ],
      providers: [
        GameService,
        ResponsiveService,
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(NpcDetailsComponent);
      component = fixture.componentInstance;
      component.game.setGame(testGame);
      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeTruthy());

  it('should subscribe to route params and retrieve an NPC', () => {
    expect(component.actorId).toBe(testNpcId);
    expect(component.npc).toEqual(testNPC());
    expect(component.hasSubscription).toBe(true);
  });

  it('should correctly return constants from NPC', () => {
    expect(component.maximumNameLength).toBe(NPC.maximumNameLength);
  });

  it('should display a mat-card with NPC details', fakeAsync(() => {
    tick();
    expect(fixture.debugElement.query(By.css('mat-card'))).not.toBeNull();
  }));

  it('should display a router link to a dialogue component and navigate to it', () => {
    const dialogueLink = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub))[0];
    const routerLink = dialogueLink.injector.get(RouterLinkDirectiveStub);
    const expectedLink = ['/dialogue', testNpcId];

    expect(dialogueLink).not.toBeNull();
    expect(routerLink).not.toBeNull();
    expect(routerLink.linkParams).toEqual(expectedLink);
    expect(routerLink.navigatedTo).toBeNull('should not have navigated yet');

    click(dialogueLink);
    fixture.detectChanges();

    expect(routerLink.navigatedTo).toEqual(expectedLink);
  });

  xit('should double bind inputs', fakeAsync(() => {
    tick();

    const initialMerchantValue = component.npc.isMerchant;

    const nameArea = fixture.debugElement.query(By.css('textarea'));
    const moneyInput = fixture.debugElement.query(By.css('input[type=number]'));
    const genderSelect = fixture.debugElement.query(By.css('mat-select'));
    const merchantCheckbox = fixture.debugElement.query(By.css('#merchant'));
    const merchantClickable = fixture.debugElement.query(By.css('#merchant label'));

    const changeValue = (input: DebugElement, newValue: string | number) => {
      input.nativeElement.value = newValue;
      input.nativeElement.dispatchEvent(new Event('input'));
    };

    expect(nameArea).not.toBeNull();
    expect(moneyInput).not.toBeNull();
    expect(genderSelect).not.toBeNull();
    expect(merchantCheckbox).not.toBeNull();
    expect(merchantClickable).not.toBeNull();

    expect(nameArea.nativeElement.value).toBe(component.npc.name, 'name input binds with NPC name');
    expect(moneyInput.nativeElement.value).toBe('' + component.npc.money, 'money input binds with NPC money');
    // expect(genderSelect.nativeElement.selected).toBe(component.npc.gender, 'gender select binds with NPC gender');

    changeValue(nameArea, 'NewTestName');
    changeValue(moneyInput, 666);
    click(merchantClickable.nativeElement);

    fixture.detectChanges();
    tick();

    expect(component.npc.name).toBe('NewTestName', 'NPC name changes when name input changes value');
    expect(component.npc.money).toBe(666, 'NPC money changes when money input changes value');
    expect(component.npc.isMerchant).toBe(!initialMerchantValue, 'NPC merchant flag changes when merchant checkbox is clicked');
  }));
});
