import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';
import "../../global.css"

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting , setSubmitting] = useState(false)

  const handleSubmit = ()=>{
    console.log(form);
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className={`w-full justify-center min-h-[83vh] px-4 my-6`}>
          <Image
            source={images.logo}
            resizeMode='contain'
            className={`w-[115px] h-[35px]`}
          />
          <Text className={`text-2xl text-white font-semibold mt-10 font-psemibold`}>
            Log in to Aora
          </Text>
          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyle="mt-7"
            placeholder="Enter Your Email Address" keyboardType={'default'}          />
          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyle="mt-7"
            placeholder="Enter Your Password" keyboardType={'default'}          />
          <CustomButton 
            title="Sign In"
            handlePress={handleSubmit}
            containerStyle='mt-7'
            isLoading={isSubmitting}
          />
          <View className={`justify-center pt-5 flex-row gap-2`}>
            <Text className={`text-lg text-gray-100 font-pregular`}>
              Don't have account?
            </Text>
            <Link href={'/sign-up'} className={`text-lg text-secondary font-psemibold`}>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
