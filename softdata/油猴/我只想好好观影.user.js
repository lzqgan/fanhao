// ==UserScript==
// @name        我只想好好观影
// @namespace   liuser.betterworld.love
// @match       https://movie.douban.com/subject/*
// @match       https://m.douban.com/movie/*
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_getValue
// @connect     *
// @run-at      document-end
// @require     https://unpkg.com/artplayer@5.0.9/dist/artplayer.js
// @require     https://unpkg.com/artplayer-plugin-control@2.0.0/dist/artplayer-plugin-control.js
// @require     https://unpkg.com/hls.js@1.4.11/dist/hls.min.js
// @require     https://unpkg.com/vue@2.7.14/dist/vue.js
// @version     3.9.2
// @author      liuser, collaborated with ray
// @description 为了想看就看
// @license MIT
// ==/UserScript==
//vue production https://cdn.jsdelivr.net/npm/vue@2.7.14
//vue dev https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js
//按钮样式


// @note 按钮样式
GM_addStyle(
  `
    .liu-btn{
      cursor:pointer;
      font-size:1rem;
      padding: 0.6rem 1.2rem;
      border: 1px solid transparent;
      border-radius: 3px;
      max-height:50px;
    }

    .play-btn {
      border-radius: 8px;
      cursor: pointer;
      font-weight: bolder;
      background-color:#e8f5e9;
    }
    .play-btn:hover {
      background-color:#c8e6c9;
    }
    .play-btn:active{
      background-color: #81c784;
    }

    .source-selector{
      background-color: #141414;
      color: #99a2aa;
      padding:0.6rem 0.8rem;
      margin:0.5rem 0.875rem;
      border-radius:4px;
    }
    .source-selector:hover{
      background-color: #1f1f1f;
    }

    .series-selector{
      background-color: #141414;
      border-radius:3px;
      color: #99a2aa;
      font-size:16px;
      padding: 12px 16px;

    }
    .series-selector:hover{
      background-color: #153a1d;
    }

    .playing{
      border:2px solid #007011;
    }

    .selected{
      border:2px solid #007011;
    }


    .liu-closePlayer{
      border-radius:3px;
      background-color: #141414;
        float:right;
      color: #99a2aa;
      width:2rem;
      height:2rem;
      line-height:2rem;
      padding:0;
      margin:0.5rem 1rem;
    }
    .liu-closePlayer:hover{
      background-color:#1f1f1f;
      color:white;
    }

    .love-support{
      color:#99a2aa;
      background-color:tranparent;
      margin-right:32px;
    }


    a:visited{
      color:#99a2aa;
    }
    a:hover{
      font-weight:bold;
      color:#A8DB39;
      background:none;
    }


    `
);

//@note 剧集选择器布局
GM_addStyle(
  `
    .series-contianer{
      display:grid;
      grid-template-columns: repeat(4,1fr);
      grid-auto-rows:50px;
      grid-column-gap:16px;
      grid-row-gap:16px;
      margin-top:16px;
      height:524px;
      overflow-y:scroll;
    }
    .series-contianer::-webkit-scrollbar {
      display: none;
      }
    @media screen and (max-width: 1025px) {
      .series-contianer{
        display:grid;
        grid-template-columns: repeat(6,1fr);
      }

    }


    `
);

