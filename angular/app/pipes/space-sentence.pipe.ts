import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({name: 'spaceSentence'})

export class SpaceSentencePipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) return value;
    let arr = value.split(",")
    let str : string = ""

    _.each( arr, function( key, i ){
      let last = arr.length -1 === i
      if( !last ) str += key + ", "
      else str += key
    })
    return str
  }
}
