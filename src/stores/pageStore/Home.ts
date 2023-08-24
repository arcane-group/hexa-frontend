import { makeObservable, action, observable } from 'mobx'

import { PageCommon } from './PageCommon'

export class Home extends PageCommon {
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

  @observable
  isShow = false

  @action
  setShow = (data: boolean) => {
    this.isShow = data
  }

  @action
  reset = () => {}
}
