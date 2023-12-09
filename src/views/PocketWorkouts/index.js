import { useTheme } from "../../context/ThemeContext";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { styles } from "./style";
import { TouchableOpacity, View, Text, SafeAreaView } from "react-native";

const DATA = [
    {
        id: '1', 
        title: 'Cardio',
    },
    {
        id: '2', 
        title: 'Strengh',
    },
    {
        id: '3', 
        title: 'ABS',
    },
    {
        id: '4', 
        title: 'Stretching',
    },
];


export function PocketWorkouts({ navigation }) {
    const {theme} = useTheme();

    const Item = ({id, title}) => (
        <TouchableOpacity style={theme.touchableItem} onPress={() => console.log(id)}>
            <Text style={theme.touchableItemText}>{title}</Text>
        </TouchableOpacity>
      );

    return (
        <SafeAreaView style={theme.background}>
            <View style={theme.container}>
            <Text style={styles.title}>Select Workouts</Text>
            <FlatList
                data={DATA}
                renderItem={({item}) => <Item id={item.id} title={item.title} />}
                keyExtractor={item => item.id}
            />
            </View>
        </SafeAreaView>
    );
}
