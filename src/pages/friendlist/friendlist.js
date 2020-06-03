import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import SearchBar from '../../components/searchInput';
import Partition from '../../components/PartitionFriendList';
import ItemFriend from '../../components/FriendListItem'
import friendlistStyle from './friendlist.styles.js';

// import { Container } from './styles';

export default function FriendList({ navigation }) {

    return (
        <View style={styles.Content}> 
            <View  style={styles.topicons}>
                <TouchableOpacity onPress={()=>{ navigation.navigate('Profile'); }}>
                    <MaterialIcons name="chevron-left" size={50} color="#fff"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}}>
                    <MaterialIcons name="person-add" size={30} color="#fff"/>
                </TouchableOpacity>
            </View>
            <View style={styles.pageRoutes}>
                <Text style={styles.textRoutes}>Sátiros</Text>
                <Text style={styles.textRoutes}>Amigos</Text>
                <Text style={styles.textRoutes}>Contatos</Text>
            </View>
            <View style={styles.searchContainer}>
                <SearchBar/>
            </View>
            <View style={{height: '70%', top: 190}}>
            <ScrollView>
                    <ItemFriend name='Andrew Richard' description='Architect, New York' status='online'/>
            </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create(friendlistStyle);