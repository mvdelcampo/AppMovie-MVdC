import { Stack } from "expo-router";
import Header from "../components/Header";

export default function RootLayout() {
  return <Stack
  screenOptions={{
    headerShown: false, // <<< esto oculta el header automático
  }}/>;
}
