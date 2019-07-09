import { Injectable } from '@angular/core';

@Injectable()
export class CanvasService {
  constructor() {}

  canvasSteps = [
    this.drawFrame1,
    this.drawFrame2,
    this.drawFrame3,
    this.drawFrame4,
    this.drawHead,
    this.drawBody,
    this.drawRightHand,
    this.drawLeftHand,
    this.drawRightFoot,
    this.drawLeftFoot
  ];
  clearCanvas(canvas) {
    canvas.width = canvas.width;
  }

  private drawFrame1(context) {
    context.beginPath();
    context.moveTo(350, 450);
    context.lineTo(45, 450);
    context.stroke();
  }

  private drawFrame2(context) {
    context.beginPath();
    context.moveTo(350, 450);
    context.lineTo(70, 450);
    context.lineTo(70, 10);
    context.stroke();
  }

  private drawFrame3(context) {
    context.beginPath();
    context.lineTo(65, 10);
    context.lineTo(200, 10);
    context.stroke();
  }

  private drawFrame4(context) {
    context.beginPath();
    context.lineTo(70, 10);
    context.lineTo(200, 10);
    context.lineTo(200, 50);
    context.stroke();
  }

  private drawHead(context) {
    context.beginPath();
    context.arc(200, 100, 50, 0, Math.PI * 2, true);
    context.closePath();
    context.lineWidth = 4;
    context.stroke();
  }

  private drawBody(context) {
    context.beginPath();
    context.moveTo(200, 150);
    context.lineTo(200, 300);
    context.stroke();
  }

  private drawRightHand(context) {
    context.beginPath();
    context.moveTo(200, 170);
    context.lineTo(150, 250);
    context.stroke();
  }

  private drawLeftHand(context) {
    context.beginPath();
    context.moveTo(200, 170);
    context.lineTo(250, 250);
    context.stroke();
  }

  private drawRightFoot(context) {
    context.beginPath();
    context.moveTo(200, 300);
    context.lineTo(150, 380);
    context.stroke();
  }

  private drawLeftFoot(context) {
    context.beginPath();
    context.moveTo(200, 300);
    context.lineTo(250, 380);
    context.stroke();
  }
}
