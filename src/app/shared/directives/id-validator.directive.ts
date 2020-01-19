import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

import { GameService } from '@game/game.service';
import { Player } from '@player';

function validateIdFactory(isInvalidId: (value: string) => boolean): ValidatorFn {
  return (c: AbstractControl): ValidationErrors => {
    return isInvalidId(c.value as string) ? {
      invalidId: true
    } : null;
  };
}

@Directive({
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => IdValidatorDirective), multi: true }
  ],
  selector: '[dndIdValidator][ngModel],[dndIdValidator][formControl]',
})
export class IdValidatorDirective implements Validator {
  validator: ValidatorFn;

  constructor(public game: GameService) {
    this.validator = validateIdFactory(this.hasId.bind(this));
  }

  validate(c: FormControl): ValidationErrors {
    return this.validator(c);
  }

  hasId(value: string): boolean {
    return value === Player.globalId ||
      this.game.items.has(value) ||
      this.game.npcs.has(value) ||
      this.game.quests.has(value);
  }
}
