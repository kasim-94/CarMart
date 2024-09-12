const getItemLayout = (data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });
  
  <FlatList
    data={cars}
    renderItem={renderCarItem}
    getItemLayout={getItemLayout}
    initialNumToRender={10}
    maxToRenderPerBatch={20}
    windowSize={21}
    keyExtractor={(item) => item.id}
  />