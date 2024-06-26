import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { blurhash } from '../Context/assests';
import { Image } from 'expo-image';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '../firebase/config';
import { useAuth } from '../Context/authContext';

export default function Profile() {
          const navigation = useNavigation();
          const { user } = useAuth();
          const [profile , setProfile] = useState(['']);
          const getUser = async () => {
            const q = query(usersRef, where('userId', '==', user?.uid));
            const querySnapshot = await getDocs(q);
            let data = [];
            querySnapshot.forEach(doc => {
              data.push({ ...doc.data() });
            });
            setProfile(data[0]); 
          };
              useEffect(()=>{
                if(user?.uid){
                  getUser();
                }
                  
              },[user?.uid]);
  return (

          <View className='flex-1 bg-sky-600'>
          <View className='mb-5 justify-between flex-row w-[100%] h-24 px-5 items-center pt-10'>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={25} color="white" />
            </TouchableOpacity>
           <Text className='mx-4 text-2xl text-white font-medium'>Profile</Text>
          </View>
          <View className=' bg-slate-100 m-3 rounded-[30px] justify-center items-center'>
          <Image
                    className='my-10'
                    style={{ height: heightPercentageToDP(16), aspectRatio: 1, borderRadius: 100 }}
                    source={{uri:profile?.imageUrl}}
                    placeholder={{ blurhash }}
                    contentFit="cover"
                    transition={500}
                  />
          <View className='mb-6 w-[75%] '>
                    <View className='flex-row'> 
                    <Text className='text-2xl font-normal'>Name: </Text>
                    <Text className='text-3xl font-semibold'>{profile?.name}</Text>
                    </View>
                    <View className=''>
                    <Text className='text-2xl font-medium'>Email: {profile?.email}</Text>
                    </View> 
          </View>
          </View>
        </View>
  )
}