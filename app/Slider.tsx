import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Marquee } from "@animatereactnative/marquee";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from "react-native-reanimated";
import { Stagger } from "@animatereactnative/stagger";

const { width } = Dimensions.get("window");
const _itemWhidth = width * 0.62;
const _itemHeight = _itemWhidth * 1.47;
const _spacing = 16;
const _itemSize = _itemWhidth + _spacing;

const Slider = () => {
  const offset = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useAnimatedReaction(
    () => {
      const floatIndex =
        ((offset.value + width / 3) / _itemSize) % images.length;
      return Math.abs(Math.floor(floatIndex));
    },
    (value) => {
      runOnJS(setActiveIndex)(value);
    }
  );
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <View style={[StyleSheet.absoluteFillObject, { opacity: 0.8 }]}>
        <Animated.Image
          key={`image-${activeIndex}`}
          source={{
            uri: images[activeIndex],
          }}
          style={{ flex: 1 }}
          blurRadius={50}
          entering={FadeIn.duration(1000)}
          exiting={FadeOut.duration(1000)}
        />
      </View>
      <Marquee spacing={_spacing} position={offset}>
        <Animated.View
          style={{ flexDirection: "row", gap: _spacing }}
          entering={FadeInUp.delay(500)
            .duration(1000)
            .springify()
            .stiffness(100)
            .damping(50)
            .withInitialValues({
              transform: [{ translateY: -_itemHeight / 2 }],
            })}
        >
          {images.map((image, index) => (
            <Item key={index} image={image} index={index} />
          ))}
        </Animated.View>
      </Marquee>
      <Stagger
        key={"ffff"}
        initialEnteringDelay={500}
        stagger={500}
        duration={500}
      >
        <Text
          style={{
            color: "white",
            fontSize: 25,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 24,
          }}
        >
          Stunning Animated Image Slider
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 15,
            textAlign: "center",
            marginTop: 8,
            paddingHorizontal: 20,
          }}
        >
          Experience seamless and smooth animations as you navigate through this
          beautifully designed image slider. The background dynamically changes
          to match the selected image, creating an immersive and visually
          appealing experience.
        </Text>
      </Stagger>
    </View>
  );
};

const Item = ({ image, index }: { image: string; index: number }) => {
  return (
    <View
      style={{
        width: _itemWhidth,
        height: _itemHeight,
      }}
      key={index}
    >
      <Image source={{ uri: image }} style={{ flex: 1, borderRadius: 16 }} />
    </View>
  );
};

export default Slider;

const images = [
  "https://cdn.dribbble.com/users/1208648/screenshots/6739134/spidey.gif",
  "https://cdn.dribbble.com/userupload/35956587/file/original-8892e054e12cefb10733ea46a72b81ae.png?resize=1024x768&vertical=center",
  "https://cdn.dribbble.com/userupload/10340067/file/original-3c2dd5ce8bab96bcc6f028e9ee12defe.jpg?resize=1024x683&vertical=center",
  "https://cdn.dribbble.com/userupload/17161725/file/original-5176efc2a75d34d1646daa188d20d98b.jpg?resize=1024x768&vertical=center",
  "https://cdn.dribbble.com/userupload/24013892/file/original-64683005aac791d1a3660ecc62aa4f56.png?resize=1024x768&vertical=center",
  "https://cdn.dribbble.com/userupload/29421648/file/original-a999e844d3cd23916a29f55a8254def2.jpg?resize=1024x576&vertical=center",
];
