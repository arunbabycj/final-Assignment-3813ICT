import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
    private url = "http://localhost:3000";
    private socket;
    private socket1;
    private socket2;
    private socket3;
    constructor() { }



    sendMessages(message){
        this.socket.emit('add-message', message);
    }

    getMessages(){
        let obmessages = new Observable(
      //'observer' is a javascript object that defines the handlers for the
      //notifications that we will receive
        observer => {
            this.socket = io();
            //this.socket.connect('http://localhost:3000');
            //listen for 'new-message'event from the Server
            this.socket.on('message',(data)=> {observer.next(data);});

            //when the observer ends (unsubscribe) then disconnet the Socket
            return ()=>{this.socket.disconnect();}
      })
            return obmessages;
    }

    joinRoom(data){
        //this.socket.emit('join',data);
        this.socket.emit('join',data);
    }

    newUserJoined(){
        let observable = new Observable<{user:String, message:String}>(
          observer=>{
            this.socket1 = io();
            this.socket.on('new user joined', (data)=>{observer.next(data);});
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    leaveRoom(data){
        this.socket.emit('leave',data);
    }

    userLeftRoom(){
        let observable = new Observable<{user:String, message:String}>(
          observer=>{
            this.socket2 = io();
            this.socket.on('left room', (data)=>{observer.next(data);});
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    sendMessage(data){
        this.socket.emit('message',data);
    }

    newMessageReceived(){
        let observable = new Observable<{user:String, message:String}>(
          observer=>{
            this.socket3 = io();
            this.socket.on('new message', (data)=>{observer.next(data);});
            return () => {this.socket.disconnect();}
        });

        return observable;
    }
}
