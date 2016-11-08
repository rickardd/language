
interface iVerbConjugation{
  id : number
  verb_id : number
  spanish : string
  english : string
  helper_verb : string
  is_regular : boolean
  person : string
  section : string
  spanish_pron : string
  tens : string
  updated_at : string
  created_at : string
}


export class VerbConjugation{

  id : number
  verb_id : number
  spanish : string
  english : string
  helper_verb : string
  is_regular : boolean
  person : string
  section : string
  spanish_pron : string
  tens : string
  updated_at : string
  created_at : string

  constructor( obj : iVerbConjugation = {
                          id: -1,
                          verb_id: -1,
                          spanish: "",
                          english: "",
                          helper_verb: "",
                          is_regular: false,
                          person: "",
                          section: "",
                          spanish_pron: "",
                          tens: "",
                          updated_at: "",
                          created_at: ""
                        }){
                          this.id = obj.id
                          this.verb_id = obj.verb_id
                          this.spanish = obj.spanish
                          this.english = obj.english
                          this.helper_verb = obj.helper_verb
                          this.is_regular = obj.is_regular
                          this.person = obj.person
                          this.section = obj.section
                          this.spanish_pron = obj.spanish_pron
                          this.tens = obj.tens
                          this.updated_at = obj.updated_at
                          this.created_at = obj.created_at

                        }

}


export class VerbList{

  collection : any[] = []

  constructor( arr : any[] = [] ){
    arr.forEach( (keyObject, index, array) => {
      this.collection.push( new Translation( keyObject ))
    })
  }
}


// export class List{

//   collection : any[] = []

//   constructor( arr : any[] = [] ){
//     arr.forEach( (keyObject, index, array) => {
//       this.collection.push( new Translation( keyObject ))
//     })
//   }

//   quantity(){
//     return this.collection.length
//   }

//   getTranslation( id : number ){
//      return _.find( this.collection, function( item ){ return item.id == id} )
//   }
//   removeTranslation( id : number ){
//      return _.filter( this.collection, function( item ){ return item.id != id} )
//   }


//   sortBy( sortTerm : string ){
//     // By default underscore will sort upperCase before lowerCase
//     // _.sortBy( this.collection, 'spanish'); => A.B.C.a.b.c
//     // passing in the function to force lowerCase => A.a.B.b.C.c
//     sortTerm = !!sortTerm ? sortTerm.toLowerCase() : sortTerm
//     return _.sortBy( this.collection, function (i) {
//       if( typeof i[sortTerm] === "number" ){
//         return i[sortTerm]
//       }
//       else{
//         return !!i[sortTerm] ? i[sortTerm].toLowerCase() : "";
//       }
//     });
//   }
//   filterCategory( category : string ){
//     return _.filter( this.collection,
//               function( item ){
//                 let cat = !!item.category ? item.category.toLowerCase() : item.category;
//                 category = category.toLowerCase()
//                 if( category === "other" ){
//                   let notInList = ["verb", "adjective", "noun", "phrase", "conjunction", "idiom"].indexOf( cat ) === -1
//                   return notInList || !cat // will return true if no category or if no match in list.
//                 }
//                 else{
//                   return !!cat && cat.toLowerCase() === category.toLowerCase()
//                 }
//               })
//   }
//   filterBucket( bucket : number ){
//     return _.filter( this.collection,
//               function( item ){
//                 return item.bucket === bucket
//               })
//   }

//   countCategory(){
//     return _.countBy( this.collection,
//               function( item ) {
//                 let category = (!!item.category) ? item.category.toLowerCase() : item.category;
//                 switch ( category ) {
//                   case "verb":
//                     return "verbs"
//                   case "idiom":
//                     return "idioms"
//                   case "phrase":
//                     return "phrases"
//                   case "noun":
//                     return "nouns"
//                   case "adjective":
//                     return "adjectives"
//                   case "conjunction":
//                     return "conjunctions"
//                   default:
//                     return "other"
//                  }
//               });
//   }

//   countBuckets(){
//     return _.countBy( this.collection,
//               function(item) {
//                 switch (item.bucket) {
//                   case -1:
//                     return 0;
//                   case 0:
//                     return 1;
//                    case 1:
//                     return 2;
//                    case 2:
//                     return 3;
//                    case 3:
//                     return 4;
//                    case 4:
//                     return 5;
//                    case 5:
//                     return 6;
//                 }
//               });
//   }
// }



export class VerbListTemp{

  collection : any[] = []

  constructor( arr : any[] = [] ){
    this.collection = arr
    console.log( this.collection, arr );
  }

  filterConjucation( list, person : string){
    let stripedList = _.each( list,
        function( item, collection_index, collection_list ){
          delete list[collection_index].infinitive
          delete list[collection_index].gerund
          delete list[collection_index].pastParticiple

          _.each( item.collection.indicative,
              function( indicative, indicative_index, indicative_list ){
                list[collection_index].collection.indicative[indicative_index] = _.filter( indicative, function( conjugation ){
                  return conjugation.person === person
                })
              })
        })
    return stripedList
  }

  filterInfinitive( list ){
    let stripedList = _.each( list,
        function( item, collection_index, collection_list ){
          delete list[collection_index].gerund
          delete list[collection_index].pastParticiple
          delete item.collection.indicative
        })
    return stripedList
  }
}




