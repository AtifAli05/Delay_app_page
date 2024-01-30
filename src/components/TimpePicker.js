import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';



const TimeDropdown = ({ label, selectedValue, onValueChange,placeholder }) => {
    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
          for (let minute = 0; minute < 60; minute += 15) {
            const hourFormatted = hour < 10 ? `0${hour}` : hour.toString();
            const minuteFormatted = minute < 10 ? `0${minute}` : minute.toString();
            options.push({ label: `${hourFormatted}:${minuteFormatted}`, value: `${hourFormatted}:${minuteFormatted}` });
          }
        }
        return options;
      };
  const timeOptions = generateTimeOptions();

  return (
    <View>
      {label && <Text style={{ fontSize: 18 }}>{label}</Text>}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={timeOptions}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={selectedValue}
        onChange={item => onValueChange(item.value)}
      />
    </View>
  );
};

// Add styles for your dropdown here
const styles = StyleSheet.create({
    main:{

    },
    dropdown: {
      marginVertical:8,
      height: 48,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      borderRadius:10,
      elevation: 2,
    },
    icon: {
      marginRight: 5,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

export default TimeDropdown;
