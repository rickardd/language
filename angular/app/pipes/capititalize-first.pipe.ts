import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({name: 'capitalizeFirst'})

export class CapitalizeFirstPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) return value;

    return value.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}
