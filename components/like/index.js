// components/like/index.js
Component({
  properties: {
    like: {
      type: Boolean,
    },
    count: {
      type: Number,
    },
    readOnly: {
      type: Boolean,
    }
  },

  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },

  methods: {
    onLike: function(event) {
      if (this.properties.readOnly) {
        return
      }
      let like = this.properties.like;
      let count = this.properties.count;
      count = like ? count - 1 : count + 1;
      this.setData({
        count: count,
        like: !like,
      })

      let behavior = this.properties.like? 'like': 'cancel'
      this.triggerEvent('like',{
        behavior: behavior
      },{})
    }

  }
})