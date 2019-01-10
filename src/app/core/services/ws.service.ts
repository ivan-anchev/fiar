import { Injectable } from '@angular/core';
import { createClient } from 'websocket-connection';
import { CoreModule } from '../core.module';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: CoreModule
})
export class WsService {

  /**
   * Client instance for Websocket connecting
   * Used for making connections and channeling global ws messages
   */
  private client;

  /**
   * Websocket connection
   */
  private connection: WSConnection;

  /**
   * Websocket channel
   * Currently only one active channel per client is allowed
   */
  private channel: WSChannel;

  /**
   * Connection status subject
   */
  isConnected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.client = createClient('localhost', 4000);
  }

  /**
   * Connect to Websocket
   * Requires client to be instantiated
   * @param  meta={} Meta data passed to websocket on each message
   * @return <Observable<any>>
   */
  connect(meta = { }): Observable<any> {
    if (!this.connection) {
      this.connection = this.client.connect(meta);
    }

    return this.connection.downstream;
  }

  joinChannel(channelName: string) {
    const { err, canJoin } = this._canJoinChannel();

    if (err) {
      throw err;
    }

    this.channel = this.connection.join(channelName, { maxSize: 2});
    const { downstream } = this.channel;

    return {
      name: channelName,
      downstream,
      users: new Set()
    };
  }

  send(message: unknown) {
    this.channel.send(message);
  }

  createChannel(channelName: string, channelConfig = { maxSize: 2, host: '' }) {
    const { err } = this._canJoinChannel();
    const { host } = channelConfig;

    if (err) {
      throw err;
    }

    this.channel = this.connection.join(channelName, channelConfig);

    const { downstream } = this.channel;

    return {
      downstream,
      host,
      name: channelName,
      users: new Set()
    };
  }

  private _canJoinChannel() {
    let err = null;
    let canJoin = false;

    if (!this.connection) {
      err = new Error('Client must be connected to Websocket in order to join a channel');
    }

    if (this.channel) {
      err = new Error('Client has already joined a channel');
    }

    canJoin = true;

    return { err, canJoin };
  }

  /**
   * Get current channel
   * @return<WsChannel>
   */
  getChannel(): WSChannel {
    return this.channel;
  }

  /**
   * Close connection to Websocket
   */
  close(): void {
    this.client.close();
    this.connection = null;
  }

}

export interface WSConnection  {
  join: (channelName: string, channelConfig: { maxSize: number }) => WSChannel;
  downstream: Observable<any>;
}

export interface WSChannel {
  send: (message: any) => void;
  leave: () => void;
  downstream: Observable<any>;
}
