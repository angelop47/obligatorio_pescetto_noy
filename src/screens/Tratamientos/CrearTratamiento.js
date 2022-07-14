import React from 'react'
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, Modal, FlatList } from 'react-native'
import InputText from '../../componentes/InputText'
import Button from '../../componentes/Button'
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AñadirTratamiento } from '../../database/FuncionesABM'
import DatabaseConnection from '../../database/database-connection';
const db = DatabaseConnection.getConnection();

const CrearTratamiento = ({ navigation }) => {
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [listaVehiculos, setListaVehiculos] = useState([]);
  const [usuario, setUsuario] = useState('');
  const [vehiculo, setVehiculo] = useState('');
  const [tratamiento, setTratamiento] = useState('');
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM usuarios`, [], (tx, results) => {
        if (results.rows.length > 0) {
          let temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i).usuarioCI + " - " + results.rows.item(i).usuarioNombre + " " + results.rows.item(i).usuarioApellido);
          setListaUsuarios(temp);
        }
      });
    });
    let vehiculos = [];
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM vehiculos`, [], (tx, results) => {
        if (results.rows.length > 0) {
          let temp = [];
          let vehiculo
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          temp.map((unVehiculo) => {
            vehiculo = {
              matricula: unVehiculo.matricula,
              marca: unVehiculo.marca,
              color: unVehiculo.color,
              serial: unVehiculo.serial,
              usuarioCI: unVehiculo.usuarioCI
            }
            vehiculos.push(vehiculo);
            setVehiculos(vehiculos);
          })
        }
      });
    });
  }, [])
  function CargoUsuario(pUsuario) {
    let auxCi = pUsuario.substring(0, 8);
    setUsuario(pUsuario);
    let auxVehiculos = [];
    vehiculos.map(item => {
      if (item.usuarioCI == auxCi) {
        auxVehiculos.push(item.matricula);
      }
    });
    setListaVehiculos(auxVehiculos);
    setModalVisible(false);
  }
  function CargoTratamiento() {
    if (tratamiento === '') {
      Alert.alert('Error', 'Debe agregar un tratamiento');
    }
    else {
      let fecha = new Date();
      let fechaString = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
      console.log(vehiculo, tratamiento, fechaString);
      AñadirTratamiento(vehiculo, tratamiento, fechaString, "-", 0, 0);
      navigation.navigate('Inicio');
    }

  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              navigation.navigate('Inicio');
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.line}>
                  <SelectDropdown
                    style={styles.selectDropdown}
                    data={listaUsuarios}
                    onSelect={(selectedItem) => {
                      setUsuario(selectedItem);
                    }}
                    defaultButtonText={'Usuario'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={isOpened => {
                      return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                    selectedRowStyle={styles.dropdown1SelectedRowStyle}
                    search
                    searchInputStyle={styles.dropdown1searchInputStyleStyle}
                    searchPlaceHolder={'Buscar aqui...'}
                    searchPlaceHolderColor={'darkgrey'}
                    renderSearchInputLeftIcon={() => {
                      return <FontAwesome name={'search'} color={'#444'} size={18} />;
                    }}
                  />
                </View>
                <Button
                  style={styles.button}
                  title="Cargar"
                  btnColor="green"
                  customPress={() => CargoUsuario(usuario)}
                />
              </View>
            </View>
          </Modal>
          <Text style={styles.texto}>{usuario}</Text>
          <View style={styles.line}>
            <SelectDropdown
              data={listaVehiculos}
              onSelect={(selectedItem, index) => {
                setVehiculo(selectedItem);
              }}
            />
          </View>
          <View style={styles.line}>
            <InputText
              style={styles.input}
              placeholder="Tratamiento"
              onChangeText={(text) => setTratamiento(text)}
            />
          </View>
          <Button
            style={styles.button}
            title="Crear"
            btnColor="green"
            customPress={() => CargoTratamiento()}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default CrearTratamiento

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
    width: 120,
    height: 60,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
})