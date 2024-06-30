import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const SeatAllocationScreen = () => {
  const [seats, setSeats] = useState(Array.from({ length: 36 }, (_, i) => ({ id: (i + 1).toString(), allocated: false })));

  const toggleSeatAllocation = (id) => {
    setSeats(seats.map(seat =>
      seat.id === id ? { ...seat, allocated: !seat.allocated } : seat
    ));
  };

  const renderSeat = (seat) => (
    <TouchableOpacity
      key={seat.id}
      style={[styles.seat, seat.allocated ? styles.allocatedSeat : styles.unallocatedSeat]}
      onPress={() => toggleSeatAllocation(seat.id)}
    >
      <Text style={styles.seatText}>{seat.id}</Text>
    </TouchableOpacity>
  );

  const renderRow = (rowSeats) => (
    <View key={rowSeats[0].id} style={styles.row}>
      <View style={styles.side}>{rowSeats.slice(0, 2).map(renderSeat)}</View>
      <View style={styles.aisle}></View>
      <View style={styles.side}>{rowSeats.slice(2, 4).map(renderSeat)}</View>
    </View>
  );

  const rows = [];
  for (let i = 0; i < seats.length; i += 4) {
    rows.push(seats.slice(i, i + 4));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seat Allocation Screen</Text>
      <View style={styles.bus}>
        {rows.map(renderRow)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bus: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  side: {
    flexDirection: 'row',
  },
  aisle: {
    width: 30,
  },
  seat: {
    width: 50,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  allocatedSeat: {
    backgroundColor: 'red',
  },
  unallocatedSeat: {
    backgroundColor: 'green',
  },
  seatText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SeatAllocationScreen;