//布局
GM_addStyle(
  `

    :root{
      font-size:16px;
      font-family: BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif !important;
    }
    :root::-webkit-scrollbar {
      display: none;
    }

    .TalionNav{
        z-index:10;
    }
    .speed-slow{
        color:#9e9e9e;
    }
    .speed-fast{
        color:#4aa150;
    }



    .mannul{
      margin:16px 0px 64px 14px;
      font-size:16px;
      display:flex;
      flex-wrap:wrap;
    }
    .authoralert{
      font-size:16px;
      margin-left:14px;
      color:#F76965;
    }



    .liu-playContainer{
        width:100%;
        height:100%;
        background-color:#1c2022;
        position:fixed;
        top:0;
        z-index:11;
        overflow:auto;
    }
    .liu-playContainer::-webkit-scrollbar {
      display: none;
    }



    .video-selector{
        display:flex;
        flex-wrap:wrap;
        margin-top:1rem;
    }

    .liu-selector:hover{
        color:#aed0ee;
        background-color:none;
    }

    .liu-selector{
        color:black;
        cursor:pointer;
        padding:3px;
        margin:5px;
        border-radius:2px;
    }

    .liu-rapidPlay{
        color: #007722;
    }

    .liu-light{
        background-color:#7bed9f;
    }

    .artplayer-app{
      height:600px;
    }


    .playSpace{
        display: grid;
    /* 	height:400px; */
      margin:1rem;
        grid-template-columns: 2fr 1fr;
        grid-row-gap:0px;
        grid-column-gap:1rem;
      margin-top:2rem;
      clear: both;
    }



    @media screen and (max-width: 1025px) {
        .playSpace{
            display: grid;
    /* 		height:600px; */
            grid-template-rows: 1fr 0.5fr;
            grid-template-columns:1fr;
            grid-row-gap:10px;
            grid-column-gap:0px;
        }
    }


    .seletor-title{
      height:60px;
      line-height:3rem;
      background-color: #141414;
      color:#fafafa;
      font-size:1.25rem;
      padding: 0 1rem;
    }
    `
);

// 上传额外源的信息
const sourceupload = () => {
  let sourceAdded = prompt(
    "请输入自定义源，名称与链接用|隔开，每一项用英文逗号隔开"
  );
  GM_setValue("sourceAdded", sourceAdded);
};
// 注册菜单按钮
GM_registerMenuCommand("自定义源", sourceupload);

