import {Text, View} from "react-native";


export function Map({ navigation }) {
    const {theme} = useTheme();

    return (
        <View style={theme.background}>
            <View style={theme.container}>
                <Text style={theme.text}>Map</Text>
            </View>
        </View>
    );
}
