import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '@/lib/appWrite';
import "../../global.css"

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in al the  fields')
    }
    setSubmitting(true)
    try {
      const result = await createUser({
        email: form.email,
        password: form.password,
        username: form.username
      })
      
      router.replace('/home')
      
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SafeAreaView className={`bg-primary h-full`}>
      <ScrollView>
        <View className={`w-full justify-center min-h-[83vh] px-4 my-6`}>
          <Image
            source={images.logo}
            resizeMode='contain'
            className={`w-[115px] h-[35px]`}
          />
          <Text className={`text-2xl text-white font-semibold mt-10 font-psemibold`}>
            Sign up to Aora
          </Text>
          <FormField
            title='Username'
            value={form.username}
            handleChangeText={(e: string) => setForm({ ...form, username: e })}
            otherStyle="mt-7"
            placeholder="Enter Your username"
            keyboardType="email-address"
          />
          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyle="mt-7"
            placeholder="Enter Your Email Address"
            keyboardType="email-address"
          />
          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyle="mt-7"
            placeholder="Enter Your Password"
            keyboardType="default"
          />
          <CustomButton
            title="Sign In"
            handlePress={handleSubmit}
            containerStyle='mt-7'
            isLoading={isSubmitting}
          />
          <View className={`justify-center pt-5 flex-row gap-2`}>
            <Text className={`text-lg text-gray-100 font-pregular`}>
              Already have account?
            </Text>
            <Link href={'/sign-in'} className={`text-lg text-secondary font-psemibold`}>Log in</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
