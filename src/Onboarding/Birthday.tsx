import React, {useState, useRef} from 'react';
import {View, TextInput, Alert, SafeAreaView} from 'react-native';
import Instructions from './_components/Instructions';
import ContinueBtn from './_components/ContinueBtn';
import GradientBackground from './_components/GradientBackground';

function calculateAge(date: string[]) {
  // Reorder the date array to form a date string (YYYY-MM-DD)
  const dateString = `${date[2]}-${date[1]}-${date[0]}`;

  // Create a date object from the dateString
  const birthDate = new Date(dateString);

  // Get today's date
  const today = new Date();

  // Calculate age
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth() + 1; // Adjusting month index

  // Adjust age if this year's birthday has not occurred yet
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

function Birthday({navigation}: any) {
  const [date, setDate] = useState<string[]>(new Array(3).fill(''));
  const [valid, setValid] = useState(false);

  const inputs = useRef<(TextInput | null)[]>(new Array(3).fill(null));

  const handleInput = (text: string, index: number) => {
    const newDate = [...date];
    newDate[index] = text;

    // Common validation for all fields
    if (text.length > 0 && isNaN(parseInt(text))) {
      Alert.alert('Error', 'Only numbers are allowed!');
      // Clear the field
      newDate[index] = '';
      setDate(newDate);
      return; // If not a number, ignore input
    }

    // Validate Day
    if (index === 0) {
      const day = parseInt(text);
      if ((text.length === 2 && (day < 1 || day > 31)) || text.length > 2) {
        Alert.alert('Error', 'Days must be between 1 and 31!');
        // Clear the DD field
        newDate[index] = '';
        setDate(newDate);
        return; // Invalid day, ignore input
      }
    }

    // Validate Month
    if (index === 1) {
      const month = parseInt(text);
      if ((text.length === 2 && (month < 1 || month > 12)) || text.length > 2) {
        Alert.alert('Error', 'Months must be between 1 and 12!');
        // Clear the MM field
        newDate[index] = '';
        setDate(newDate);
        return; // Invalid month, ignore input
      }
    }

    // Validate Year
    if (index === 2) {
      const currentYear = new Date().getFullYear();
      const year = parseInt(text);
      if (
        (text.length === 4 &&
          (year < currentYear - 100 || year > currentYear)) ||
        text.length > 4
      ) {
        Alert.alert('Error', `Year must be after ${currentYear - 100}`);
        // Clear the YYYY field
        newDate[index] = '';
        setDate(newDate);
        return; // Invalid year, ignore input
      }
    }

    setDate(newDate);

    // Check if date is valid
    if (
      newDate[0].length === 2 &&
      newDate[1].length === 2 &&
      newDate[2].length === 4
    ) {
      setValid(true);
    } else {
      setValid(false);
    }

    // Move to next field if the current input is filled
    if (text.length === (index === 2 ? 4 : 2) && index < 2) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    const newDate = [...date];

    if (newDate[index].length === 0 && index > 0) {
      // If current field is empty, clear the last digit of the previous field
      newDate[index - 1] = newDate[index - 1].slice(0, -1);
      setDate(newDate);
      inputs.current[index - 1]?.focus();
    } else {
      // If current field is not empty, clear only the last digit
      newDate[index] = newDate[index].slice(0, -1);
      setDate(newDate);
    }
  };

  return (
    <GradientBackground>
        <View className="flex-1 justify-between p-4">
          <View className="space-y-6">
            <Instructions
              progress={0}
              title="Birthday"
              info="Your age will be displayed to everyone."
            />

            <View className="w-full space-y-14">
              <View className="flex-row gap-x-2">
                {date.map((val, index) => {
                  if (index === 2) {
                    return (
                      <TextInput
                        key={index}
                        className="px-8 py-4 border-2 border-gray-300 rounded-lg text-center text-2xl font-semibold text-gray-700"
                        keyboardType="number-pad"
                        maxLength={4}
                        onChangeText={text => handleInput(text, index)}
                        onKeyPress={({nativeEvent}) => {
                          if (nativeEvent.key === 'Backspace') {
                            handleBackspace(index);
                          }
                        }}
                        placeholder="YYYY"
                        value={val}
                        ref={ref => {
                          inputs.current[index] = ref;
                        }}
                      />
                    );
                  }
                  return (
                    <TextInput
                      key={index}
                      className="px-4 py-4 border-2 border-gray-300 rounded-lg text-center text-2xl font-semibold text-gray-700"
                      keyboardType="number-pad"
                      maxLength={2}
                      onChangeText={text => handleInput(text, index)}
                      onKeyPress={({nativeEvent}) => {
                        if (nativeEvent.key === 'Backspace') {
                          handleBackspace(index);
                        }
                      }}
                      placeholder={index === 0 ? 'DD' : 'MM'}
                      value={val}
                      ref={ref => {
                        inputs.current[index] = ref;
                      }}
                      autoFocus={index === 0}
                    />
                  );
                })}
              </View>
            </View>
          </View>

          {/* Buttons */}
          <ContinueBtn
            navigation={navigation}
            valid={valid}
            navigateTo="Name"
            data={{
              dateOfBirth: new Date(
                parseInt(date[2]),
                parseInt(date[1]) - 1,
                parseInt(date[0]),
              ).toLocaleDateString('en-GB'),
            }}
            alertTitle={`Are you ${calculateAge(date)} years old?`}
            alertMessage="Please double-check as this cannot be changed later."
          />
        </View>
    </GradientBackground>
  );
}

export default Birthday;
