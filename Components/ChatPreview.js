import { View, Text, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import ChatList from './ChatList';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useAuth } from '../Context/authContext';
import { getDocs, query, where } from 'firebase/firestore';
import {usersRef} from '../firebase/config'


export default function ChatPreview({profile}) {
          const { user } = useAuth();
          const [users, setUsers] = useState([]);
          const getUsers = async()=>{
            const q = query(usersRef, where('userId','!=',user?.uid));
            const qureySnapshot = await getDocs(q);
              let data = [];
              qureySnapshot.forEach(doc=>{
                data.push({...doc.data()});
              });
              setUsers(data);
          }
          useEffect(()=>{
            if(user?.uid){
              getUsers();
            }
              
          },[user?.uid])

  return (
    <View className='flex-1 bg-white pl-3 '>
      <StatusBar style='light'/>
        {
          users.length>0? (
            <ChatList users={users} profile={profile}/>
          ):(
            <View className='flex items-center' style={{top: heightPercentageToDP(30)}}>
              <ActivityIndicator size='large'/>
            </View>
          )
        }
    </View>
  )
}