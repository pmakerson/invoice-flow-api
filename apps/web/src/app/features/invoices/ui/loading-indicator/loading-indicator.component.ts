import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-indicator',
  imports: [],
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class LoadingIndicatorComponent {
  readonly visible = input(false);

}
