import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;
  private messageReceivedSubject = new BehaviorSubject<{ sender: string; receiver: string | null; message: string } | null>(null);
  messageReceived$ = this.messageReceivedSubject.asObservable();

  constructor() {
    this.startConnection();
  }

  // 🔹 Establish connection with SignalR backend
  private async startConnection() {
    if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
      console.log('🔄 SignalR already connected.');
      return;
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44352/chatHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000]) // Retry intervals: 0s, 2s, 5s, 10s
      .build();

    try {
      await this.hubConnection.start();
      console.log('✅ SignalR Connected Successfully!');
      this.listenForMessages();
    } catch (error) {
      console.error('❌ Error while connecting to SignalR:', error);
      setTimeout(() => this.startConnection(), 5000); // Retry in 5 seconds
    }
  }

  // 🔹 Listen for incoming messages
  private listenForMessages() {
    this.hubConnection.on('ReceiveMessage', (sender: string, receiver: string | null, message: string) => {
      console.log(`📩 Message received from ${sender} to ${receiver || "Group"}: ${message}`);
      this.messageReceivedSubject.next({ sender, receiver, message });
    });
  }

  // 🔹 Send a message (direct or group)
  async sendMessage(sender: string, message: string, receiver: string | null = null) {
    if (this.hubConnection.state !== signalR.HubConnectionState.Connected) {
      console.warn('⚠ SignalR Disconnected. Attempting to reconnect...');
      await this.startConnection();
    }

    try {
      await this.hubConnection.invoke('SendMessage', sender, receiver, message);
      console.log(`📤 Message sent: "${message}" to ${receiver || "Group"}`);
    } catch (error) {
      console.error('❌ Error sending message:', error);
    }
  }

  // 🔹 Join a group chat
  async joinGroup(groupName: string) {
    try {
      await this.hubConnection.invoke('JoinGroup', groupName);
      console.log(`✅ Successfully joined group: ${groupName}`);
    } catch (error) {
      console.error('❌ Error joining group:', error);
    }
  }

  // 🔹 Send message to a group
  async sendMessageToGroup(sender: string, groupName: string, message: string) {
    try {
      await this.hubConnection.invoke('SendMessageToGroup', groupName, sender, message);
      console.log(`📤 Sent to group "${groupName}": "${message}"`);
    } catch (error) {
      console.error('❌ Error sending message to group:', error);
    }
  }
}
