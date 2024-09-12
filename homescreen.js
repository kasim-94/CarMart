import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Picker, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useForm, Controller } from 'react-hook-form';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sell Your Car</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('CarDetails')}
      >
        <Text style={styles.buttonText}>Start Valuation</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Appointments')}
      >
        <Text style={styles.buttonText}>My Appointments</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.buttonText}>My Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const CarDetailsForm = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async (data) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      navigation.navigate('ValuationResults', data);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit car details. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Car Details</Text>
      
      <Controller
        control={control}
        rules={{ required: 'Make is required' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Make"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="make"
      />
      {errors.make && <Text style={styles.errorText}>{errors.make.message}</Text>}

      <Controller
        control={control}
        rules={{ required: 'Model is required' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Model"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="model"
      />
      {errors.model && <Text style={styles.errorText}>{errors.model.message}</Text>}

      <Controller
        control={control}
        rules={{ 
          required: 'Year is required',
          pattern: {
            value: /^(19|20)\d{2}$/,
            message: 'Enter a valid year (1900-2099)'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Year"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
          />
        )}
        name="year"
      />
      {errors.year && <Text style={styles.errorText}>{errors.year.message}</Text>}

      <Controller
        control={control}
        rules={{ 
          required: 'Mileage is required',
          pattern: {
            value: /^\d+$/,
            message: 'Enter a valid mileage'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Mileage"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
          />
        )}
        name="mileage"
      />
      {errors.mileage && <Text style={styles.errorText}>{errors.mileage.message}</Text>}

      <Controller
        control={control}
        rules={{ required: 'Condition is required' }}
        render={({ field: { onChange, value } }) => (
          <Picker
            selectedValue={value}
            style={styles.picker}
            onValueChange={onChange}
          >
            <Picker.Item label="Select condition" value="" />
            <Picker.Item label="Excellent" value="Excellent" />
            <Picker.Item label="Good" value="Good" />
            <Picker.Item label="Fair" value="Fair" />
            <Picker.Item label="Poor" value="Poor" />
          </Picker>
        )}
        name="condition"
      />
      {errors.condition && <Text style={styles.errorText}>{errors.condition.message}</Text>}

      <TouchableOpacity 
        style={[styles.button, loading && styles.disabledButton]} 
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Processing...' : 'Get Valuation'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CarDetails" component={CarDetailsForm} />
        {/* Add other screens like ValuationResults, Appointments, and Profile here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  picker: {
    width: '80%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: 5,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default App;
