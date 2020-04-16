import { HTTP } from "../utils/http-p.js";

class BookModel extends HTTP {
  getHotList() {
    return this.request({
        url: "classic/hot_list",
        data:{
            name: '1',

        },
        method: 'POST'
    });
  }
}
