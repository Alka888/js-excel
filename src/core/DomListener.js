import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for FomListener`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(
            `Method ${method} is not implemented in ${name} Component`
        )
      }
      // tozhe samoe chto i EventListener
      this.$root.on(listener, this[method].bind(this))
    })
  }

  removeDomListeners() {
    // realize
    this.listeners.forEach(listener => {
      // const method = getMethodName(listener)
      this.$root.off(listener)
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
