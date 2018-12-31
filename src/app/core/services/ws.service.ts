import { Injectable } from '@angular/core';
import { createClient } from 'websocket-connection';
import { CoreModule } from '../core.module';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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
   * @return <WSConnetion>
   */
  connect(meta = { }): WSConnection {
    if (this.connection) {
      return this.connection;
    }

    this.connection = this.client.connect(meta);
    this.isConnected$.next(true);
    // Manage connection state
    // If a CloseEvent is received emit that connection is closed
    this.connection.downstream.pipe(
      map(data => data.event),
      filter((event: Event) => (event instanceof CloseEvent)))
    .subscribe(() => this.isConnected$.next(false));

    return this.connection;
  }

  /**
   * Get current channel
   * @return <WsChannel>
   */
  getChannel(): WSChannel {
    return this.channel;
  }

  /**
   * Close connection to Websocket
   */
  close(): void {
    this.client.close();
  }

}

interface WSConnection  {
  join: (channelName: string, channelConfig: { maxSize: number }) => WSChannel;
  downstream: Observable<any>;
}

interface WSChannel {
  send: (message: any) => void;
  leave: () => void;
  downstream: Observable<any>;
}
