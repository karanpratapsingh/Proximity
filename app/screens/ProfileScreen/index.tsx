import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { Header } from '../../layout';
import { ThemeColors } from '../../types';
import { Typography } from '../../theme';
import Feather from 'react-native-vector-icons/Feather';
import ProfileCard from './components/ProfileCard';
import { FlatGrid } from 'react-native-super-grid';

const { IconSizes } = Typography;

const ProfileScreen: React.FC = () => {

  const { theme } = useContext(ThemeContext);
  const items = [
    { name: 'TURQUOISE', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
    { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
    { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
    { name: 'NEPHRITIS', code: '#27ae60' }, { name: 'BELIZE HOLE', code: '#2980b9' },
    { name: 'WISTERIA', code: '#8e44ad' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
    { name: 'SUN FLOWER', code: '#f1c40f' }, { name: 'CARROT', code: '#e67e22' },
    { name: 'ALIZARIN', code: '#e74c3c' }, { name: 'CLOUDS', code: '#ecf0f1' },
    { name: 'CONCRETE', code: '#95a5a6' }, { name: 'ORANGE', code: '#f39c12' },
    { name: 'PUMPKIN', code: '#d35400' }, { name: 'POMEGRANATE', code: '#c0392b' },
    { name: 'SILVER', code: '#bdc3c7' }, { name: 'ASBESTOS', code: '#7f8c8d' },
  ];

  return (
    <View style={styles(theme).container}>
      <Header
        title='My Profile'
        IconRight={() => <Feather name='settings' size={IconSizes.x7} color={theme.text01} />}
      />
      
      <ProfileScreen />

      <FlatGrid
        // ListHeaderComponent={() => <ProfileScreen />}
        itemDimension={120}
        items={items}
        style={styles().gridView}
        showsVerticalScrollIndicator={false}
        // fixed
        // staticDimension={300}
        // fixed
        // spacing={20}
        renderItem={({ item, index }) => (
          <View style={[styles().itemContainer, { backgroundColor: item.code }]}>
            <Text style={styles().itemName}>{item.name}</Text>
            <Text style={styles().itemCode}>{item.code}</Text>
          </View>
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
  gridView: {
    // marginTop: 20,
    // alignSelf: 'center',
    // backgroundColor: 'red',
    flex: 1,
    marginHorizontal: 10
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});

export default ProfileScreen;