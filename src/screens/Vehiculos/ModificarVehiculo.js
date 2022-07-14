import React from 'react'
import { useState} from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native'
import InputText from '../../componentes/InputText'
import Button from '../../componentes/Button'

const ModificarVehiculo = () => {
  const [matricula, setMatricula] = useState('');
  const [marca, setMarca] = useState('');
  const [color, setColor] = useState('');
  const [serial, setSerial] = useState('');
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={styles.generalView}>
            <View style={styles.line}>
              <Text style={styles.texto}>Matricula</Text>
              <InputText 
                style={styles.input}
                placeholder="Matricula"
                onChangeText={(text) => setMatricula(text.trim())}    
              />
            </View>
            <View style={styles.line}>
              <Text style={styles.texto}>Marca</Text>
              <InputText 
                style={styles.input}
                placeholder="Marca"
                onChangeText={(text) => setMarca(text.trim())}    
              />
            </View>
            <View style={styles.line}>
              <Text style={styles.texto}>Color</Text>
              <InputText 
                style={styles.input}
                placeholder="Color"
                onChangeText={(text) => setColor(text.trim())}    
              />
            </View>
            <View style={styles.line}>
              <Text style={styles.texto}>Serial</Text>
              <InputText 
                style={styles.input}
                placeholder="Serial"
                onChangeText={(text) => setSerial(text.trim())}    
              />
            </View>
            <Button 
               style={styles.button}
               title="Modificar"
               btnColor="#FF0000"
               customPress={() => Alert.alert(`Matricula:${matricula} ${marca} ${color} ${serial}`)}
            />
          </View>
        </View>
    </SafeAreaView>
  )
}

export default ModificarVehiculo

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
  },
  generalView: {
    flex: 1,
  },
  button: {
    width: 200, 
    height: 80,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  texto: {
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
    fontSize: 20,
    color: 'black',
  },
  input: {
    width: 200, 
    height: 40,
  },
  button: {
    width: 200, 
    height: 80,
  },
})