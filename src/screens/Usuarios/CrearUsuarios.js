import React, { Component } from 'react'
import { StyleSheet, View, SafeAreaView, Alert } from 'react-native'
import InputText from '../../componentes/InputText'
import Button from '../../componentes/Button'
import { AñadirUsuario } from '../../database/FuncionesABM'

class CrearUsuarios extends Component {

  state = {
    nombre: '',
    apellido: '',
    ci: ''
  }
  handleInputChange = (inputName, inputValue) => {
    this.setState(state => ({
      ...state,
      [inputName]: inputValue
    }))
  }

  AgregarUsuario = () => {
    const { nombre, apellido, ci } = this.state
    if (nombre === '' || apellido === '' || ci === '') {
      Alert.alert('Error', 'Debe completar todos los campos')
    }
    else {
      if (ci.length !== 8) {
        Alert.alert('Error', 'El CI debe tener 8 dígitos')
      }
      else {
        AñadirUsuario(ci, nombre, apellido)
        this.setState({
          nombre: '',
          apellido: '',
          ci: ''
        })
      }

    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={styles.generalView}>
            <View style={styles.line}>
              <InputText
                style={styles.input}
                placeholder="Nombre"
                value={this.state.nombre}
                onChangeText={(value) => this.handleInputChange('nombre', value)}
              />
            </View>
            <View style={styles.line}>
              <InputText
                style={styles.input}
                placeholder="Apellido"
                value={this.state.apellido}
                onChangeText={(value) => this.handleInputChange('apellido', value)}
              />
            </View>
            <View style={styles.line}>
              <InputText
                style={styles.input}
                placeholder="CI"
                keyboardType="numeric"
                maxLength={8}
                value={this.state.ci}
                onChangeText={(value) => this.handleInputChange('ci', value)}


              />
            </View>
            <Button
              style={styles.button}
              title="Crear"
              btnColor="green"
              btnIcon="user-plus"
              customPress={() => { this.AgregarUsuario() }}
            //
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

export default CrearUsuarios

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
})