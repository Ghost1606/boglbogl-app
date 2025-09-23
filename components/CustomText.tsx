import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';

interface CustomTextProps extends TextProps {
  bold?: boolean;
}

const CustomText: React.FC<CustomTextProps> = ({ bold = false, style, ...props }) => {
  return (
    <RNText
      style={[
        styles.defaultText,
        bold && styles.boldText,
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Pretendard-Medium',
  },
  boldText: {
    fontFamily: 'Pretendard-Bold',
  },
});

export default CustomText;
