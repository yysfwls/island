// components/search/index.js
import { KeywordModel } from "../../models/keyword.js";
import { BookModel } from "../../models/book.js";

const keywordModel = new KeywordModel();
const bookModel = new BookModel();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type:String,
      observer:'_load_more',
      
    },
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    q: "",
  },

  attached() {
    const historyWords = keywordModel.getHistory();
    const hotWords = keywordModel.getHot();
    this.setData({
      historyWords,
    });
    keywordModel.getHot().then((res) => {
      this.setData({
        hotWords: res.hot,
      });
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _load_more(){
      console.log(111111)
    },
    onCancel(event) {
      this.triggerEvent("cancel", {}, {});
    },
    onDelete(event) {
      console.log("zz");
      this.setData({
        searching: false,
      });
    },
    onConfirm(event) {
      this.setData({
        searching: true,
      });
      const q = event.detail.text || event.detail.value;
      this.setData({ q });
      bookModel.search(0, q).then((res) => {
        this.setData({
          dataArray: res.books,
          q
        });
        keywordModel.addToHistory(q);
      });
    },
  },
});
