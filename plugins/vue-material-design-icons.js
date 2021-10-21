import Vue from 'vue'
import 'vue-material-design-icons/styles.css'
import ChevronUp from 'vue-material-design-icons/ChevronUp.vue'
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue'
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'

export default function materialIcons () {
  Vue.component('ChevronUpMdi', ChevronUp)
  Vue.component('ChevronDownMdi', ChevronDown)
  Vue.component('ChevronLeftMdi', ChevronLeft)
  Vue.component('ChevronRightMdi', ChevronRight)
}
