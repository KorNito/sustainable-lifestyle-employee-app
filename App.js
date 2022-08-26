import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // const completeChallenge = (points, user) => {
  //   let userRef = doc(db, "users", user);

  //   const data = getDoc(userRef);
  //   setUserInfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

  //   alert(userInfo);
  //   // let userData = { points: points, totalPoints: points };

  //   // updateDoc(userRef, userData);
  // };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    let username, points, qrCodeData;

    qrCodeData = data.split(" ");

    username = qrCodeData[0];
    points = qrCodeData[1];

    if (points > 0) {
      // alert(`Challenge completed. Added ${points} points to ${username}`);
      // completeChallenge(points, user);
    } else {
      alert(`Reward claimed. Removed ${points * -1} points from ${username}`);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
