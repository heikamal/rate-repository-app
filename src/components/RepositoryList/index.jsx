import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItemContainer from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { useState } from 'react';
import {Picker} from '@react-native-picker/picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    padding: 10,
  },
  pickerItem: {
    padding: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, setOrderBy, setOrderDir, refetch }) => {

  const [sort, setSort] = useState('latest');

  const sorting = (value) => {
    console.log(value)
    switch (value) {
      case 'highest':
        setOrderBy('RATING_AVERAGE');
        setOrderDir('DESC');
        setSort('highest');
        break;
      case 'lowest':
        setOrderBy('RATING_AVERAGE');
        setOrderDir('ASC')
        setSort('lowest');
        break;
      default:
        setOrderBy('CREATED_AT');
        setOrderDir('DESC');
        setSort('latest');
    refetch();
    }
    
  }

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  
  return (
    <FlatList
    data={repositoryNodes}
    ItemSeparatorComponent={ItemSeparator}
    ListHeaderComponent={(<View><Picker
      style={styles.picker}
      itemStyle={styles.pickerItem}
      selectedValue={sort}
      onValueChange={(itemValue) =>
        sorting(itemValue)
      }>
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker><ItemSeparator/></View>)}
    renderItem={({item}) => (
      <RepositoryItemContainer item={item} singleView={false} />
    )}
    />
  );
};

const RepositoryList = () => {
  const [ orderBy, setOrderBy ] = useState('CREATED_AT');
  const [ orderDir, setOrderDir ] = useState('DESC');

  const { repositories, refetch } = useRepositories({orderBy, orderDir});
  
  return <RepositoryListContainer repositories={repositories} setOrderBy={setOrderBy} setOrderDir={setOrderDir} refetch={refetch} />;
};

export default RepositoryList;