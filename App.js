import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications'
import { useEffect } from 'react';
import CategoriesScreens from './screens/CategoriesScreens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MealsOverview from './screens/MealsOverview';

/* este es necesario tenerlo para poner manejar las notificaciones, para que siquiera aparezcan */
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowAlert: true
    }
  }
});

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    /* event listener para escuchar cuando una notificación llega */
    const suscription = Notifications.addNotificationReceivedListener(notification => {
      const userName = notification.request.content.data.userName;
      console.log(userName);
    });

    /* Event listener para cuando el usuario interactua con la notificación */
    const subscription2 = Notifications.addNotificationResponseReceivedListener(notification => {
      console.log('NOTIFICATION RESPONSE');
      console.log(notification);
    })

    return () => {
      suscription.remove();
      subscription2.remove();
    };
  }, []);

  /* Función que se encarga de programar la notificación */
  const scheduleNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'my First local notification', body: 'This is the body notification',
        data: { userName: 'Max' }
      },
      trigger: {
        seconds: 5
      }
    });
  };

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Meals Categories' component={CategoriesScreens}/>
          <Stack.Screen name='Meals Overview' component={MealsOverview}/>
        </Stack.Navigator>
      </NavigationContainer>

    </>
  );
}

{/* <Button title='Scheadule Notification' onPress={scheduleNotificationHandler} /> */ }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
