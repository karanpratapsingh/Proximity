import React, { useContext, useState } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { Header, SearchBar } from '../../layout';
import { ThemeColors } from '../../types';
import { FlatGrid } from 'react-native-super-grid';
import { ListEmptyComponent } from '../../layout';
import MessageCard from './components/MessageCard';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { Typography } from '../../theme';

const { FontWeights, FontSizes } = Typography;

const MessageScreen: React.FC = () => {

  const { theme } = useContext(ThemeContext);
  const [chatSearch, setChatSearch] = useState('');

  return (
    <View style={styles(theme).container}>
      <Header title='Messages' />
      <SearchBar value={chatSearch} onChangeText={setChatSearch} style={styles().chatSearchBar} />
      <FlatGrid
        itemDimension={responsiveWidth(85)}
        showsVerticalScrollIndicator={false}
        items={new Array(10).fill({})}
        ListEmptyComponent={() => <ListEmptyComponent listType='messages' spacing={60} />}
        style={styles().messagesList}
        spacing={20}
        renderItem={({ item, index }) => (
          <MessageCard
            avatar='https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
            handle='@amy_234'
            lastMessage='hey wassup bruh'
            time='now'
          />
        )}
      />
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.base
  },
  chatSearchBar: {
    marginTop: 5,
    marginBottom: 10
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 4
  }
});

export default MessageScreen;