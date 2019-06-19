/**
 * Create a component with common options
 */
import install from './install'
import { mainMixin, messageMixin } from '../mixins/mixin'

export default function (sfc) {
  sfc.mixins = sfc.mixins || []
  sfc.components = sfc.components || {}
  sfc.install = sfc.install || install
  sfc.mixins.push(mainMixin, messageMixin)
  return sfc
}
