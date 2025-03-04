import { View, Text, TextInput, TouchableOpacity, KeyboardTypeOptions } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; // To use a password toggle icon

interface FormFieldProps {
    title: string;
    value: string;  // Updated the type to `string` instead of `any`
    handleChangeText: (text: string) => void;
    otherStyle?: string;
    placeholder: string;
    keyboardType: KeyboardTypeOptions; // Update the type to `KeyboardTypeOptions`
}

const FormField: React.FC<FormFieldProps> = ({ title, value, handleChangeText, otherStyle, placeholder, keyboardType }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <View className={`space-y-4 ${otherStyle}`}>
            <Text className="text-base text-gray-100 mb-3 font-pmedium">{title}</Text>
            <View
                className={`border-2 w-full h-16 px-4  bg-black-100 rounded-2xl ${isFocused ? 'border-secondary' : 'border-black-200'} flex-row items-center`}
            >
                <TextInput
                    style={{
                        flex: 1,
                        color: 'white',
                        fontWeight: '600',
                        fontSize: 16,
                    }}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    keyboardType={keyboardType} // Add this line
                />
                {title === "Password" && (
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <Ionicons
                            name={showPassword ? "eye-off" : "eye"}
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;
