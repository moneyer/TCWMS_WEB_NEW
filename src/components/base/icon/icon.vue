<template>
  <svg
    :style="style"
    class="icon"
    aria-hidden="true"
    @click="click">
    <use :xlink:href="'#'+icon"/>
  </svg>
</template>

<script>

  export default {
    name: 'tc-icon',
    props: {
      icon: {
        type: String
      },
      size: {
        type: [String, Number],
        default: '48'
      },
      color: {
        type: String,
        default: '#999999'
      }
    },
    data() {
      return {}
    },
    computed: {
      comSize: function () {
        return this.size + 'px'
      },
      sizeIsNull: function () {
        return !this.size
      },
      style() {
        return {
          width: this.sizeIsNull ? '' : this.comSize,
          height: this.sizeIsNull ? '' : this.comSize,
          color: this.color,
          stroke: this.color,
          fill: this.color
        }
      }
    },
    watch: {},
    mounted() {
    },
    methods: {
      click: function () {
        this.$emit('click')
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "~stylus/variable.styl"
  .icon
    width 1em
    height 1em
    vertical-align -0.15em
    fill currentColor
    overflow hidden
</style>
