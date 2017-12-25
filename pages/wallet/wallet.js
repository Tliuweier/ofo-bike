//index.js
//获取应用实例
const app = getApp()

Page({
    data:{
      overage:0,
      ticket:0
    },
    onLoad(){
      wx.setNavigationBarTitle({
       title: '我的钱包'
     })
    },
    onReady(){
      let _this = this;
      wx.getStorage({
        key:'overage',
        success:(res)=>{
          _this.setData({
            overage:res.data.overage
          })
        }
      })
    },
    onShow(){
      let _this = this;
      wx.getStorage({
        key:'overage',
        success:(res)=>{
          _this.setData({
            overage:res.data.overage
          })
        }
      })
    },
    overageDesc(){
      wx.showModal({
        title:"",
        content:"充值余额0.00元+活动赠送余额0.00元",
        showCancel:false,
        confirmText:"我知道了",
      })
    },
    showInvcode(){
      wx.showModal({
        title: "ofo共享单车",
        content: "微信服务号：ofobike,网址：m.ofo.so",
        showCancel: false,
        confirmText: "玩的6"
      })
    },
    movetoCharge(){
       wx.redirectTo({
        url: '../charge/charge'
      })
    },
    showTicket(){
      wx.showModal({
        title: "",
        content: "你没有用车券了",
        showCancel: false,
        confirmText: "好吧",
      })
    },
    showDeposit(){
      wx.showModal({
        title: "",
        content: "押金会立即退回，退款后，您将不能使用ofo共享单车确认要进行此退款吗？",
        cancelText: "继续使用",
        cancelColor: "#b9dd08",
        confirmText: "押金退款",
        confirmColor: "#ccc",
        success: (res) => {
          if(res.confirm){
            wx.showToast({
              title: "退款成功",
              icon: "success",
              duration: 2000
            })
          }
        }
      })
    }
})
