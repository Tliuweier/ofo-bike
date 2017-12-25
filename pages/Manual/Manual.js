//index.js
//获取应用实例
const app = getApp()

Page({
   data:{
    inputValue:0,
    disabled:false
   },
   bindInput(e){
      console.log(e.detail.value.length);
      if(e.detail.value.length>3){
        this.setData({
            disabled:true
        })
      }else{
        this.setData({
            disabled:false
        })
      }
      this.setData({
        inputValue:e.detail.value,
      })
   },
   submit(){
      console.log(this.data.inputValue);
      if(this.data.inputValue.length<4){
        return;
      }else{
          wx.request({
            url: 'https://easy-mock.com/mock/59c87b18e0dc663341b81e23/example/getPassword', //仅为示例，并非真实的接口地址
            data: {
               number:this.data.inputValue
            },
            header: {
                'content-type': 'application' // 默认值
            },
            success: function(res) {
              console.log(res);
              wx.navigateTo({
                  url: '../Unclock/Unclock?password='+res.data.data.password+'&number='+res.data.data.Number
              })
            }
          })
      }
   }
})
