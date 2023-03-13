import { toastController } from '@ionic/vue';

const showToast = async (message: string, configButtons?: any) => {
  const defaultButtons = [{
    text: 'Dismiss',
    role: 'cancel'
  }]
  
  if (configButtons) defaultButtons.push(...configButtons);
  
  const toast = await toastController
    .create({
      message: message,
      duration: 3000,
      position: 'bottom',
      buttons: defaultButtons
    })
  return toast.present();
}

export { showToast }