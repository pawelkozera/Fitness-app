import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { styles } from "./style";
import { FlatList } from "react-native-gesture-handler";

const DATA = [
    {
        id: '1', 
        title: 'Cardio',
        exercises: [
            { id: '1', name: 'Airborne Workout' },
            { id: '2', name: 'Running' },
            { id: '3', name: 'Cycling' },
            { id: '4', name: 'Jump Rope' },
            { id: '5', name: 'HIIT' }
        ]
    },
    {
        id: '2', 
        title: 'Strength',
        exercises: [
            { id: '1', name: 'Push-Ups' },
            { id: '2', name: 'Pull-Ups' },
            { id: '3', name: 'Squats' },
            { id: '4', name: 'Deadlifts' },
            { id: '5', name: 'Bench Press' }
        ]
    },
    {
        id: '3', 
        title: 'ABS',
        exercises: [
            { id: '1', name: 'Crunches' },
            { id: '2', name: 'Plank' },
            { id: '3', name: 'Russian Twists' },
            { id: '4', name: 'Bicycle Kicks' },
            { id: '5', name: 'Leg Raises' }
        ]
    },
    {
        id: '4', 
        title: 'Stretching',
        exercises: [
            { id: '1', name: 'Hamstring Stretch' },
            { id: '2', name: 'Calf Stretch' },
            { id: '3', name: 'Shoulder Stretch' },
            { id: '4', name: 'Quadriceps Stretch' },
            { id: '5', name: 'Triceps Stretch' }
        ]
    },
];

export function WorkoutDetails({route, navigation }) {
    const {theme} = useTheme();
    const {workoutID} = route.params;
    const selectedWorkout = DATA.find(workout => workout.id === workoutID);

    const renderExerciseItem = ({item}) => (
        <TouchableOpacity style={theme.touchableItem} onPress={() => {}}>
            <Text style={theme.touchableItemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={theme.background}>
            <View style={theme.container}>
                <Text style={styles.title}>Workouts Details</Text>
                <FlatList 
                    data={selectedWorkout?.exercises}
                    renderItem={renderExerciseItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
}
