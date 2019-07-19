<template>
    <div>
        <div class="complain-detail" v-if="allWindow">
            <div class="top" :style="'top:-'+top+'rem'">{{inner}}</div>
            <div>            
                <div class="weui-cells__title">投诉对象</div>  
                <div class="weui-cells"> 
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <div class="complain-info-icon">
                                <img alt="">
                            </div>
                        </div> 
                        <div class="vux-cell-bd vux-cell-primary">
                            <p><!----> </p> 
                            <span class="vux-label-desc"></span>
                        </div> 
                        <div class="weui-cell__ft">  <!---->
                        </div> 
                    </div>
                </div>
            </div> 
            <div>
                <div class="weui-cells__title">投诉描述</div>
                <div class="weui-cells"> 
                    <div class="weui-cell">
                        <div class="weui-cell__hd"></div> 
                        <div class="vux-cell-bd vux-cell-primary">
                            <p><label class="vux-label">{{type}}</label></p>
                            <span class="vux-label-desc"></span>
                        </div> 
                        <div class="weui-cell__ft">  <!----></div> 
                    </div> 
                    <div class="weui-cell vux-x-textarea">
                        <div class="weui-cell__hd"><!----> <!----> <!----></div> 
                        <div class="weui-cell__bd">
                            <textarea autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="请输入投诉内容" v-model="content" @input="inputContent" rows="3" cols="30" maxlength="200" class="weui-textarea"></textarea> 
                            <div class="weui-textarea-counter"><span>{{contentNum}}</span>/200</div>
                        </div>
                    </div> 
                    <div class="weui-cell">
                        <div class="weui-cell__hd"></div> 
                        <div class="vux-cell-bd vux-cell-primary">
                            <p><label class="vux-label">证据截图</label></p>
                            <span class="vux-label-desc"></span>
                        </div>
                        <div class="weui-cell__ft"> {{picNum}}/4 <!----></div>
                    </div> 
                    <div class="img-upload">
                        <div class="msg-bp-img">
                            <div class="upload-img-preview" v-for="item,i in imgArr" @click="bigPic(i)">
                                <img :src="item" alt="">
                            </div>
                            <div v-if="addBtn">
                                <div class="van-uploader">
                                    <div class="upload-plus">+</div>
                                    <input type="file" class="van-uploader__input" @change="addPic">
                                </div>
                            </div> 
                            <div class="van-popup popup" style="z-index: 2003;" v-if="maskShow">
                                <div class="preview">
                                    <div class="preview-img-wrap">
                                        <img :src="imgArr[now]" alt="">
                                    </div> 
                                    <div class="preview-img-del" @click="delPic">删除</div>
                                </div>
                            </div>
                            <div class="van-modal" style="z-index: 2002;"  v-if="maskShow" @click="close"></div>
                        </div>
                    </div>
                </div>
            </div> 
            <div class="complain-allow" style="margin: 10px;">
            <div class="vux-check-icon">
                <i class="weui-icon weui_icon_success weui-icon-success" style="display: none;"></i> 
                <i class="weui-icon weui_icon_success_circle weui-icon-success-circle" v-if="isget" @click="isgett"></i> 
                <i class="weui-icon weui_icon_circle weui-icon-circle" v-else @click="isgett"></i> 
                <span></span>
            </div>允许微信使用小程序当前页面的数据作为投诉证据。<a href="#/info" class="">《相关说明》</a></div> 
            <div style="margin: 10px;">
                <button class="weui-btn weui-btn_primary" @click="submit">提交</button>
            </div>
        </div>
        <div v-else class="else" @click="closePage">
            <img src="../assets/11.png" alt="">
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            type:"",
            isget:true,
            content:"",
            contentNum:0,
            picNum:0,
            addBtn:true,
            imgArr:[],
            now:"",
            maskShow:false,
            top:0.8,
            inner:"",
            allWindow:true
        }
    },
    methods:{
        delPic(){
            this.close();
            this.imgArr.splice(this.now,1)
            if(this.imgArr.length<4){
                this.addBtn = true;
            }
        },
        closePage(){
            wx.closeWindow();
        },
        close(){
            this.maskShow = false;
        },
        bigPic(i){
            console.log(i);
            this.now = i;
            this.maskShow = true;
        },
        addPic(e){
            var _this = this;
            var target = e.target;
            var data = e.target.files[0];
            console.log(111,data)

            var reader = new FileReader();
            var imgFile;
            reader.onload = function (e) {
                imgFile = e.target.result;
                console.log(222,imgFile)
                _this.imgArr.push(imgFile);
                _this.picNum = _this.imgArr.length;
                if(_this.imgArr.length>3){
                    _this.addBtn = false;
                }
            };
            reader.readAsDataURL(data);
        },
        inputContent(e){
            console.log(e.target.value);
            this.contentNum = e.target.value.length;
        },
        submit(){
            // alert("提交");
            var _this = this;
            console.log(222,this.content,this.imgArr)
            if(!this.content.length){
                this.inner = "请输入投诉描述"
                this.showTop();
                return;
            }
            if(!this.imgArr.length){
                this.inner = "请添加证据截图"
                this.showTop();
                return;
            }    
            this.allWindow = false;        
        },
        showTop(){
            var _this = this;
            this.top = 0;
            setTimeout(() => {
                _this.top = 0.8;
            }, 1400);
        },
        isgett(){
            console.log(this.isget)
            this.isget=!this.isget
        }
    },
    created(){
        this.type = this.$route.query.type
    }
}
</script>
<style lang="css" scoped>
.top{
    background-color: #d95353;
    height: 0.8rem;
    position: fixed;
    width: 100%;    
    color: #fff;
    font-size: 0.38rem;
    text-align: center;
    line-height: 0.8rem;
    transition: top 0.2s;
}
.else{
    background: #f2f2f2;
    min-height: 100vh;
}
.else img{
    width: 100%;   
}
</style>


