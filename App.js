import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from './src/componente/pages/Login';
import Principal from './src/componente/pages/Principal';
import { UserContext } from './src/componente/pages/UserContext';
import Mapa from './src/componente/pages/Mapa';


const Drawer = createDrawerNavigator();
export default function App() {
  const [logado, setLogado] = useState(false);
  const [usuario, setUsuario] = useState(null);

  const logar = async (user) => {
    setLogado(true);
    setUsuario(user);
  }

  const deslogar = async () => {
    setLogado(false);
    setUsuario(null);
  }

  return (
    <NavigationContainer >
      <StatusBar />
        {/* <UserContext.Provider value={{ usuario, logar, deslogar }}>
        {logado ? <Principal /> : <Login />}
        </UserContext.Provider> */}
        <Mapa/>
    </NavigationContainer>
  );
}