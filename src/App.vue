<template>
  <div class="header">
    <img src="./assets/logo.png" class="logo" />
  </div>

  <ContainerView/>

  <!-- <div v-if="step == 0" class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">글 작성</label>
    </ul>
 </div> -->
 
</template>

<script>
import ContainerView from './components/ContainerView.vue'

export default {
  // data() {
  //   return {
  //     step : 0,
  //   }
  // },
  name: 'App',
  // mounted() {
  //   this.emitter.on('wearColor', (color)=> {
  //     this.filterName = color;
  //   });
  //   fetch("http://www.somastagram.suhwanc.com:8001/api/posts")
  //   .then((res) => res.json())
  //   .then((fetchedPosts) => (this.posts = fetchedPosts));
  //   fetch("http://www.somastagram.suhwanc.com:8001/api/guests")
  //   .then((res) => res.json())
  //   .then((fetchedGuests) => (this.guests = fetchedGuests));
  // },
  components: {
    ContainerView,
  },
  // methods: {

  //   ...mapMutations(['setMore']),
  //    upload(e){
  //      let file = e.target.files;
  //      this.imgUrl = URL.createObjectURL(file[0]);
  //      this.step = 1;
  //    },
  //    publish() {
  //     var myPost = {
  //       name: "소마 13기",
  //       userImage: "https://placeimg.com/100/100/arch",
  //       postImage: this.imgUrl,
  //       likes: 0,
  //       date: "Apr 25",
  //       liked: false,
  //       content: this.message,
  //       filter: this.filterName,
  //     };
  //     this.posts.unshift(myPost);

  //     fetch(this.imgUrl)
  //       .then((r) => r.blob())
  //       .then((image) => {
  //         const formData = new FormData();
  //         formData.append("name", "소마 13기");
  //         formData.append("userImage", "https://placeimg.com/100/100/arch");
  //         formData.append("postImage", image);
  //         formData.append("likes", 0);
  //         formData.append("date", "Apr 25");
  //         formData.append("liked", false);
  //         formData.append("content", this.message);
  //         formData.append("filter", this.filterName);
  //         return formData;
  //       })
  //       .then((formData) =>
  //         fetch("http://www.somastagram.suhwanc.com:8001/api/posts", {
  //           method: "POST",
  //           body: formData,
  //         })
  //       )
  //       .catch((err) => {
  //         console.error(err);
  //         this.posts.pop(0);
  //       })
  //       .finally(() => {
  //         this.step = 0;
  //       });
  //   },
  //    addGuestbook(){
  //      var myGuest = {
  //        name: this.nickName,
  //        content: this.guestContext,
  //      };
  //      this.guests.unshift(myGuest);
  //      fetch("http://www.somastagram.suhwanc.com:8001/api/guests", {method: "POST", body: JSON.stringify(myGuest), headers: {"Content-Type": "application/json"}}).catch(err=>{
  //        console.error(err);
  //        this.guests.pop(0);
  //      })
  //    },
  //    getData: function(){
  //             axios.get('https://raw.githubusercontent.com/joshua1988/doit-vuejs/master/data/demo.json')
  //             .then(function(response){
  //                 alert(response);
  //                 console.log(response); // 객체 형태로 반환. 파싱작업 불필요
  //             });
  //           }
                
  // },

  // // computed 함수는 항상 return이 있어야 한다.
  // computed : {
  //   name(){
  //     return this.$store.state.name;
  //   },
  //   ...mapState(['name', 'age', 'likes']),
  //   ...mapState({ othername : 'name'})

  // }
}
</script>

<style>

body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  height: 50%;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 10px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
  z-index: 100;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 15px;
  font-style: bold;
  padding-top: 12px;
}
.footer-button-plus:hover {
  opacity: 0.5;
  filter: alpha(opacity=50);
  color: #4ba2db;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
