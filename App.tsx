/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { RealmContext, Task } from './models/Task';
import { BSON } from 'realm';

const {useQuery, useRealm} = RealmContext;

function App(): React.JSX.Element {

  const realm = useRealm();
  const tasks = useQuery(Task);

  const addTask = useCallback(() => {
    realm.write(() => {
      realm.create(
        'Task',
        {
          _id: new BSON.ObjectId(),
          title: 'walk the dog',
          description: 'hehehehehehehe',
        }
      )
    });

    console.log(realm.path);
  }, [realm]);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(Task));
    })
  }, [realm])

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={tasks}
        renderItem={({item}) => <Text>{`${item.title} - ${item.description}`}</Text>}
      />

      <TouchableOpacity
        style={{backgroundColor: 'green'}}
        onPress={addTask}
      >
        <Text>New Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
