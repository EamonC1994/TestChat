import { element } from 'protractor';
import { BootService } from './boot.service';
import { Component, ViewChild, ElementRef } from '@angular/core';

export interface Message {
  sender?: string;
  message: string;
  data?: Date; 

}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Test-Two';

  @ViewChild('allowScrolling') private scrollingContainer: ElementRef;

  userInput: string;
  responses: Message[]

  constructor(private chatBoot: BootService) {
    this.initBoot()
  }

  initBoot() {
    this.responses = []
    this.chatBoot.getAnswer('Answer my question')
      .subscribe((list: any) => {
        list.result.fulfillment.messages.forEach((element) => {
          this.responses.push({ sender: 'boot', message: element.speech, data: list.timestamp })
        });
      })
  }

  askQuestion() {
    this.responses.push({ sender: 'eu', message: this.userInput, data: new Date() })
    this.chatBoot.getAnswer(this.userInput)
      .subscribe((list: any) => {
        list.result.fulfillment.messages.forEach((element) => {
          this.responses.push({ sender: 'boot', message: element.speech, data: list.timestamp })
        });
      })

    this.userInput = '';
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.scrollingContainer.nativeElement.scrollTop = this.scrollingContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }




}

