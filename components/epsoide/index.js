// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: 0,
    month: '   ',
  },
  attached: function() {
    console.log(this.data)

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
