import {Component} from 'angular2/core';

@Component({
    selector: 'urgent-words',
    template: `
        <div class="ct-chart-pie" id="ct-chart-pie"></div>
        <div class="testx">asdfasfasdf</div>
    `,
    styleUrls: [
                  'node_modules/chartist/dist/chartist.min.css',
                  'app/profile/urgent_words.component.css'
                ],
    directives: [

    ]
})

export class UrgentWordsComponent {
  constructor(){

  }

  ngOnInit(){

    new Chartist.Pie('#ct-chart-pie', {
                                    series: [60, 40]
                                  }, {
                                    donut: true,
                                    donutWidth: 40,
                                    startAngle: 270,
                                    total: 200

                                  });

  }
}