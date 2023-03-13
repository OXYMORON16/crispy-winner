<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="dark">  
        <ion-title>
          Login
        </ion-title>
      </ion-toolbar>  
    </ion-header>   
    <ion-content :fullscreen="true">
      <ion-card class="ion-margin-top">
        <ion-card-content>
        <ion-label>Username</ion-label>
        <ion-input position="stacked" placeholder="Username" v-model="username" clear-input />

        <ion-label>Password</ion-label>
        <ion-input position="stacked" placeholder="Password" v-model="password" type="password" clear-input />

        </ion-card-content>
        <ion-button color="dark" shape="round" class="ion-margin" @click="login">Login</ion-button>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "@/store";
import db from "@/firebase/init";
import { collection, query, where, getDocs } from "firebase/firestore";
import { IonContent, IonPage, IonHeader, IonTitle, IonToolbar, IonLabel, IonCard, IonCardContent, IonInput, IonButton } from '@ionic/vue';

export default defineComponent({
  name: 'Login',
  components: {
    IonContent,
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonCard,
    IonCardContent,
    IonInput,
    IonButton
  },
  data(){
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    async login(){
      const q = query(collection(db, "User"), where("username", "==", this.username), where("password", "==", this.password));
      const user = await getDocs(q);
      const userData = user.docs[0].data();

      this.store.dispatch('user/login', userData);
      
      this.$router.push('/')
    }
  },
  setup() {
    const store = useStore();
    return { 
      store
    };
  }
})
</script>

<style scoped>
  ion-label {
    font-size: 18px;
  }

  ion-input, ion-textarea {
    --background: rgb(221, 219, 219);
    border-radius: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
  }

  ion-card {
    max-width: 500px;
    margin: auto;
    margin-top: 100px;
  }

</style>
