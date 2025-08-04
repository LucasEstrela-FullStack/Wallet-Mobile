import { Image } from "expo-image";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{color: "blue" }}>Edit app/index.tsx to edit this screen.</Text>
      <Link href={"/about"}>About</Link>

      <Image 
      source={{ uri: "https://plus.unsplash.com/premium_photo-1664194583917-b0ba07c4ce2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVjbGFkb3xlbnwwfHwwfHx8MA%3D%3D"}}
      style={{width: 100, height: 100 }}
      />
    </View>
  );
}
