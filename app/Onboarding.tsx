import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import Animated, {
  AnimatedProps,
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInUp,
  FadeOutDown,
  FadeOutLeft,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";
import Pagination from "./components/Pagination";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const _spacing = 8;
const _buttonHeight = 42;
const _layout = LinearTransition.springify().damping(80).stiffness(200);
function Button({ children, style, ...rest }: AnimatedProps<PressableProps>) {
  return (
    <AnimatedPressable
      style={[
        {
          height: _buttonHeight,
          borderRadius: _buttonHeight / 2,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: _spacing * 2,
        },
        style,
      ]}
      entering={FadeInLeft.springify().damping(80).stiffness(200)}
      exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
      layout={_layout}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
}

const Onboarding = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const total = 4;
  return (
    <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 10 }}>
      <Pagination total={total} selectedIndex={selectedIndex} />

      <View style={{ flexDirection: "row" }}>
        {selectedIndex > 0 && (
          <Button
            style={{ backgroundColor: "#ddd" }}
            onPress={() => {
              if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
            }}
          >
            <Text>Back</Text>
          </Button>
        )}
        <Button
          style={{ backgroundColor: "#036bfb", flex: 1 }}
          onPress={() => {
            if (selectedIndex === total - 1) return;
            setSelectedIndex(selectedIndex + 1);
          }}
        >
          {selectedIndex === total - 1 ? (
            <Animated.Text
              key={"finish"}
              style={{ color: "#FFF" }}
              entering={FadeInDown.springify().damping(80).stiffness(200)}
              exiting={FadeOutUp.springify().damping(80).stiffness(200)}
            >
              Finish
            </Animated.Text>
          ) : (
            <Animated.Text
              key={"continue"}
              style={{ color: "#FFF" }}
              entering={FadeInDown.springify().damping(80).stiffness(200)}
              exiting={FadeOutUp.springify().damping(80).stiffness(200)}
              layout={_layout}
            >
              Continue
            </Animated.Text>
          )}
        </Button>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
