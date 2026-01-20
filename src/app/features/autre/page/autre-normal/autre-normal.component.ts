import { Component, Inject, OnInit } from '@angular/core';
import { ConsoleLogger, Logger, LOGGER_TOKEN } from '@core/logger/injectToken.constante';

@Component({
  selector: 'app-autre-normal',
  templateUrl: './autre-normal.component.html',
  styleUrls: ['./autre-normal.component.css'],
  providers: [
  {
    provide: LOGGER_TOKEN,
    useClass: ConsoleLogger
  }
]

})
export class AutreNormalComponent implements OnInit {
  constructor(@Inject(LOGGER_TOKEN) private logger: Logger) {}


  ngOnInit() {
    this.logger.log('AutreNormalComponent initialized');
  }

}
