import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from "react-native";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";

const opcionesComplejo = [
    { label: "Movie Montevideo", value: "montevideo" },
    { label: "Movie Portones", value: "portones" },
    { label: "Movie Punta Carretas", value: "puntacarretas" },
    { label: "Movie Nuevocentro", value: "nuevocentro" },
  ];

export default function Header({onSelectComplejo}) {
  const [selectedOption, setSelectedOption] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    
    const handleSelect = (option) => {
        setSelectedOption(option);
        setShowOptions(false);
        if (onSelectComplejo) {
          onSelectComplejo(option.label); // Llama a la función pasada como prop
        }
      };

  return (
    <View style={styles.headerContainer}>
      {/* Ícono dropdown (izquierda) */}
      <View>
        <TouchableOpacity
          onPress={() => setShowOptions(!showOptions)}
          style={styles.iconButton}
        >
          <AntDesign
            name={showOptions ? "caretup" : "caretdown"}
            size={24}
            color="white"
          />
          <Text style={styles.optionSelected}>
            {selectedOption ? selectedOption.label : "Seleccionar complejo"}
          </Text>
              </TouchableOpacity>
              
      {/* Opciones desplegables */}
      {showOptions && (
          <View style={styles.dropdown}>
            {opcionesComplejo.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleSelect(option)}
                style={styles.dropdownOption}
              >
                <Text style={styles.dropdownText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Logo centrado */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/movie-logo.jpg")}
          style={styles.logo}
          contentFit="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 80, // Altura del header
    paddingHorizontal: 16,
    position: "relative",
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    zIndex: 2,
  },
  optionSelected: {
    color: "white",
    marginLeft: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  optionText: {
    color: "white",
    marginLeft: 5,
    fontSize: 14,
  },
  dropdown: {
    position: "absolute",
    top: 50,
    backgroundColor: "black",
    borderRadius: 8,
    paddingVertical: 5,
    width: 200,
    zIndex: 10,
  },
  dropdownOption: {
    padding: 10,
  },
  dropdownText: {
    color: "white",
    fontSize: 16,
  },
  logo: {
    width: 120,
    height: 40,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
});
