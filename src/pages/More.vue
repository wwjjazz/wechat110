<template>
    <div class="type-list">
        <div>
            <div class="weui-cells__title">请选择投诉原因</div>
            <div class="weui-cells">
                <div class="weui-cell vux-tap-active weui-cell_access" v-for="(item,i) in arr" @click="go(item)">
                    <div class="weui-cell__hd"></div>
                    <div class="vux-cell-bd vux-cell-primary">
                        <p><label class="vux-label">{{item}}</label> </p> <span class="vux-label-desc"></span>
                    </div>
                    <div class="weui-cell__ft">
                        <!---->
                    </div>
                </div>                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            arr:[]
        }
    },
    methods:{
        go(name){
            this.$router.push('/detail?type='+name);
        }
    },
    created(){
        console.log(this.$route.params.id);
        var id = this.$route.params.id;
        if(id==2){
            this.arr = ["诱导分享","诱导关注","诱导下载"]
        }else if(id==9){
            this.arr = ["政治类不实信息","医疗健康类不实信息","社会事件类不实信息","企业相关类不实信息"]
        }
    }
}
</script>

