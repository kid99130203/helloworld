// pages/searchhome/searchhome.js
/****修改***/
wx.cloud.init(
  {
   
    env:'getdetail-7g7g1bwafdeeffc4',
    traceUser: true,
    
  }
)

var search_tips = [];   //存放查询提示 
var paixi =["派系",
"鸳鸯蝴蝶派",
"新月派",
"新感觉派",
"京派",
"语丝派",
"海派",
"荷花淀派",
"现代派",
"文学研究会",
"创造社",
"其他"];

var allAuthor = ["作家","鲁迅",
"郭沫若",
"沈从文",
"周作人",
"老舍",
"胡适",
"赵树理",
"艾青",
"巴金",
"郁达夫",
"曹禺",
"夏衍",
"徐志摩",
"丁玲",
"闻一多",
"朱自清",
"林语堂",
"冰心",
"冯至",
"何其芳",
"张恨水",
"卞之琳",
"萧红",
"张天翼",
"戴望舒",
"穆旦",
"孙犁",
"张爱玲",
"梁实秋",
"俞平伯",
"郑振铎",
"臧克家",
"刘半农",
"许地山",
"朱光潜",
"沈雁冰",
"钱玄同",
"汪曾祺",
"钱钟书",
"柔石",
"冯文炳",
"叶绍钧",
"丰子恺",
"林徽因",
"柳青"];

var diyu = ["地域","浙江",
"江苏",
"湖南",
"湖北",
"广东",
"安徽",
"北京",
"福建",
"山东",
"四川",
"山西",
"辽宁",
"吉林",
"黑龙江",
"上海",
"江西",
"西陕",
"河北",
"河南",
"天津",
"云南"];

var search_ans = {};    //保存本页面的查询结果

// 查询条件
var checkPaixi = null;
var checkDiyu = null;
var checkAuthor = null;
var checkWork = null;
var checkTimes = null;
var checkTimee = null;
var checkPlace = null;

//多重检索条件
var indexDim1 = null;
var indexDim2 = null;
var indexDim3 = null;
/**修改end */

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hid:false,
    search_dimension:0,
    ph:['默认为查找作者','查找具体作者','查找具体作品','查找具体时间','查找具体地点'],
    tishi:false,

    dimData:['作者','作品','时间','地点'],//搜索的维度
    // dimname1:"",
    dimindex1:null,
    dimshow1:false,
    // dimname2:"",
    dimindex2:null,
    dimshow2:false,
    // dimname3:"",
    dimindex3:null,
    dimshow3:false,

    hid0:false,

    hid1:false,
    hid11:false,
    hid12:false,
    hid13:false,
    hid14:false,
    
    hid2:false,
    hid21:false,
    hid22:false,
    hid23:false,
    hid24:false,

    hid3:false,
    hid31:false,
    hid32:false,
    hid33:false,
    hid34:false,

    show1:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData1:diyu,//下拉列表的数据
    index1:0,//选择的下拉列表下标

    show2:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData2:paixi,//下拉列表的数据
    index2:0,//选择的下拉列表下标

    show3:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData3:allAuthor,//下拉列表的数据
    index3:0,//选择的下拉列表下标

    
    startTime:"1800",
    endTime:"2000",
    datest: '开始',
    dateen:'截止',

    region: ['省', '市', '区'], // 初始值


    result:[{
      name:'《xxxxx》1',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》2',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》3',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》4',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》5',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》6',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》7',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》8',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》9',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》10',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》11',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》12',
      backcolor:'',
      chosen:false
    }],

    duoxuan:false,
    choose:false,

    search_tips:[],

    searchContent:"",

    customItem:'无'
  },

/***修改部分 */
//点击提示文本
  tapTips:function(e){
    let index = e.target.id;
    index = index.split('tips')[1];
    index = parseInt(index);
    search_ans = this.search_tips[index];
    console.log(this.search_tips[index]);
    this.giveTips({
      detail:{
        value:e.target.dataset.text
      }
    });
    this.setData({
      searchContent:e.target.dataset.text
    });
  } , 

// 检索提示函数 需要在data里面绑定search_tips:[]
  giveTips:function(e){
      let inputContent = e.detail.value;  //获取input框文本
      var db = wx.cloud.database();
      const _ = db.command;
      db.collection('works').where(_.or([{
        author:db.RegExp({
          regexp:inputContent,
          options:'i'
        })},
        {_id:db.RegExp({
          regexp:inputContent,
          options:'i'
        })}
      ])).get({
        success : res => {
          this.setData({
            search_tips : res['data']
          })
          this.search_tips = res['data'];
        }
      })
      
  },


