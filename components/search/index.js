// components/search/index.js
import { KeywordModel } from "../../models/keyword.js";
import { BookModel } from "../../models/book.js";
import { paginationBev } from "../behaviors/pagination.js";

const keywordModel = new KeywordModel();
const bookModel = new BookModel();

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],

  properties: {
    more: {
      type: String,
      observer: "_load_more",
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
    loading: false,
    loadingCenter: false,
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
    _load_more() {
      if (!this.data.q) {
        return;
      }
      if (this.isLocked()) {
        return;
      }
      if (this.hasMore()) {
        this.locked();
        bookModel.search(this.getCurrentStart(), this.data.q)
          .then((res) => {
            this.setMoreData(res.books);
            this.unLocked()
          },()=>{
            this.unLocked()
          });
          //死锁
      }
    },

    onCancel(event) {
      this.initialize()
      this.triggerEvent("cancel", {}, {});

    },
    onDelete(event) {
      this.initialize()
      this.setData({ 
        searching: false,
        q: ""
      });
    },
    // 初始化加载
    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      const q = event.detail.text || event.detail.value;
      this.setData({ q });
      bookModel.search(0, q).then((res) => {
        this.setData({
          dataArray: res.books,
          q,
        });
        keywordModel.addToHistory(q);
        this._hideLoadingCenter()
      });
    },
    _showLoadingCenter(){
      this.setData({
        loadingCenter:true
      })
    },
    _hideLoadingCenter(){
      this.setData({
        loadingCenter:false
      })
    },
    _showResult(){
      this.setData({
        searching: true
      })
    },
  },
});
