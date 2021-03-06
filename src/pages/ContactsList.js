import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';


import SearchBar from '../components/searchInput';
import Partition from '../components/PartitionFriendList';
import ItemFriend from '../components/FriendListItem';


// import { Container } from './styles';

export default function ContactsList({ navigation }) {
  const [contacts, setContacts] = useState([]);
    
    useEffect(() => {
        (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const data = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Emails],
            });
            setContacts(data.data);
        }
        })();
    }, []);

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
        <Text style={styles.textRoutes}>Contatos*</Text>
      </View>
      <View style={styles.searchContainer}>
        <SearchBar/>
      </View>
      <View style={{height: '70%', top: 190}}>
      <ScrollView>
        {
          contacts.map(contact=>(
            <ItemFriend name={contact.name} description='Architect, New York' status='online'/>
          ))
				}
      </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    Content: {
        flex: 1,
        backgroundColor: '#272B35',
    },
    topicons: {
        position: 'absolute',
        width: '100%',
        top: 25,
        paddingHorizontal: 10,
        paddingRight: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    pageRoutes: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 100,
        alignSelf: 'center'

    },
    textRoutes: {
        fontSize: 20,
        color: '#A1A1A1'
    },
    searchContainer: {
        position: 'absolute',
        top: 145,
        left: 20,
        right: 20,
    },
    
});