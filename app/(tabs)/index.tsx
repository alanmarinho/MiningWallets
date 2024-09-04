import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import ControlCard from '@/components/mining/ControlCard';
import { useState } from 'react';
import ExecutionsCard from '@/components/mining/executionsCard';

interface ExecutionsCardProps {
  executionID: string;
}

export default function TabOneScreen() {
  const [executions, setExecutions] = useState<ExecutionsCardProps[]>([]);
  return (
    <View style={styles.container}>
      <ControlCard />
      <ExecutionsCard executionID="1" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
