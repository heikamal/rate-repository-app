import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import RepositoryItemContainer from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import React, { useState } from 'react';
import {Picker} from '@react-native-picker/picker';
import theme from '../../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    padding: 10,
  },
  pickerItem: {
    padding: 10,
  },
  headerContainer: {
    padding: 10
  },
  formTextField: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5,
    color: theme.colors.textBoxText,
    backgroundColor: theme.colors.repoItemBackground,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ setOrderBy, setOrderDir, refetch }) => {
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
  return (
    <View style={styles.headerContainer}>
      <TextInput
      onValueChange={(value) => console.log(value)}
      style={styles.formTextField}/>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={sort}
        onValueChange={(itemValue) =>
          sorting(itemValue)
        }
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  )
}

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { setOrderBy, setOrderDir, refetch } = this.props;

    return (<RepositoryListHeader setOrderBy={setOrderBy} setOrderDir={setOrderDir} refetch={refetch} />);
  };

  render() {
  const repositories = this.props.repositories;
  

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  
  return (
    <FlatList
    data={repositoryNodes}
    ItemSeparatorComponent={ItemSeparator}
    ListHeaderComponent={this.renderHeader}
    renderItem={({item}) => (
      <RepositoryItemContainer item={item} singleView={false} />
    )}
    />
    );
  };
}

const RepositoryList = () => {
  const [ orderBy, setOrderBy ] = useState('CREATED_AT');
  const [ orderDir, setOrderDir ] = useState('DESC');
  const [ search, setSearch ] = useState('');

  const { repositories, refetch } = useRepositories({orderBy, orderDir, search});
  
  return <RepositoryListContainer repositories={repositories} setOrderBy={setOrderBy} setOrderDir={setOrderDir} refetch={refetch} />;
};

export default RepositoryList;