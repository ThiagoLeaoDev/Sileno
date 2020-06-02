import React, { useState, useEffect } from 'react'; //o useEffect executa algo quando o componente é montado, uma única vez   
import { StyleSheet, Image, View, ScrollView, Text, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
import { TouchableHighlight, TextInput } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

import SearchBar from '../../components/searchInput';

import Mapstyle from '../../components/mapbox/MapStyle.json';
import MapSlide from '../../components/mapbox/MapSlide.json';
import mapboxModule from '../../components/mapbox/controller.js'
import satiros from '../../components/satiros/list.js';
import mainStyle from './main.styles.js';
const images = [
    'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/2034851/pexels-photo-2034851.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/1601775/pexels-photo-1601775.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/261043/pexels-photo-261043.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
]
var userCoords;
var map;
function Main(){
    const[currentRegion, setCurrentRegion ] = useState(null); //currentRegion = novo estado, setCurrentRegion = metodo para a atualização dos valores
    useEffect(()=>{
        async function loadInitialPosition() { //função para o processo de geolocalização
            const { granted } = await requestPermissionsAsync(); //RPA pede a permição, desestruturado pra trazer o feedback (granted)

            if(granted){ //verifica se o granted retornou true, dizendo que é permitido o uso da localização
                const { coords } = await getCurrentPositionAsync({ //GCPA puxa a localização atual do usuário, desestruturada paraa trazer apenas as coordenadas (coords)
                    enableHighAccuracy: true, //enableHighAccuracy usa o gps do celular para conseguir uma maior precisão
                });

                const { latitude, longitude } = coords; //desestrutura coords para trazer apenas latitude e longitude
                userCoords = coords;
                setCurrentRegion({ //atualizando o state currentRegion
                    latitude, 
                    longitude,
                    latitudeDelta: 0.01, //Deltas controlam o zoom
                    longitudeDelta: 0.01,
                })
                
                
            }
        }
            
        loadInitialPosition();
    }, []);
    if (!currentRegion){
        return null;
    }
    return ( 
    <>
        <MapView 
        ref = {(mapView) => { map = mapView; }}
        initialRegion={ currentRegion } 
        style={styles.map}
         customMapStyle={Mapstyle} 
         showsMyLocationButton={true} 
         showsUserLocation={true} 
         >
             {satiros.localizarSatiros()}
           
        </MapView>
        <View style={styles.searchContainer}>
            <SearchBar/>
        </View>
        <View style={styles.extraMap}>
            <TouchableHighlight onPress={() => {}} style={styles.touchable}>
                <MaterialIcons name="search" size={25} color="#9BAED4"  />
            </TouchableHighlight>
            <TouchableHighlight onPress={()=>{
               mapboxModule.centralizarLocalizacao(map,userCoords.latitude,userCoords.longitude,60)
            }} style={styles.touchable2}>
                <MaterialIcons name="my-location" size={25} color="#9BAED4"  />
            </TouchableHighlight>
        </View>
        <ScrollView pagingEnabled horizontal style={styles.scrollCards} showsHorizontalScrollIndicator={false}>
            {
                images.map((item, index) => (
                    <View style={styles.cardSlide}>
                        <Image key={index} source={{ uri: item}}
                        style={styles.imagesCard}/>
                        <Text style={styles.cardTitle}>{MapSlide.card.nome}</Text>
                        <Text style={styles.cardSubTitle}>{MapSlide.card.desc}</Text>
                    </View>
                ))
            }
        </ScrollView>
    </>
    );
}

const styles = StyleSheet.create(mainStyle)

export default Main;