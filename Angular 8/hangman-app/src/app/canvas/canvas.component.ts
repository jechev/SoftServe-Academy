import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { CanvasService } from '../services/canvas.service';
import { GameService } from '../services/game.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  gameSubscription: Subscription;

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;

  constructor(
    private gameService: GameService,
    private canvasService: CanvasService
  ) {
    this.subscription = this.gameService
      .takeClickedLetter()
      .subscribe(result => {
        if ('step' in result) {
          const step = this.canvasService.canvasSteps[result.step];
          if (step) {
            step(this.ctx);
          }
        }
      });
    this.gameSubscription = this.gameService
      .sendGameStatus()
      .subscribe(result => {
        if (result.status === 'reset') {
          this.canvasService.clearCanvas(this.canvas.nativeElement);
        }
      });
  }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.gameSubscription.unsubscribe();
  }
}
