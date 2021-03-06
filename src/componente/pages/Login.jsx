import React, { useState } from 'react';
import firebase from '../../../firebase';
import { Text, View, TextInput, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useContext } from 'react'
import { UserContext } from './UserContext';
import { Ionicons } from '@expo/vector-icons'
import { styles } from '../styles/styles';

export default function Login() {
    const { logar, deslogar } = useContext(UserContext);

    // const [hidePass, setHidePass] = useState(true);
    // const [input, setInput] = useState('');

    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState(false);
    const [state, setState] = useState({
        nome: "",
        email: "",
        senha: "",
        msg: "",
    });

    const handleInputChange = (name, value) => {
        setState({
            ...state,
            [name]: value
        });
    };

    useEffect(
        () => {
            const auth = firebase.auth;
            const unsubscribed = auth.onAuthStateChanged(
                user => {
                    if (user) {
                        if (user.emailVerified) {
                            logar(user);
                        } else {
                            auth.signOut();
                            deslogar();
                            setLoading(false);
                        }
                    } else {
                        setLoading(false)
                    }
                }
            )
            return () => {
                unsubscribed();
            }
        }, []
    )

    const login = async () => {
        const auth = firebase.auth;
        const { email, senha } = state;
        try {
            const resposta = await auth.signInWithEmailAndPassword(email, senha)
            setState ({... state, msg: "Loguei"})
        } catch (error) {
            setState({ ...state, msg: "Email ou Senha invalidos" })
        }
    }


    const cadastrar = async () => {
        const auth = firebase.auth;
        const { email, senha } = state;
        if (senha.length >= 6) {
            try {
                const resposta = await auth.createUserWithEmailAndPassword(email, senha);
                // auth.currentUser.sendEmailVerification();
                setNewUser(false);
                setState({ ...state, msg: "verifique sua conta de email" })
            } catch (error) {
                setState({ ...state, msg: "N??o foi poss??vel cadastrar o usu??rio" })
            }
        } else {
            setState({ ...state, msg: "Senha deve conter no m??nimo 6 caracteres" })
        }
    }
  
    if (loading) {
        return <ActivityIndicator />
    }

    return (
        <View style={styles.loginView}>
            
            <Text style={styles.h1}>{newUser ? "Novo Usu??rio" : "Login"}</Text>
            
            <View style={styles.formView}>

                <TextInput style={styles.input}
                    placeholder="Nome"
                    defaultValue={state.nome}
                    onChangeText={(value) => handleInputChange('nome', value)}

                />

                <TextInput style={styles.input}
                    placeholder="Email"
                    defaultValue={state.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                />

                <TextInput style={styles.input}
                    placeholder="Senha"
                    defaultValue={state.senha}
                    secureTextEntry={true}
                    onChangeText={
                        (value) =>
                            handleInputChange('senha', value)
                            // (texto) => setInput(true)
                    }
                    // secureTextEntry={hidePass}
                />
                {/* <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
                    <Ionicons name="eye" color="black" size={25} />
                </TouchableOpacity> */}

                {newUser ?
                    <TouchableOpacity
                        onPress={cadastrar}
                        style={styles.btn}
                    ><Text
                        style={styles.textbtn}
                    >Cadastrar</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={login}
                        style={styles.btn}
                    ><Text
                        style={styles.textbtn}
                    >Login</Text>
                    </TouchableOpacity>}

                {newUser ?
                    <Text 
                        onPress={() => setNewUser(false)}
                    > Login </Text>
                    :
                    <Text
                        onPress={() => setNewUser(true)}
                    >Cadastrar</Text>}

                <Text >{state.msg}</Text>

            </View>
        </View>
    )
}