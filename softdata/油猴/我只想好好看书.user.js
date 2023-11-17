// ==UserScript==
// @name        我只想好好看书
// @namespace   liuser.betterworld.love
// @match       https://book.douban.com/subject*
// @grant       GM_xmlhttpRequest
// @grant       GM_download
// @grant       unsafeWindow
// @connect     *
// @run-at      document-end
// @version     0.0.8
// @author      liuser
// @description 实现书籍的自由阅读
// @license MIT
// ==/UserScript==

(function () {

    //api列表, 暂时还用不上
    var searchList = [
        { "name": "Ylibrary", "url": "https://api.ylibrary.org/api/search/", "type": "full", "sensitive": true, "detail": true },
        { "name": "zhelperV5", "url": "https://api.v5.zhelper.net/api/search/", "type": "full", "sensitive": true, "detail": true },
        { "name": "Mibooks(V4)", "url": "https://api.mibooks.tk", "type": "full", "sensitive": true, "detail": false },
    ]
    var BookSearcherList =[
      "https://zlib.pseudoyu.com/search",
      "http://zlirary.qnpan.com/search",
      "http://175.178.12.198:7070/search",
      "https://book.latewind.cn/search",
      "http://47.115.223.7:7070/search",
      "https://zlib.mervynlam.cn/",

    ]

    // 支持的文件类型
    var extensions = ["pdf", "azw3", "mobi", "epub"]

    //自动log
        let log_machine = (function (mode) {
            if (mode == "debug") {
                return function (log) {
                    console.log(log)
                }
            } else {
                return function (log) {

                }
            }
        })("pro")




    class Book {
        constructor() {
            this.bookName = document.title.slice(0, -5)
            let isbn = document.head.querySelector("meta[property='book:isbn']").content
            let author = document.head.querySelector("meta[property='book:isbn']").content
            let keywords = document.head.querySelector("meta[name='keywords']").content
            this.isbn = isbn?isbn:"noIsbn"
            this.author = author?author:"noAuthor"
            this.keywords = keywords?keywords:"nokeywords"
            this.downloads = [ //下载链接
                //{ extension: "pdf", downloadLink: "" }
            ]
        }
    }

    class Mounter {
        //将css挂载到网页
        static mountCss(css) {
            let styleSheet = document.createElement("style")
            styleSheet.innerText = css
            document.head.appendChild(styleSheet)
        }

        //挂载脚本
        //xy-ui https://unpkg.com/xy-ui
        static mountScript(src) {
            let script = document.createElement('script');
            script.type = 'module';
            script.src = src;

            document.head.appendChild(script);
        }

        //html转为element
        static htmlToElement(html) {
            var template = document.createElement('template');
            html = html.trim(); // Never return a text node of whitespace as the result
            template.innerHTML = html;
            return template.content.firstChild;
        }

        //insert before some Node
        static insertBefore(newNode,existingNode) {
            existingNode.parentElement.insertBefore(newNode,existingNode)
        }

        static appendChild(node,existingNode){
          existingNode.appendChild(node)
        }



    }


    class ButtonsDiv {
        constructor() {
            this.create()
        }
        create() {
            this.node = Mounter.htmlToElement(
                `<div style="display:flex;width:300px;height:2rem;margin-bottom:5px;">
                </div>`
            )
        }
        appendButtons(downloads) {
            for (let download of downloads) {
                let button = Mounter.htmlToElement(
                    `<xy-button style="margin-right:0.5rem;cursor:pointer;">
                        ${download.extension}
                    </xy-button>`
                )
                log_machine(button)
                button.onclick = () => {
                    window.open(download.downloadLink)
                }
                this.node.appendChild(button)
            }
        }

        noResource() {
            this.node.innerText = "没有找到此书..."
        }
        mount() {
            let h1 = document.querySelector("h1")
            //Mounter.insertBefore(this.node,h1)
            Mounter.appendChild(this.node,h1)
        }

        //清除, 暂时用不到
        clean() {
            this.node.remove()
        }

    }



    //Ylib类相关api
    class Ylib {
        //取到相同的isbn
        static filterISBN(data, isbn) {
            return data.filter(book => {
                return book.isbn == isbn
            })
        }
        //取到同样的extension
        static filterExtension(data) {
            let books = {}

            for (let ext of extensions) {

                let list = data.filter(
                  book => {
                    return book.extension == ext
                })

                if (list.length != 0) {
                    books[ext] = {
                        id: list[0].id,
                        source: list[0].source
                    }
                }
            }
            return books
        }

        //取到最小的文件
        static filterSize(data) {
            return data.sort((a, b) => a.filesize - b.filesize)
        }
        //提取detail中的下载链接
        static filterDetail(detail) {
            return {
                extension: detail.extension,
                downloadLink: `https://cloudflare-ipfs.com/ipfs/${detail.ipfs_cid}?filename=${detail.title}.${detail.extension}`
            }
        }

        //获得结果
        static async search(bookname) {
            let res = await Quest.post("https://superlib.ylibrary.org/api/search/", {
                "keyword": bookname,
                "page": 1,
                "sensitive": "false",
            })
            if (res != 0) {
                return JSON.parse(res.response).data
            } else {
                unsafeWindow.XyMessage.info("网络请求错误")
                return []
            }
        }

        static async detail_api(json) {
            let res = await Quest.post("https://superlib.ylibrary.org/api/detail/", json)
            if (res != 0) {
                return JSON.parse(res.response)
            } else {
                unsafeWindow.XyMessage.info("网络请求错误")
                return {}
            }
        }

    }

    class BookSearcher{
        //取到相同的isbn
        static filterISBN(data, isbn) {
            return data.filter(book => {
                return book.isbn.indexOf(isbn)!=-1
            })
        }
        //取相同的作者
        static filterAuthor(data,author){
          return data.filter(book=>{
              return author.indexOf(book.author)!=-1
          })
        }


        static filterKeywords(data,keywords,items){
          let out = []
          for(let item of items){
            let res = data.filter(d=>{
              //log_machine(keywords.indexOf(d[item]))
              return keywords.indexOf(d[item])!=-1
            })
            out = out.concat(res)
          }
          return out
        }
        //取到同样的extension中大小最小的那个
        static filterExtension(data) {
            let books = {}

            for (let ext of extensions) {

                let list = data.filter(
                  book => {
                    return book.extension == ext
                })

                if (list.length != 0) {
                    // list.sort((a,b)=>a.filesize-b.filesize)
                    books[ext] = {
                        title:list[0].title,
                        id: list[0].id,
                        ipfs_cid: list[0].ipfs_cid
                    }
                }
            }
            return books
        }



        //搜索isbn
        static async search(isbn) {
          let res ={}
            for(let url of BookSearcherList){
              res = await Quest.get(`${url}?limit=100&query=isbn:"${isbn}"`)
              try {
                    if(res.ok==true){
                      return JSON.parse(res.r.response).books
                    }
              }catch(e){
                    continue
              }

            }
              unsafeWindow.XyMessage.info("网络请求错误,请检查网络")
              return []

        }
      //搜索title
        static async search_titile(bookname) {
          let res ={}
            for(let url of BookSearcherList){
              res = await Quest.get(`${url}?limit=100&query=title:"${bookname}"`)
              try {
                    if(res.ok==true){
                      return JSON.parse(res.r.response).books
                    }
              }catch(e){
                    continue
              }
            }
              unsafeWindow.XyMessage.info("网络请求错误,请检查网络")
              return []

        }
    }

    class Quest{
        static get(url) {
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: encodeURI(url),
                    //url: encodeURI(`${url}?limit=100&query=isbn:"${isbn}"`),
                    timeout: 5000,
                    onload: function (r) {
                        log_machine(r)
                        resolve({ok:true,r:r})
                    },
                    onerror: function (error) {
                        resolve({ok:false})
                    },
                    ontimeout: function (out) {
                        resolve({ok:false})
                    }
                });
            });
        }

        static post(url, json) {
          let jsonText = JSON.stringify(json)
          //log_machine(jsonText)
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: "POST",
                    url: url,
                    timeout: 5000,
                    data:jsonText,
                    headers: {
                      "Content-Type": "application/json",
                      "accept":"application/json, text/plain, */*",
                      "accept-encoding":"gzip, deflate, br"
                    },
                    onload: function (r) {
                      log_machine(r)
                      if(r.response==""){
                        resolve(0)
                      }
                        resolve(r)
                    },
                    onerror: function (e) {
                      log_machine(e)
                        resolve(0)
                    },
                    ontimeout: function (out) {
                      log_machine(out)
                        resolve(0)
                    }
                });
            });
        }
    }

    async function main() {
        Mounter.mountScript("https://unpkg.com/xy-ui")

        //获取图书基本信息
        let book = new Book()

        //搜索图书
        let data = await BookSearcher.search(book.isbn)
        let data_title = await BookSearcher.search_titile(book.bookName)
        data = data.concat(data_title)
        if (data.length == 0) {
            let buttonsDiv = new ButtonsDiv()
            buttonsDiv.noResource()
            buttonsDiv.mount()
            return
        }
        log_machine(data)
        log_machine(data_title)
        log_machine(book.isbn)

        //过滤isbn
        let data_isbn = BookSearcher.filterISBN(data, book.isbn)
        let books = {}
        if(data_isbn.length!=0){
          books = BookSearcher.filterExtension(data_isbn)
        }else{
          log_machine(book.keywords)
          let data_keywords = BookSearcher.filterKeywords(data,book.keywords,["year","title","author","publisher"])
          log_machine(data_keywords)
          if(data_keywords.length==0){
            let buttonsDiv = new ButtonsDiv()
            buttonsDiv.noResource()
            buttonsDiv.mount()
            return
          }
          books = BookSearcher.filterExtension(data_keywords)
        }



        log_machine(books)
        //将它们最后做成渲染需要的数据
        for (let extension of extensions) {
            if (books[extension] != undefined) {
                let detail = books[extension]
                let item= {
                    extension: extension,
                    downloadLink:`https://dweb.link/ipfs/${detail.ipfs_cid}?filename=${book.bookName}.${extension}`
                }
                book.downloads.push(item)
            }
        }
        book.downloads.push({extension:"捐赠",downloadLink:"http://babelgo.cn:5230/m/1"})
        setTimeout(()=>{
          unsafeWindow.XyMessage.info("你可能要多次刷新跳转到的网页，因为下载链接是ipfs节点")
        },1000)
        let buttonsDiv = new ButtonsDiv()
        buttonsDiv.appendButtons(book.downloads)
        buttonsDiv.mount()

    }

    main()

    })()
