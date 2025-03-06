import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: { sender: string; receiver: string | null; message: string }[] = [];
  newMessage = '';
  sender = 'User1';  // Default sender
  receiver: string | null = null; // Optional for direct messages
  groupName: string = ''; // For group messaging

  constructor(private chatService: ChatService) {
    this.chatService.messageReceived$.subscribe((data) => {
      if (data) {
        console.log(`📩 New message from ${data.sender} to ${data.receiver || "Group"}: ${data.message}`);
        this.messages.push(data);
      }
    });
  }

  async sendMessage() {
    if (this.newMessage.trim() === '') {
      console.warn('⚠ Cannot send empty message.');
      return;
    }

    await this.chatService.sendMessage(this.sender, this.newMessage, this.receiver);
    console.log(`📤 Sent: "${this.newMessage}" to ${this.receiver || "Group"}`);
    this.newMessage = ''; // ✅ Clear message input
  }

  async joinGroup() {
    if (this.groupName.trim() === '') {
      console.warn('⚠ Group name cannot be empty.');
      return;
    }

    await this.chatService.joinGroup(this.groupName);
    console.log(`✅ Joined group: ${this.groupName}`);
  }

  async sendGroupMessage() {
    if (this.newMessage.trim() === '' || this.groupName.trim() === '') {
      console.warn('⚠ Message and group name cannot be empty.');
      return;
    }

    await this.chatService.sendMessageToGroup(this.sender, this.groupName, this.newMessage);
    console.log(`📤 Sent to Group "${this.groupName}": "${this.newMessage}"`);
    this.newMessage = ''; // ✅ Clear message input
  }
}
