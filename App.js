import {StatusBar} from 'expo-status-bar';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import * as Contacts from "expo-contacts";
import {useEffect, useState} from "react";

export default function App() {
    const [contactsList, setContactsList] = useState([]);

    const getContacts = async () => {
        let access = (await Contacts.getPermissionsAsync()).status;
        if (access !== 'granted') {
            access = await Contacts.requestPermissionsAsync();
        }
        if (access === 'granted') {
            const {data} = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers]
            });
            setContactsList(data);
        }
    }

    return (
        <View style={styles.container}>
            <FlatList data={contactsList}
                      renderItem={({item}) =>
                          <Text>{item.name} {item.phoneNumbers.pop().number}</Text>

                      }/>
            <Button title={'Get Contacts'} onPress={getContacts}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: '10%',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