(function () {
  const _debug = 0;//@note debug
  const searchSource = [//@note 内置搜索源
    {
      name: "红牛资源",
      searchUrl: "https://www.hongniuzy2.com/api.php/provide/vod/from/hnm3u8/",
    },
    {
      name: "非凡资源",
      searchUrl: "http://cj.ffzyapi.com/api.php/provide/vod/",
    },
    {
      name: "量子资源",
      searchUrl: "https://cj.lziapi.com/api.php/provide/vod/",
    },
    {
      name: "ikun资源",
      searchUrl:
        "https://ikunzyapi.com/api.php/provide/vod/from/ikm3u8/at/json/",
    },
    {
      name: "光速资源",
      searchUrl: "https://api.guangsuapi.com/api.php/provide/vod/from/gsm3u8/",
    },
    {
      name: "高清资源",
      searchUrl: "https://api.1080zyku.com/inc/apijson.php/",
    },
    {
      name: "天空资源",
      searchUrl:
        "https://m3u8.tiankongapi.com/api.php/provide/vod/from/tkm3u8/",
    }, //有防火墙，垃圾
    {
      name: "闪电资源",
      searchUrl: "https://sdzyapi.com/api.php/provide/vod/",
    }, //不太好，格式经常有错
    // { "name": "飞速资源", "searchUrl": "https://www.feisuzyapi.com/api.php/provide/vod/" },//经常作妖或者没有资源
    // { "name": "卧龙资源", "searchUrl": "https://collect.wolongzyw.com/api.php/provide/vod/" }, 非常恶心的广告
    // { "name": "8090资源", "searchUrl": "https://api.yparse.com/api/json/m3u8/" },垃圾 可能有墙
    // { "name": "百度云资源", "searchUrl": "https://api.apibdzy.com/api.php/provide/vod/" },
    // { "name": "酷点资源", "searchUrl": "https://kudian10.com/api.php/provide/vod/" },
    // { "name": "淘片资源", "searchUrl": "https://taopianapi.com/home/cjapi/as/mc10/vod/json/" },
    // { "name": "ck资源", "searchUrl": "https://ckzy.me/api.php/provide/vod/" },
    // { "name": "快播资源", "searchUrl": "https://caiji.kczyapi.com/api.php/provide/vod/" },
    // { "name": "海外看资源", "searchUrl": "http://api.haiwaikan.com/v1/vod/" }, // 说是屏蔽了所有中国的IP，所以如果你有外国的ip可能比较好
    // { "name": "68资源", "searchUrl": "https://caiji.68zyapi.com/api.php/provide/vod/" },
    // {"name":"鱼乐资源","searchUrl":"https://api.yulecj.com/api.php/provide/vod/"},//速度太慢
    // {"name":"无尽资源","searchUrl":"https://api.wujinapi.me/api.php/provide/vod/"},//资源少
  ];
  const { query: $, queryAll: $$, isMobile } = Artplayer.utils;
  const tip = (message) => alert(message);
  // 判断是否为 Edge 浏览器
  const isEdge = /Edge\/\d+/.test(navigator.userAgent);

  // 判断是否为 Chrome 浏览器
  const isChrome = /Chrome\/\d+/.test(navigator.userAgent) && !isEdge;

  // 判断是否为 Safari 浏览器
  const isSafari = /Safari\/\d+/.test(navigator.userAgent) && !isChrome;


  //--------------------------全局方法
  //获取豆瓣影片名称
  const videoName = isMobile
    ? $(".sub-title").innerText
    : document.title.slice(0, -5).replace(" ", "");

  // debug方法
  const log = (function () {
    if (_debug) return console.log.bind(console);
    return function () { };
  })();

  const htmlToElement = function(html) {
    //将html转为element
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstChild;
  }

  //速度为0不一定是无法播放，可能是源的防火墙阻止了测速，也可以试试。
  const handleResponse = function(r) {
    log("handleResponse:");
    log("正在处理搜索的结果");
    if (!r || r.list.length == 0) {
      log("搜索结果list长度为0");
      return 0;
    }
    let video,
      found = false;
    for (let item of r.list) {
      // 对比名称、发行年、演员，只要有一个一样就算成功
      let nameEqual = item.vod_name == videoName;
      let yearEqual = getVideoYear(item.vod_year);
      let actorContain = videoActor(item.vod_actor.split(",")[0]);

      if (yearEqual === true || actorContain === true || nameEqual === true) {
        video = item;
        found = true;
        log(`资源匹配成功`);
        break;
      }
    }
    if (found == false) {
      return 0;
    }

    let playList = video.vod_play_url
      .split("$$$")
      .filter((str) => str.includes("m3u8"));
    if (playList.length == 0) {
      log("没有m3u8资源, 无法测速, 无法播放");
      return 0;
    }
    playList = playList[0].split("#");
    playList = playList.map((str) => {
      let index = str.indexOf("$");
      return {
        name: str.slice(0, index),
        url: str.slice(index + 1),
        speed: -1,
      };
    });
    return playList;
  }

  //播放按钮
  class PlayBtn {
    constructor() {
      const e = htmlToElement(
        `<button class="liu-btn play-btn">一键播放</button>`
      );
      $(isMobile ? ".sub-original-title" : "h1").appendChild(e);

      e.onclick = function () {
        initVue();
      };
    }
  }

  const playM3u8 = function(video, url, art) {
    if (Hls.isSupported()) {
      if (art.hls) art.hls.destroy();
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      art.hls = hls;
      art.on('destroy', () => hls.destroy());
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
    } else {
      art.notice.show = 'Unsupported playback format: m3u8';
    }
  }
  //获取电影的年份
  const getVideoYear = function (outYear) {
    const e = $(isMobile ? ".sub-original-title" : ".year");
    if (!e) {
      log("获取年份失败，请检查！");
      return 0;
    }
    return e.innerText.includes(outYear);
  }

  //对比电影演员
  const videoActor =function(outActor) {
    const e = $(isMobile ? ".bd" : ".actor");
    if (!e) {
      log("获取演员失败，请检查！");
      return 0;
    }
    //log(`${outActor}：匹配结果${e.innerText.includes(outActor)}`)
    return e.innerText.includes(outActor);
  }

  //下载
  const get = function(detail) { //@note get
    log("get");
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error("Get timed out"));
      }, 3000);

      let defaultConfig = {
        method: "GET",
        timeout: 3000,
        onload: (r) => {
          clearTimeout(timer);
          resolve(r.response);
        },
        onerror: reject,
        onabort: reject,
        ontimeout: reject,
      };
      let config = Object.assign(defaultConfig, detail);
      GM_xmlhttpRequest(config);
    });
  }

  //下载m3u8的内容，返回片段列表
  const downloadtsList = async function(url) {
    let domain = url.split("/")[0];
    let baseUrl = url.split("/")[2];
    let downLoadList = [];
    log(`正在获取index.m3u8 ${url}`);

    let downloadContent = await get({
      url: encodeURI(url),
    });

    if (downloadContent.includes("index.m3u8")) {
      //如果是m3u8地址
      let lines = downloadContent.split("\n");
      for (let item of lines) {
        if (/^[#\s]/.test(item)) continue; //跳过注释和空白行
        if (/^\//.test(item)) {
          //如果是相对链接的话
          log("相对链接");
          log(item);
          downLoadList = await downloadtsList(domain + "//" + baseUrl + item);
        } else if (/^(http)/.test(item)) {
          //如果是绝对链接的话
          log("绝对链接");
          log(item);
          downLoadList = await downloadtsList(item);
        } else {
          //如果是替代链接的话
          log("替代链接链接");
          log(item);
          downLoadList = await downloadtsList(url.replace("index.m3u8", item));
        }
      }
    } else {
      //如果是ts地址
      let lines = downloadContent.split("\n");
      for (let item of lines) {
        if (/^[#\s]/.test(item)) continue; //跳过注释和空白行
        if (/^(http)/.test(item)) {
          //如果是http直链
          downLoadList.push(item);
        } else if (/^\//.test(item)) {
          //如果是相对链接
          downLoadList.push(domain + "//" + baseUrl + item);
        } else {
          //如果不是相对链接就把index.m3u8替换掉就行
          downLoadList.push(url.replace("index.m3u8", item));
        }
      }
    }
    // log(`测试列表为${downLoadList}`)
    return downLoadList;
  }

  //app的整体结构，作为vue的渲染模板
  //@note vueAppTemplate
  const vueAppTemplate = `
    <div  id="app">
      <div class="liu-playContainer" v-show="ok">
        <button class="liu-closePlayer liu-btn" @click="closePlayer">
          <svg class="icon" width="50%" height="50%" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4012"><path d="M587.19 506.246l397.116-397.263a52.029 52.029 0 0 0 0-73.143l-2.194-2.194a51.98 51.98 0 0 0-73.143 0l-397.068 397.8-397.068-397.8a51.98 51.98 0 0 0-73.143 0l-2.146 2.194a51.054 51.054 0 0 0 0 73.143l397.069 397.263L39.544 903.461a52.029 52.029 0 0 0 0 73.142l2.146 2.195a51.98 51.98 0 0 0 73.143 0L511.9 581.583l397.068 397.215a51.98 51.98 0 0 0 73.143 0l2.194-2.146a52.029 52.029 0 0 0 0-73.143L587.19 506.246z" p-id="4013" data-spm-anchor-id="a313x.search_index.0.i1.10e63a81F8aVUU" class="selected" fill="#ffffff"></path></svg>
        </button>

        <!-- 播放模块 -->
        <div class="playSpace">
          <!-- 视频容器 -->
          <div class="artplayer-app"></div>
          <!-- 选集模块 -->
          <div class="series">
            <div class="seletor-title">选集</div>
            <div class="series-contianer">
              <button
                class="series-selector liu-btn"
                :class="{'playing':index==playingIndex}"
                style="color: #a3a3a3"
                v-for="(item,index) in playingList"
                :key="index"
                @click="playListSelect(index)"
              >
                {{item.name.slice(0,4)}}
                <!-- 固定宽度不够长 -->
              </button>
            </div>
          </div>
        </div>

        <!-- 源选择模块 -->
        <div class="sourceButtonList">
          <button
            class="source-selector liu-btn"
            v-for="(item,index) in sources"
            :key="index"
            :class="{'selected':index==selectedSource,'speed-fast':item.speed>1}"
            @click="sourceSelect(index)"
          >
            {{item.name}} {{item.speed}} m/s
          </button>
        </div>
        <!-- 一些说明 -->
        <p class="authoralert">请不要相信视频中的广告！</p>
        <div class="mannul">

          <a
            class="love-support"
            style="text-decoration: #447006 wavy underline;"
            href="https://memos.babelgo.cn/m/1"
            target="_blank"
            >☕赏作者喝一杯咖啡？
            </a>
          <a
            class="love-support"
            href="https://t.me/wzxhhgy"
            target="_blank"
            >电报群</a
          >
          <a
            class="love-support"
            href="https://greasyfork.org/zh-CN/scripts/459540-%E6%88%91%E5%8F%AA%E6%83%B3%E5%A5%BD%E5%A5%BD%E8%A7%82%E5%BD%B1/feedback"
            target="_blank"
            >👉反馈</a
          >
        </div>
      </div>
    </div>

      `;
  //构建vue的实例
  function initVue() {//@note initVue
    const e = htmlToElement(vueAppTemplate);
    document.body.appendChild(e);
    vueInstance = new Vue({
      el: "#app",
      data: {
        //artplayer实例
        art: {},
        //标明是否搜到影片
        ok: false,
        //搜索源
        searchSource: searchSource,
        //标记正在下载的资源，好debug
        sourceTesting: "",

        //所有搜索到的资源 [{name:"..资源",playList:[{name:"第一集",url:""}]}]
        sources: [],
        //标记选择的源
        selectedSource: 0,
        //正在播放的选集总表
        playingList: [],
        //正在播放哪一集
        playingIndex: 0,
        //咖啡地址
        coffeeUrl: "https://memos.babelgo.cn/m/1",
        //telegram地址
        telegramUrl: "https://t.me/wzxhhgy",
        //greasyfork反馈地址
        feedbackUrl:
          "https://greasyfork.org/zh-CN/scripts/459540-%E6%88%91%E5%8F%AA%E6%83%B3%E5%A5%BD%E5%A5%BD%E8%A7%82%E5%BD%B1/feedback",
      },
      methods: {
        //@note merge自定义源
        mergeSource() {
          let sourceAdded = GM_getValue("sourceAdded", ""); //获取用户添加的额外搜索源
          log(sourceAdded)
          //@ 兼容sourceAdded为null的情况
          if(!sourceAdded) return;
          sourceAdded.split(",").forEach((item) => {
            if (item === "") return;
            name_url = item.split("|");
            this.searchSource.push({
              name: name_url[0],
              searchUrl: name_url[1],
            });
          });
        },
        //测试速度
        async testSpeed() {//@note testSpeed
          //this.sources //所有搜索到的资源 [{name:"..资源",playList:[{name:"第一集",url:""}]}]
          await Promise.all(
            this.sources.map(async (source, index) => {
              try {
                let name = source.name;
                let url = source.playList[this.playingIndex].url;
                let tsList = await downloadtsList(url);
                let downLoadList = [];
                //随机选择8个切片下载
                for (let i = 0; i < 8; i++) {
                  downLoadList.push(
                    tsList[Math.floor(Math.random() * tsList.length)]
                  );
                }
                let downloadSize = 0;
                let startTime = Date.now();

                for (item of downLoadList) {
                  log("正在下载" + item);
                  let r = await get({
                    url: encodeURI(item),
                    responseType: "arraybuffer",
                  });
                  downloadSize += r.byteLength ? r.byteLength / 1024 / 1024 : 0;
                }
                let endTime = Date.now();
                let duration = (endTime - startTime) / 1000;
                let speed =
                  downloadSize / duration ? downloadSize / duration : 0;
                this.sources[index].speed = Number(speed.toFixed(2));
                // 因为index会冲突所以暂时不用
                // this.sources.sort((a, b) => {
                //   return b.speed - a.speed;
                // });
                this.$forceUpdate();
                // log(this.sources[index]);
                log(`${name}的速度为${speed}mb/s`);
              } catch (e) {
                log(e);
                this.sources[index].speed = 0;
                this.$forceUpdate();
              }
            })
          );
        },
        //选择源的按钮行为
        sourceSelect(index) {
          let ct = this.art.currentTime;
          this.selectedSource = index;
          this.playingList = this.sources[index].playList;
          this.switchUrl(this.playingList[this.playingIndex].url);
          this.art.once("video:canplay", () => {
            this.art.seek = ct;
          });
          this.testSpeed().then(() => {
            log("测速完成！");
          });
        },
        //选择剧集的按钮行为
        playListSelect(index) {
          this.playingIndex = index;
          //打印playlist
          log(this.playingList);
          this.switchUrl(this.playingList[this.playingIndex].url);
        },
        // 初始化Art播放器
        initArt(url) {//@note initArt
          this.art = new Artplayer({
            container: ".artplayer-app",
            url: url,
            pip: true,
            fullscreen: true,
            fullscreenWeb: true,
            autoMini: true,
            screenshot: true,
            hotkey: true,
            airplay: true,
            playbackRate: true,
            setting: true,
            miniProgressBar: true,
            theme: "#00981a",
            moreVideoAttr: {
              crossOrigin: "anonymous",
            },
            controls: [
              {
                name: "resolution",
                html: "分辨率",
                position: "right",
              },
            ],
            type: "m3u8",
            customType: {
              m3u8: playM3u8
            },
            //   plugins: [artplayerPluginControl()],
          });
          this.art.on("video:loadedmetadata", () => {
            this.art.controls.resolution.innerText =
              this.art.video.videoHeight + "P";
          });
          log("初始化art实例完成，art:");
          log(this.art);
        },
        //切换播放器的播放url
        switchUrl(url) {
          this.art.switchUrl(url);
          //兼容safari
          if (this.art.video.src != url) {
            this.art.video.src = url;
          }
        },
        //关闭页面
        closePlayer() {
          $("#app").remove();
        },

        async search(url) {
          log("search:开始啦");
          let splitVideoName = "";
          if (videoName.length >= 3) {
            splitVideoName = videoName.slice(0, 3);
          } else {
            splitVideoName = videoName;
          }
          let response = await get({
            url: encodeURI(`${url}?ac=detail&wd=${splitVideoName}`),
            responseType: "json",
            overrideMimeType: "application/json",
          });
          return response;
        },
        //处理搜索到的结果:从返回结果中找到对应片子
      },
      async created() {//@note created
        //初始化时开始搜索所有资源, 初始化sources 数组
        //merge 用户添加的地址
        this.mergeSource();
        // this.searchSource.forEach();
        await Promise.all(
          this.searchSource.map(async (item) => {
            try {
              //标记当前正在处理的资源
              this.sourceTesting = item.name;
              // search里自带解析函数，所以只要通过就说明搜索到了
              let playList = 0;
              let response = await this.search(item.searchUrl);
              playList = handleResponse(response);
              if (playList != 0) {
                log(`${item.name} 搜到了`);
                this.sources.push({ name: item.name, playList });
                if (this.ok == false) {
                  this.ok = true;
                  this.$forceUpdate();
                  this.playingList = playList;
                  this.initArt(this.playingList[0].url);
                }
              }
            } catch (e) {
              log(e);
              log("虽然出现错误，但是不能停下");
            }
          })
        );

        log("搜索完成");
        // 此时还不能检测是否已经搜索完毕，因为前面发的是async
        // 因为Safari的xmlhttp方法在失败时不会返回reject导致Promise一直等待，
        // 导致后面的代码无法执行,所以需要手动实现timeout机制
        // 结束以后ok还为false说明没搜索
        if (this.ok == true) {
          //开始测速
          if (isSafari) {
            tip("很可惜，Safari浏览器存在严重Bug，所以测速功能工作不正常。")
          }
          await this.testSpeed();
        } else {
          tip(
            "未搜索到资源，可能是豆瓣的电影名称和资源站的名称不一致，请反馈电影名称。"
          );
          window.open(
            "https://greasyfork.org/zh-CN/scripts/459540-%E6%88%91%E5%8F%AA%E6%83%B3%E5%A5%BD%E5%A5%BD%E8%A7%82%E5%BD%B1/feedback"
          );
        }
      },
    });
  }


  new PlayBtn();
})();
