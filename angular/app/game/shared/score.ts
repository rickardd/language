// ToDo: is it used?
export class Bucket{
  bucket : number
  step : number
}


// export interface IScoreChange {
//   bucket : string // e.g up
//   step : string  // eg down
//   topLimit : boolean
//   bottomLimit : boolean
//   hello : string
// }

// export class ScoreChange implements IScoreChange {
// export class ScoreChange{

//   bucket : string = "" // e.g up
//   step : string = ""  // eg down
//   topLimit : boolean = false
//   bottomLimit : boolean = false

//   constructor(searchTerm : string ) {
//     // this.bucket = bucket ? bucket : "";
//     // this.step = step ? step : "";
//     // this.lastname = lastname ? lastname : '';
//     var self = this
//     switch (searchTerm) {
//        case "bucket_up":
//          self.bucket = "up"
//          break;
//       case "bucket_down":
//          self.bucket = "down"
//          break;
//       case "bucket_bottom_limit":
//          self.topLimit = true
//          break;
//       case "bucket_top_limit":
//          self.topLimit = true
//          break;
//       case "step_up":
//          self.step = "up"
//          break;
//       case "step_down":
//          self.step = "down"
//          break;
//      }
//   }

// }

// export class ScoreChange{
//   private bucket : string // e.g up
//   private step : string  // eg down
//   private topLimit : boolean
//   private bottomLimit : boolean
//   private hello : string

//   constructor( hello ){
//     console.log(this);
//     this.hello = hello
//     this.s(hello)

//   }

//   s(hello){
//       switch (hello) {
//        case "bucket_up":
//          this.bucket = "up"
//          break;
//       case "bucket_down":
//          this.bucket = "down"
//          break;
//       case "bucket_bottom_limit":
//          this.topLimit = true
//          break;
//       case "bucket_top_limit":
//          this.topLimit = true
//          break;
//       case "step_up":
//          this.step = "up"
//          break;
//       case "step_down":
//          this.step = "down"
//          break;
//      }
//   }
// }
