import { StyleSheet, Text, View } from "react-native";
import React, { useDebugValue } from "react";
import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";

const _dotcontainer = 25;
const _dotsize = _dotcontainer / 2;
const activedot = "#fff";
const inactivedot = "#ddd";

function Dot({ index, animation }: { index: number; animation: any }) {
  const stylez = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animation?.value,
        [index - 1, index, index + 1],
        [inactivedot, activedot, activedot]
      ),
    };
  });

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: _dotcontainer,
        height: _dotcontainer,
      }}
    >
      <Animated.View
        style={[
          stylez,
          {
            width: _dotsize,
            height: _dotsize,
            borderRadius: _dotcontainer / 2,
          },
        ]}
      />
    </View>
  );
}

function Indecator({ animation }: { animation: SharedValue<number> }) {
  const styless = useAnimatedStyle(() => {
    return {
      width: _dotcontainer + _dotcontainer * animation.value,
    };
  });
  return (
    <Animated.View
      style={[
        {
          width: _dotcontainer,
          height: _dotcontainer,
          borderRadius: _dotcontainer / 2,
          backgroundColor: "#036bfb",
          position: "absolute",
          left: 0,
        },
        styless,
      ]}
    />
  );
}

const Pagination = ({
  total,
  selectedIndex,
}: {
  total: number;
  selectedIndex: number;
}) => {
  const animation = useDerivedValue(() => {
    return withSpring(selectedIndex, {
      damping: 80,
      stiffness: 200,
    });
  });

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBlock: 20,
        gap: 10,
      }}
    >
      <View style={{ flexDirection: "row"}}>
        <Indecator animation={animation} />
        {[...Array(total)].map((_, index) => (
          <Dot index={index} key={index} animation={animation} />
        ))}
      </View>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({});
