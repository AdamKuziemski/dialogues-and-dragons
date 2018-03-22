import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'splitUpperCase'
})
export class SplitUpperCasePipe implements PipeTransform {
    transform(value: string): string {
        if (!value) {
            return '';
        }
        return value.split(/(?=[A-Z])/).join(' ');
    }
}
