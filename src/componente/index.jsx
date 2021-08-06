import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput} from 'react-native'
import {GoogleMaps} from 'GoogleMaps.h'




export default class index extends Component {
    render() {
        return (
            <View>
                <TextInput placeholder="Para onde vamos ?" />
                <TextInput placeholder="Insira seu local de embarque?" />
                <Text> textInComponent </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({})

