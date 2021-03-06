import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView,  } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Triangles from '../../components/trianglesComponent';
import InputComponent from '../../components/Input';
import verificationStyle from './verification.style.js';

import Logo from '../../components/sileno';

export default function Register({navigation}) {
    // create state hidden or visible for view using react hooks. Basically you need pass two objects, the first object is 
    //the final result or the response of your call, and the last object is where you pass the conditions, then useState for
    //literally use the state, and the initial state of your component
const [alertVisible, setAlertVisible] = useState(null); 

    return (
        <View style={styles.Content}>
            <KeyboardAvoidingView style={styles.containerForm} behavior="position">
                <Triangles/>
                <Logo color='#F8295F' size={130} style={styles.containerLogo}/>
                <View style={{width: '90%'}}>
                    <Text style={[styles.topDesc, {marginTop: '12%', textAlign: 'left'}]}>
                    Aguardando para detectar automaticamente um SMS enviado para
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.topDesc}>+55 13 974154802.</Text>
                        <TouchableOpacity>
                            <Text style={[styles.topDesc, {color: '#3ACCE1', marginLeft: 5}]}>Número errado?</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={[styles.topDesc, {marginBottom: 6, marginTop: '8%'}]}>Digite o código de 6 dígitos</Text>
                <View>
                    <InputComponent 
                    autoCapitalize="none" //options: characters, words, sentences and none.
                    keyboardType="number-pad" 
                    keyboardAppearance="dark" // IOS only
                    selectionColor="#fff" //color of cursor
                    autoCorrect={false}
                    maxLength={6}
                    />
                    <TouchableOpacity  onPress={()=>{ navigation.navigate('setProfile'); }} style={styles.buttonInput}>
                        <MaterialIcons name="arrow-forward" size={24} color="#FFF"/>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            <View style={{width: '80%',flexDirection: 'row', top: '26%', justifyContent: 'space-between'}}>
                <TouchableOpacity style={{flexDirection: 'row'}}>
                    <MaterialIcons name="message" size={22} color="#A7A7A7"/>
                    <Text style={[styles.topDesc, {marginLeft: 10}]}>Reenviar SMS</Text>
                </TouchableOpacity>
                <Text style={[styles.topDesc, {fontSize: 14}]}>1:10</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create(verificationStyle);