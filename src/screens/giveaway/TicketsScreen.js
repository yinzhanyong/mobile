import { useNetInfo } from '@react-native-community/netinfo';
import { format } from 'date-fns';
import React, { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { selectorFamily, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';
import { ticketsRefreshState } from '../../Atoms';
import LoadingComponent from '../../components/LoadingComponent';
import PressableCard from '../../components/PressableCard';
import { convertMojoToChia } from '../../utils/Formatting';
import { getRound, getTickets } from '../../Api';
import CustomCard from '../../components/CustomCard';

const HEIGHT = 40;

const useRefresh = () => {
  const setRequestId = useSetRecoilState(ticketsRefreshState());
  return () => setRequestId((id) => id + 1);
};

const query = selectorFamily({
  key: 'farmerTickets',
  get:
    (launcherId) =>
    async ({ get }) => {
      get(ticketsRefreshState());
      const response = await getTickets(launcherId);
      if (response.error) {
        throw response.error;
      }
      return response;
    },
});

const Item = ({ item, theme, t }) => (
  <CustomCard
    style={{ display: 'flex', flexDirection: 'column', padding: 8, flex: 1 }}
    onTap={() => {}}
  >
    <View style={{ display: 'flex', flexDirection: 'row', flex: 1, alignItems: 'center' }}>
      <Text style={[styles.title, { color: theme.colors.textGrey }]}>{t('ticketNumber')}</Text>
      <Text style={[styles.val, { fontWeight: 'bold' }]}>{item}</Text>
    </View>
  </CustomCard>
);

const Content = ({ navigation, dataProvider, theme, t, width }) => {
  const [layoutProvider] = React.useState(
    new LayoutProvider(
      (index) => 0,
      (type, dim) => {
        dim.width = width;
        dim.height = HEIGHT + 8;
      }
    )
  );

  const rowRenderer = (type, data) => <Item theme={theme} t={t} item={data} />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RecyclerListView
        // forceNonDeterministicRendering
        rowRenderer={rowRenderer}
        dataProvider={dataProvider}
        layoutProvider={layoutProvider}
        contentContainerStyle={{ marginTop: 6, paddingBottom: 14 }}
      />
    </SafeAreaView>
  );
};

const TicketsScreen = ({ navigation, launcherId }) => {
  const ticketsLoadable = useRecoilValueLoadable(query(launcherId));
  const netInfo = useNetInfo();
  const refresh = useRefresh();
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();
  // const [dataProvider, setDataProvider] = useState();
  const { width } = Dimensions.get('window');

  // useEffect(() => {
  //   console.log('called');
  //   if (ticketsLoadable.state === 'hasValue') {
  //     setDataProvider(
  // new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
  //   ticketsLoadable.contents.results[0].tickets
  //       )
  //     );
  //   }
  // }, [ticketsLoadable]);

  if (ticketsLoadable.state === 'hasError') {
    return (
      <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text style={{ fontSize: 20, textAlign: 'center', paddingBottom: 16 }}>
          Cant Connect to Network
        </Text>
        <Button
          mode="contained"
          onPress={() => {
            if (netInfo.isConnected) refresh();
          }}
        >
          Retry
        </Button>
      </SafeAreaView>
    );
  }

  if (ticketsLoadable.state === 'loading' && !refreshing) {
    return <LoadingComponent />;
  }

  const dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
    ticketsLoadable.contents.results[0].tickets
  );

  console.log(ticketsLoadable.contents.results);

  // console.log(ticketsLoadable.contents.results[0].tickets);

  return (
    <Content
      navigation={navigation}
      dataProvider={dataProvider}
      t={t}
      theme={theme}
      width={width}
    />
  );
  // return (
  //   <Suspense fallback={<LoadingComponent />}>
  //     <Content launcherId={launcherId} />
  //   </Suspense>
  // );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    marginEnd: 8,
  },
  val: {
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },
});

export default TicketsScreen;
