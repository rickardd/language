import {Component} from 'angular2/core'
import {RouterLink} from 'angular2/router'

@Component({
  selector: "navigation",
  templateUrl: "app/navigation/navigation.component.html",
  styleUrls: ["app/navigation/navigation.component.css"],
  directives: [
    RouterLink
  ]
})

export class NavigationComponent{

}
