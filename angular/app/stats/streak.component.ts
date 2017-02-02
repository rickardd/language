import {Component} from 'angular2/core';

@Component({
    selector: 'streak',
    template: `
        <div class="ct-chart-line" id="ct-chart-line"></div>
    `,
    styleUrls: [
                  'node_modules/chartist/dist/chartist.min.css',
                  'app/stats/streak.component.css'
                ],
    directives: [

    ]
})

export class StreakComponent {
  constructor(){

  }

  ngOnInit(){

    var data = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      series: [
        [5, 2, 4, 2, 0]
      ]
    };

    var options = {
      showPoint: true,
      showLine: true,
      showArea: false,
      fullWidth: true,
      showLabel: true,
      axisX: {
        showGrid: false,
        showLabel: true,
        offset: 0
      },
      axisY: {
        showGrid: true,
        showLabel: true,
        offset: 20
      },
      chartPadding: 40,
      low: 0
    }

    new Chartist.Line('#ct-chart-line', data, options);

  }
}