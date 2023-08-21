import { makeObservable, action } from 'mobx'
// import PubSub from 'pubsub-js'

import { PageCommon } from './PageCommon'

export class TEST extends PageCommon {
  constructor(...args: any[]) {
    super(...args)

    makeObservable(this)

    this.addEvent()
  }

  destroy() {
    this.removeEvent()
    this.reset()
  }

  addEvent = () => {}

  removeEvent = () => {}

  @action
  reset = () => {}
}
