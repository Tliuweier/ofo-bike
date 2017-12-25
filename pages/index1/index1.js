//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    longitude:0,
    latitude:0,
    scale:18
  },
  onLoad: function (e) {
    console.log("计时器："+e.timer);
    this.timer = e.timer;
    wx.getLocation({
      type:'gcj02',
      success:(res)=>{
        // res.windowHeight
        console.log(res);
        this.setData({
          longitude:res.longitude,
          latitude:res.latitude
        })
      }
    })
    wx.getSystemInfo({
      success:(res)=>{
        this.setData({
          controls:[{
            id:1,
            iconPath:'/images/location (2).png',
            position:{
              left:20,
              top:res.windowHeight-80,
              width:50,
              height:50
            },
            clickable:true
          },{
            id:2,
            iconPath:'/images/user.png',
            
            position:{
              left:res.windowWidth/2-45,
              top:res.windowHeight-100,
              width:90,
              height:90
            },
            clickable:true
          },{
            id:3,
            iconPath:'/images/warn.png',
            position:{
              left:res.windowWidth-70,
              top:res.windowHeight-80,
              width:50,
              height:50
            },
            clickable:true
          },{
            id:4,
            iconPath:'/images/marker.png',
            position:{
              left:res.windowWidth/2-11,
              top:res.windowHeight/2-45,
              width:22,
              height:45
            },
            clickable:true
          },{
            id:5,
            iconPath:'/images/avatar.png',
            position:{
              left:res.windowWidth-68,
              top:res.windowHeight-155,
              width:45,
              height:45
            },
            clickable:true
          }]
        })
      }
    })
    wx.request({
      url:'https://easy-mock.com/mock/59c87b18e0dc663341b81e23/example/biyclePosition',
      data:{},
      method:'GET',
      success:(res)=>{
        this.setData({
          marker:res.data.data
        })
      }
    })
  },
  onShow(){
    this.mapCtx = wx.createMapContext("ofoMap");
    this.movetoPosition();
  },
  movetoPosition(){
    this.mapCtx.moveToLocation();
  },
  bindregionchange(e){
    console.log(e);
    if(e.type=="begin"){
    wx.getLocation({
      type:'gcj02',
      success:(res)=>{
        // res.windowHeight
        console.log(res);
        this.setData({
          longitude:res.longitude,
          latitude:res.latitude
        })
      }
    })
      wx.request({
      url:'https://easy-mock.com/mock/59c87b18e0dc663341b81e23/example/biyclePosition',
      data:{},
      method:'GET',
      success:(res)=>{
        this.setData({
          _marker:res.data.data
        })
      }
    })
    }else if(e.type=="end"){
      this.setData({
        marker:this.data._marker
      })
    }
  },
  bindmarkertap(e){
    let marker = this.data.marker;
    let markerId = e.markerId;
    let currMaker  = marker[markerId];
    this.setData({
      polyline:[{
        points:[{
          longitude:this.data.longitude,
          latitude:this.data.latitude
        },{
          longitude:currMaker.longitude,
          latitude:currMaker.latitude
        }],
        color:"#FF000DD",
        width:1,
        dottedLine:true
      }]
    })
  },
  controltap:function(e){
    switch(e.controlId){
      case 1:this.movetoPosition();
        break;
      case 2 :if(this.timer===""||this.timer===undefind){
        wx.scanCode({
            success: (res) => {
              // 正在获取密码通知
              wx.showLoading({
                title: '正在获取密码',
                mask: true
              })
              // 请求服务器获取密码和车号
              wx.request({
                url: 'https://easy-mock.com/mock/59c87b18e0dc663341b81e23/example/getPassword',
                data: {},
                method: 'GET', 
                success: function(res){
                  // 请求密码成功隐藏等待框
                  wx.hideLoading();
                  // 携带密码和车号跳转到密码页
                  wx.redirectTo({
                    url: '../Unclock/Unclock?password=' + res.data.data.password + '&number=' + res.data.data.Number,
                    success: function(res){
                      wx.showToast({
                        title: '获取密码成功',
                        duration: 1000
                      })
                    }
                  })           
                }
              })
            }
          })
        // 当前已经在计费就回退到计费页
        }else{
          wx.navigateBack({
            delta: 1
          })
        }
      break;
      case 3 :wx.navigateTo({
        url:'../repair/repair'
      });
        break;
      case 5 :wx.navigateTo({
        url:'../my/my'
      });
        break;
    }
  },
  getUserInfo: function(e) {

  }
   
})
