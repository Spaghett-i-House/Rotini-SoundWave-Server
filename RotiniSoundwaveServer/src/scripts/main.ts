declare var Vue: any

type Binding = {
  modifiers : object
}

// Fader adds a specific class after the specified delay
Vue.directive('fader', {
  bind: (el : any, { modifiers } : Binding ) => {
    const classesToAdd = Object.keys(modifiers)

    setTimeout(() => {
      classesToAdd.forEach((className) => el.classList.add(className))
    }, 500)
  }
})

var vm = new Vue({
  el: '#app',
  data: {
    message: undefined
  },
  methods: {
    heroButtonClicked () {
      const self : any = this
      self.message = 'No.'
    },
    subtitle (defaultMessage : string) : string {
      const self : any = this
      return self.message ? self.message : defaultMessage
    }
  }
})
