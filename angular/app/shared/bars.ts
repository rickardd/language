export interface IBars{
  translations : number
  percentage : number
}


export class Bar {
  translations : number
  percentage : number

  constructor( _translations : number = 0, _percentage : number = 0  ) {
    this.translations = _translations
    this.percentage = _percentage
  }

}

export class Bars {

  array = [];

  constructor( bar : Bar = new Bar() ) {

    this.array.push( new IBars( ) )
  }
}