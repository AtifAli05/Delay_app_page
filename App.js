import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import SelectInput from "./src/components/Selecter";
import GenericTextInput from "./src/components/TextInput";
import TimeDropdown from "./src/components/TimpePicker";
import Button from "./src/components/Buttons";
import ImagePicker from "./src/components/ImagePicker";

export default function App() {
  let obj = {
    driverName: "",
    truck: "",
    delayStart: "",
    delayEnd: "",
    issue: "",
    pm: "delay",
    pmFault: "",
    trailer: "",
    trailerFault: "",
    delay: "",
    reason: "",
    comments: "",
    image: [],
  };
  const [selectedFruit, setSelectedFruit] = useState("");
  const [name, setName] = useState("");
  const [form, setForm] = useState(obj);
  const fruitOptions = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Orange", value: "orange" },
    // more options...
  ];
  const issueOptions = [
    { label: "Delay", value: "delay" },
    { label: "Unplanned Maintenance", value: "maintenance" },
  ];
  const truckOptions = [
    { label: "TR0026", value: "tr0026" },
    { label: "TR0027", value: "tr0027" },
    { label: "TR0028", value: "tr0028" },
    { label: "TR0029", value: "tr0029" },
    { label: "TR0041", value: "tr0042" },
  ];
  const pmOptions = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];
  const pmFalutOptions = [
    { label: "Engine", value: "engine" },
    { label: "Tyres", value: "tyres" },
    { label: "Fuel", value: "fuel" },
    { label: "Add Blue", value: "add_blue" },
    { label: "Brakes", value: "brakes" },
  ];
  const trailerFault = [
    { label: "Hub Temprature", value: "hub_temprature" },
    { label: "Tyres", value: "tyres" },
    { label: "Brakes", value: "brakes" },
    { label: "Hydraulics", value: "hydraulics" },
    { label: "Suspension", value: "suspension" },
  ];
  const delayTypesOptions = [
    { label: "Operators", value: "operators" },
    { label: "Environment", value: "environment" },
    { label: "Accident", value: "accident" },
  ];
  const resonOptions = [
    { label: "Driver not available", value: "driver_not_available" },
    { label: "Fatigue", value: "fatigue" },
    { label: "Safety meeting", value: "safety_meeting" },
    { label: "Safety Stand down", value: "safety_stand_down" },
    { label: "Other", value: "other" },
  ];
  const handleFormChange = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };
  const getImageInfo=(value)=>{
    setForm((prevForm) => ({
      ...prevForm,
      image: value,
    }));
  }
  const onSave = () => {
    console.log("im clicked");
  };
  console.log(form.image, "bvbv");
  return (
    <ScrollView style={styles.container}>
      <GenericTextInput
        label="Driver Name"
        value={form.driverName}
        onChangeText={(text) => handleFormChange("driverName", text)}
        placeholder="Enter your name"
      />
      <SelectInput
        label="Truck"
        options={truckOptions}
        selectedValue={form.truck}
        onValueChange={(value) => handleFormChange("truck", value)}
      />
      <TimeDropdown
        placeholder={"start time "}
        label="Delay start"
        selectedValue={form.delayStart}
        onValueChange={(value) => handleFormChange("delayStart", value)}
      />
      <TimeDropdown
        placeholder={"End time  "}
        label="Delay End"
        selectedValue={form.delayEnd}
        onValueChange={(value) => handleFormChange("delayEnd", value)}
      />
      <SelectInput
        label="Issue"
        options={issueOptions}
        selectedValue={form.issue}
        onValueChange={(value) => handleFormChange("issue", value)}
      />
      <SelectInput
        label="PM"
        options={pmOptions}
        selectedValue={form.pm}
        onValueChange={(value) => handleFormChange("pm", value)}
      />
      <SelectInput
        label="Fault"
        options={pmFalutOptions}
        selectedValue={form.pmFault}
        onValueChange={(value) => handleFormChange("pmFault", value)}
      />
      <SelectInput
        label="Trailer"
        options={fruitOptions}
        selectedValue={selectedFruit}
        onValueChange={setSelectedFruit}
      />

      <SelectInput
        label="Fault"
        options={trailerFault}
        selectedValue={form.trailerFault}
        onValueChange={(value) => handleFormChange("trailerFault", value)}
      />

      <SelectInput
        label="Delay"
        options={delayTypesOptions}
        selectedValue={form.delay}
        onValueChange={(value) => handleFormChange("delay", value)}
      />
      <SelectInput
        label="Reason"
        options={resonOptions}
        selectedValue={form.reason}
        onValueChange={(value) => handleFormChange("reason", value)}
      />
      <ImagePicker onPresspasspropsToParent={getImageInfo}/>

      <Text>Comments</Text>
      <TextInput
        multiline={true}
        numberOfLines={10}
        style={styles.comments}
        value={form.comments}
        onChangeText={(text) => handleFormChange("comments", text)}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginVertical: 6,
        }}
      >
        <View style={{ marginRight: 6 }}>
          <Button title={"Save"} color={"#59E659"} onPress={onSave} />
        </View>

        <View>
          <Button title={"Cancel"} color={"#FF474D"} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  comments: {
    height: 90,
    textAlignVertical: "top",
    borderWidth: 0.5,
    fontSize: 15,
    borderRadius: 10,
  },
});
