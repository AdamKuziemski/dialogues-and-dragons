import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, FormControl, Validator, ValidatorFn, ValidationErrors } from '@angular/forms';

import { GameService } from '@game/game.service';

function validateIdFactory(isInvalidId: (value: string) => boolean): ValidatorFn {
  return (c: AbstractControl): ValidationErrors => {
    return isInvalidId(c.value as string) ? {
      invalidId: true
    } : null;
  }
}

@Directive({
  selector: '[ncvIdValidator][ngModel],[ncvIdValidator][formControl]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => IdValidatorDirective), multi: true }
  ]
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
    return value === 'player' ||
      this.game.items.hasOwnProperty(value) ||
      this.game.npcs.hasOwnProperty(value) ||
      this.game.quests.hasOwnProperty(value);
  }
}
