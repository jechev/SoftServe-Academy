import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LettersComponent } from './letters/letters.component';
import { WordService } from './services/word.service';
import { WordComponent } from './word/word.component';
import { GameService } from './services/game.service';
import { CanvasService } from './services/canvas.service';
import { ArrFromNumPipe } from './pipes/arrFromNum.pipe';
import { CanvasComponent } from './canvas/canvas.component';
import { LivesComponent } from './lives/lives.component';
import { LetttersService } from './services/lettters.service';

@NgModule({
  declarations: [
    AppComponent,
    LettersComponent,
    WordComponent,
    ArrFromNumPipe,
    CanvasComponent,
    LivesComponent
  ],
  imports: [BrowserModule],
  providers: [WordService, GameService, CanvasService, LetttersService],
  bootstrap: [AppComponent]
})
export class AppModule {}