/*修改部分end */

  tishi:function(){
    //每次点击提示框，将提示框显示
    this.setData({tishi:!this.data.tishi}) 
    //异步请求实现，每次文本改变更新提示
  },

  xuanze:function(e){
    let that = this;
    var i=e.currentTarget.dataset.i;
    //console.log(i);
    var color = 'result['+i+'].backcolor';
    var choose = 'result['+i+'].chosen';
    //console.log(choose);
    //console.log(this.data.result[i].chosen);
    if (this.data.result[i].chosen==false){
      this.setData({
           [choose]:true,
           [color]:'rgb(238,192,133,0.7)',
           duoxuan:true,             
         });
      // console.log(1);
      // console.log(that.data.list[i])
        }
      else{
        this.setData({
          [choose]:false,
          [color]:'',
          duoxuan:false,
        });
        for(var j=0;j<this.data.result.length;j++){
          if(this.data.result[j].chosen==true){
            this.setData({
              duoxuan:true,
            });
            break;
          }
        }
        // console.log(2);
        // console.log(that.data.list[i])
       }
  },

  tijiao:function(e){
    let that = this;
    var choose_in_list = [];                           
    
    //获取用户选中的作品的名字
    for(let item of that.data.result){
      if (item.chosen == true){
        choose_in_list.push(item.name);
      }
    }

    that.setData({
        choose : choose_in_list
      })

    // 跳转到主页，并把所选作品名传过去
  },

  quxiao:function(e){
    let that = this;
    var choose_in_list = [];                            //获取用户选中的作品的名字
    // for(let item of that.data.result){
    //   that.setData({
    //     [item.chosen]:false,
    //     [item.backcolor]:'#e0e0e0',
    //     duoxuan:false,
    //   })
      
    // }
    for(var j=0;j<this.data.result.length;j++){
      var color = 'result['+j+'].backcolor';
      var choose = 'result['+j+'].chosen';
      this.setData({
        [choose]:false,
        [color]:'',
        duoxuan:false,
      });
    }
    that.setData({
        choose : choose_in_list
      })
  },

  quanxuan:function(e){
    let that = this;
    var choose_in_list = [];
    for(var j=0;j<this.data.result.length;j++){
      var color = 'result['+j+'].backcolor';
      var choose = 'result['+j+'].chosen';
      this.setData({
        [choose]:true,
        [color]:'rgb(238,192,133,0.7)',
        duoxuan:true,
      });
      choose_in_list.push(this.data.result[j].name);
      //console.log(choose_in_list);
    }
    that.setData({
        choose : choose_in_list
      })
  },

  fanxuan:function(e){
    let that = this;
    var choose_in_list = [];
    for(var j=0;j<this.data.result.length;j++){
      var color = 'result['+j+'].backcolor';
      var choose = 'result['+j+'].chosen';
      //console.log(this.data.result[j].backcolor);
      if(this.data.result[j].backcolor=='rgb(238,192,133,0.7)'){
        this.setData({
          [color]:'',
        });
      }
      else{
        this.setData({
          [color]:'rgb(238,192,133,0.7)',
        });
        choose_in_list.push(this.data.result[j].name);
      }
      this.setData({
        [choose]:!this.data.result[j].chosen,
      });
      
      
    }
    if(choose_in_list.length==0){
      this.setData({
        duoxuan:false,
      })
    }
    else{
      this.setData({
        duoxuan:true,
      })
    }
    //console.log(choose_in_list);
    that.setData({
        choose : choose_in_list
      })
  },

  // 修改部分
  _checkRules:function(){
  
    var db = wx.cloud.database();
    const _ = db.command;
    let checkTiaojian = [];

    if(checkAuthor!=null){
      checkTiaojian.push({
        author:db.RegExp({
          regexp:checkAuthor,
          options:'i'
        })
      })
    }

    if(checkWork!=null){
      checkTiaojian.push({
        _id:db.RegExp({
          regexp:checkWork,
          options:'i'
        })
      })
    }

    if(checkPaixi!=null){
      checkTiaojian.push({
        paixi:db.RegExp({
          regexp:checkPaixi,
          options:'i'
        })
      })
    }

    if(checkPlace!=null){
      if(checkPlace[0] != "无"){
        checkTiaojian.push({
          province:db.RegExp({
            regexp:checkPlace[0],
            options:'i'
          })
        })
      }
      if(checkPlace[1] != "无"){
        checkTiaojian.push({
          city:db.RegExp({
            regexp:checkPlace[1],
            options:'i'
          })
        })
      }
      if(checkPlace[2] != "无"){
        checkTiaojian.push({
          qu:db.RegExp({
            regexp:checkPlace[2],
            options:'i'
          })
        })
      }
    }

    if(checkDiyu!=null){
      checkTiaojian.push({
        diyu:db.RegExp({
          regexp:checkDiyu,
          options:'i'
        })
      })
    }

    if(checkTimee != null && checkTimes != null){
      checkTiaojian.push({
        workTime:_.and(_.gte(checkTimes),_.lte(checkTimee))
      })
    }
   if(checkTiaojian.length !=0){
    db.collection('works').where(_.and(checkTiaojian)).get({
      success : res => {
        search_ans = res['data'];
        let showArr = [];
        for(let i = 0; i < res['data'].length;i++){
          showArr.push({
            name:res['data'][i]._id,
            backcolor:'',
            chosen:false
          })
        }
        this.setData({
          result:showArr
        })
      }
    });
   }
   
  },

  getDimContent:function(e){
    let pNow = e.currentTarget.id;
    if(pNow == 'dim1'){
      if(indexDim1 == 0){
        checkAuthor = e.detail.value;
      }else if(indexDim1 == 1){
        checkWork = e.detail.value;
      }
    }else if(pNow == 'dim2'){
      if(indexDim2 == 0){
        checkAuthor = e.detail.value;
      }else if(indexDim2 == 1){
        checkWork = e.detail.value;
      }
    }else if(pNow == 'dim3'){
      if(indexDim3 == 0){
        checkAuthor = e.detail.value;
      }else if(indexDim3 == 1){
        checkWork = e.detail.value;
      }
       
    }
    
    this._checkRules();
  },
  // 修改部分end

  // 获得省市
  bindRegionChange: function (e) {  // picker值发生改变都会触发该方法
    //console.log('picker发送选择改变，携带值为', e.detail.value);
    
    checkPlace = e.detail.value;
    //console.log(e.detail.value);
    this.setData({
      region: e.detail.value
    })
    this._checkRules();
  },

  // 获得起始时间
  selectDataTimes: function(e) {
    // console.log(e.detail.value)
    checkTimes = parseInt(e.detail.value);
    this.setData({
      datest: e.detail.value
    })
    this._checkRules();
  },

  // 获得截止时间
  selectDataTimee: function(e) {
    // console.log(e.detail.value)
    checkTimee = parseInt(e.detail.value);
    this.setData({
      dateen: e.detail.value
    })
    this._checkRules();
  },

  selectTapdim1(){
    //console.log(this.data.show1);
    this.setData({
     dimshow1: !this.data.dimshow1
    });
  },

    // 点击下拉列表
  optionTapdim1(e){
    //['作者','作品','时间','地点']
    let Indexdim1=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    indexDim1 = Indexdim1;
   //console.log(Indexdim1);
    this.setData({
     dimindex1:Indexdim1,
     dimshow1:!this.data.dimshow1
    });
    if(Indexdim1==0){
      
      this.setData({
        hid11:true,
        hid13:false,
        hid14:false,
        hid12:false,
        hid1:true,
         //dimname1:this.data.dimData[Indexdim1],
       });
        //console.log(this.data.dimData)
    }
    else if(Indexdim1==1){
      this.setData({
        hid12:true,
        hid11:false,
        hid13:false,
        hid14:false,
        hid1:false,
       });
    }
    else if(Indexdim1==2){
      this.setData({
        hid13:true,
        hid14:false,
        hid12:false,
        hid11:false,
        hid1:false,
       });
    }
    else if(Indexdim1==3){
      this.setData({
        hid14:true,
        hid12:false,
        hid11:false,
        hid13:false,
        hid1:false,
       });
    }
  },

  selectTapdim2(){
    //console.log(this.data.show1);
    this.setData({
     dimshow2: !this.data.dimshow2
    });
  },

    // 点击下拉列表
  optionTapdim2(e){
    let Indexdim2=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    //console.log(Indexdim2);
    indexDim2 = Indexdim2;
    this.setData({
     dimindex2:Indexdim2,
     dimshow2:!this.data.dimshow2
    });
    if(Indexdim2==0){
      // if(this.data.dimname1!=""){
      //   this.data.dimData.push(this.data.dimname1);
      // }
      // this.data.dimData.splice(Indexdim1,1);
      this.setData({
        hid21:true,
        hid23:false,
        hid24:false,
        hid22:false,
        hid2:true,
        // dimname1:this.data.dimData[Indexdim1],
       });
      //  console.log(this.data.dimData)
    }
    else if(Indexdim2==1){
      this.setData({
        hid22:true,
        hid21:false,
        hid23:false,
        hid24:false,
        hid2:false,
       });
    }
    else if(Indexdim2==2){
      this.setData({
        hid23:true,
        hid24:false,
        hid22:false,
        hid21:false,
        hid2:false,
       });
    }
    else if(Indexdim2==3){
      this.setData({
        hid24:true,
        hid22:false,
        hid21:false,
        hid23:false,
        hid2:false,
       });
    }
  },

  selectTapdim3(){
    //console.log(this.data.show1);
    this.setData({
     dimshow3: !this.data.dimshow3
    });
  },

    // 点击下拉列表
  optionTapdim3(e){
    let Indexdim3=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    //console.log(Indexdim3);
    indexDim3 = Indexdim3;
    this.setData({
     dimindex3:Indexdim3,
     dimshow3:!this.data.dimshow3
    });
    if(Indexdim3==0){
      // if(this.data.dimname1!=""){
      //   this.data.dimData.push(this.data.dimname1);
      // }
      // this.data.dimData.splice(Indexdim1,1);
      this.setData({
        hid31:true,
        hid33:false,
        hid34:false,
        hid32:false,
        hid3:true,
        // dimname1:this.data.dimData[Indexdim1],
       });
      //  console.log(this.data.dimData)
    }
    else if(Indexdim3==1){
      this.setData({
        hid32:true,
        hid31:false,
        hid33:false,
        hid34:false,
        hid3:false,
       });
    }
    else if(Indexdim3==2){
      this.setData({
        hid33:true,
        hid34:false,
        hid32:false,
        hid31:false,
        hid3:false,
       });
    }
    else if(Indexdim3==3){
      this.setData({
        hid34:true,
        hid32:false,
        hid31:false,
        hid33:false,
        hid3:false,
       });
    }
  },

  restart1(){
    //this.data.dimData.push(this.data.dimname1);
    this.setData({
      dimindex1:null,
      hid11:false,
      hid12:false,
      hid13:false,
      hid14:false,
      hid1:false,
     });
     if(indexDim1 == 0){
       checkAuthor = null;
     }else if(indexDim1 == 1){
       checkWork = null;
     }else if(indexDim1 == 2){
       checkTimee =null;
       checkTimes = null;
     }else if(indexDim1 == 3){
       checkPlace = null;
     }
  },

  restart3(){
    //this.data.dimData.push(this.data.dimname3);
    this.setData({
      dimindex3:null,
      hid31:false,
      hid32:false,
      hid33:false,
      hid34:false,
      hid3:false,
     });
     switch (indexDim3){
      case 0:
        checkAuthor = null;
        break;
     case 1:
       checkWork = null;
       break;
     case 2:
       checkTimes = null;
       checkTimee = null;
       break;
     case 3:
       checkPlace = null;
    }
  },

  restart2(){
    //this.data.dimData.push(this.data.dimname1);
    this.setData({
      dimindex2:null,
      hid21:false,
      hid22:false,
      hid23:false,
      hid24:false,
      hid2:false,
     });
     switch (indexDim2){
      case 0:
        checkAuthor = null;
        break;
     case 1:
       checkWork = null;
       break;
     case 2:
       checkTimes = null;
       checkTimee = null;
       break;
     case 3:
       checkPlace = null;
    }
  },

  selectTap1(){
    //console.log(this.data.show1);
    this.setData({
     show1: !this.data.show1
    });
  },
    // 点击下拉列表 --> 地域 派系 作家
  optionTap1(e){
    let Index1=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    if(Index1!=0){
      checkDiyu = diyu[Index1];
    }else{
      checkDiyu = null;
    }
    this.setData({
     index1:Index1,
     show1:!this.data.show1
    });
    this._checkRules();
  },

  selectTap2(){
    //console.log(this.data.show2);
    this.setData({
     show2: !this.data.show2
    });
  },
    // 点击下拉列表
  optionTap2(e){
    let Index2=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    //console.log(Index2);
    if(Index2!=0){
      checkPaixi = paixi[Index2];
    }else{
      checkPaixi = null;
    }
  
    this.setData({
     index2:Index2,
     show2:!this.data.show2
    });
    this._checkRules();
  },

  selectTap3(){
    //console.log(this.data.show3);
    this.setData({
     show3: !this.data.show3
    });
  },

    // 点击下拉列表
  optionTap3(e){
    let Index3=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    if(Index3!=0){
      checkAuthor = allAuthor[Index3];
    }else{
      checkAuthor = null;
    }
    this.setData({
     index3:Index3,
     show3:!this.data.show3
    });
    this._checkRules();
  },

  /**
   * 自定义函数 
   * */ 
 

  change_search:function(){
    checkAuthor = null;
    checkDiyu = null;
    checkPaixi = null;
    checkTimes = null;
    checkTimee =  null;
    checkWork = null;
    //重置了所有变量
    this.setData({
      hid:false,
    search_dimension:0,
    ph:['默认为查找作者','查找具体作者','查找具体作品','查找具体时间','查找具体地点'],
    tishi:false,

    dimData:['作者','作品','时间','地点'],//搜索的维度
    // dimname1:"",
    dimindex1:null,
    dimshow1:false,
    // dimname2:"",
    dimindex2:null,
    dimshow2:false,
    // dimname3:"",
    dimindex3:null,
    dimshow3:false,

    hid0:false,

    hid1:false,
    hid11:false,
    hid12:false,
    hid13:false,
    hid14:false,
    
    hid2:false,
    hid21:false,
    hid22:false,
    hid23:false,
    hid24:false,

    hid3:false,
    hid31:false,
    hid32:false,
    hid33:false,
    hid34:false,

    show1:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData1:diyu,//下拉列表的数据
    index1:0,//选择的下拉列表下标

    show2:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData2:paixi,//下拉列表的数据
    index2:0,//选择的下拉列表下标

    show3:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData3:allAuthor,//下拉列表的数据
    index3:0,//选择的下拉列表下标

    
    startTime:"1800",
    endTime:"2000",
    datest: '开始',
    dateen:'截止',

    region: ['省', '市', '区'], // 初始值


    result:[{
      name:'《xxxxx》1',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》2',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》3',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》4',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》5',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》6',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》7',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》8',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》9',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》10',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》11',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》12',
      backcolor:'',
      chosen:false
    }],
    duoxuan:false,
    choose:false,
    });
  },

  search:function(){

    //展示详细的复合检索条件
    this.setData({
      hid:true,
      search_dimension:0,
      hid0:true,
    });

  },

  search1:function(){
    this.setData({
      hid:true,
      search_dimension:1,
      hid0:true,
    });
    
  },

  search2:function(){
    this.setData({
      hid:true,
      search_dimension:2,
    });
  },

  search3:function(){
    this.setData({
      hid:true,
      search_dimension:3,
    });
  },

  search4:function(){
    this.setData({
      hid:true,
      search_dimension:4,
    });
  },

  search_history:function(){
    wx.navigateTo({
      url: '/pages/search_history/search_history',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hid:false,
    search_dimension:0,
    ph:['默认为查找作者','查找具体作者','查找具体作品','查找具体时间','查找具体地点'],
    tishi:false,

    dimData:['作者','作品','时间','地点'],//搜索的维度
    // dimname1:"",
    dimindex1:null,
    dimshow1:false,
    // dimname2:"",
    dimindex2:null,
    dimshow2:false,
    // dimname3:"",
    dimindex3:null,
    dimshow3:false,

    hid0:false,

    hid1:false,
    hid11:false,
    hid12:false,
    hid13:false,
    hid14:false,
    
    hid2:false,
    hid21:false,
    hid22:false,
    hid23:false,
    hid24:false,

    hid3:false,
    hid31:false,
    hid32:false,
    hid33:false,
    hid34:false,

    // show1:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    // selectData1:['地域','地域2','地域3','地域4','地域5','地域6'],//下拉列表的数据
    // index1:0,//选择的下拉列表下标

    // show2:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    // selectData2:['派系','派系2','派系3','派系4','派系5','派系6'],//下拉列表的数据
    // index2:0,//选择的下拉列表下标

    // show3:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    // selectData3:['全部','作家2','作家3','作家4','作家5','作家6'],//下拉列表的数据
    // index3:0,//选择的下拉列表下标

    
    startTime:"1800",
    endTime:"2000",
    datest: '开始',
    dateen:'截止',

    region: ['省', '市', '区'], // 初始值


    result:[{
      name:'《xxxxx》1',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》2',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》3',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》4',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》5',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》6',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》7',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》8',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》9',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》10',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》11',
      backcolor:'',
      chosen:false
    },
    {
      name:'《xxxxx》12',
      backcolor:'',
      chosen:false
    }],
    duoxuan:false,
    choose:false,
  });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})


