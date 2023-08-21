import { makeObservable } from 'mobx'

export class PageCommon {
  constructor(...args: any[]) {
    makeObservable(this)

    this.key = args[0]
  }

  key = ''
}
