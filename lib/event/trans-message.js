import Event from './event';

export class TransportMessageEvent extends Event {
  constructor(data) {
    super(data);
    this.initEvent('message', false, false);
    this.data = data;
  }
}

export default TransportMessageEvent
