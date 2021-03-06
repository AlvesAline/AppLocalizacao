import React, {useState, useEffect, useRef} from 'react';
import {View, Text} from 'react-native'
import {styles} from '../styles/styles'
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../../../config';
import MapViewDirections from 'react-native-maps-directions';


export default function Mapa(){

    const mapEl =useRef(null);
    const [origin, setOrigin]=useState(null);
    const [destination, setDestination]=useState(null);
    

    useEffect(() => {
        (async function(){
            const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
                let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
                console.log(location);
                setOrigin({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta:0.0000922,
                    longitudeDelta: 0.000421,
                });
            } else {
                throw new Error('Location permission not granted');
            }
        })
    })


    return(
        <View style={styles.servicos}>
            <MapView style={styles.map}
                initialRegion={origin}
                showsUserLocation={true}
                //zoomEnabled={false}
                loadingEnabled={true}
                ref={mapEl}
            >
                {destination && 
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={config.googleApi}
                        strokeWidth={3}
                        onReady={result=>{
                            console.log(result);
                            mapEl.current.fitToCoordinates(
                                result.coordinates,{
                                    edgePadding:{
                                        top:50,
                                        bottom:50,
                                        left:50,
                                        right:50
                                    }
                                }
                            )
                        }}
                    />
                }
            </MapView>

            <View style={styles.search}>
            <GooglePlacesAutocomplete
                placeholder='Para onde vamos ?'
                onPress={(data, details = null) => {
                    //console.log(data, details)
                    setDestination({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        latitudeDelta:0.000922,
                        longitudeDelta: 0.000421,
                    });
                    
                    //console.log(destination)
                }}
                query={{
                    key: config.googleApi,
                    language: 'pt-br',
                }}
                enablePoweredByContainer={false}
                fetchDetails={true}
                styles={{listView:{height:100}}}
            />

            </View>
        </View>
    )
}