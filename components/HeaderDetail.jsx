import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

export default function HeaderDetail() {
  const router = useRouter();

  return (
    <View style={styles.headerContainer}>
      {/* Botón para volver atrás */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <AntDesign name="arrowleft" size={28} color="white" />
      </TouchableOpacity>

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
    alignItems: "center",
    height: 80,
    paddingHorizontal: 16,
    position: "relative",
  },
  backButton: {
    padding: 10,
    zIndex: 2,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    marginRight: 30, // Para compensar el espacio del botón de volver
  },
  logo: {
    width: 120,
    height: 40,
  },
});
