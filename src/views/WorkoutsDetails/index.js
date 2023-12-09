import { View, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";




export function WorkoutsDetails({ navigation }) {
    const {theme} = useTheme();

    return (
        <View style={theme.background}>
            <View style={theme.container}>
            <Text style={{}}>Workouts Details</Text>
            </View>
        </View>
    );
}
