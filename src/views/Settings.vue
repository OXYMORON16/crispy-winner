<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="dark"> 
        <ion-title>
          Settings
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list :inset="true">
        <ion-item>
          <ion-label>Username</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Update Resume</ion-label>
          <ion-button color="dark" fill="outline" class="ion-margin">Update</ion-button>
        </ion-item>
        <ion-item>
          <ion-label>Logout</ion-label>
          <ion-button color="dark" fill="outline" class="ion-margin">Logout</ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList } from '@ionic/vue';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonLabel,
        IonItem,
        IonList,
       },

  data(){
    return {

    }
  }
});
  </script>