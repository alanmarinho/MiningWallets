import Colors from '@/constants/Colors';
import { Text, View } from 'react-native';
import test from '@/utils/getData';
interface ExecutionsCardProps {
  executionID: string;
}

export default function ExecutionsCard(executionID: ExecutionsCardProps) {
  return (
    // <View style={{ backgroundColor: '#c2f970' }}>
    <View style={{ backgroundColor: '#721121', marginTop: 20, padding: 15 }}>
      <Text style={{ color: Colors.dark.text }}>ExecutionsCard</Text>
      <Text style={{ color: Colors.dark.text }} onPress={test}>
        print
      </Text>
    </View>
  );
}
