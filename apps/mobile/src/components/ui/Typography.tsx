import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface Props extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
  weight?: 'normal' | 'semibold' | 'bold' | 'black';
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
}

export const Typography: React.FC<Props> = ({
  variant = 'body',
  weight = 'normal',
  color,
  textAlign = 'left',
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const defaultColor = isDark ? '#FAF8FF' : '#111827';
  const mutedColor = isDark ? '#94A3B8' : '#64748B';

  const getVariantStyle = () => {
    switch (variant) {
      case 'h1': return styles.h1;
      case 'h2': return styles.h2;
      case 'h3': return styles.h3;
      case 'caption': return styles.caption;
      case 'label': return styles.label;
      default: return styles.body;
    }
  };

  const getWeightStyle = () => {
    switch (weight) {
      case 'semibold': return styles.semibold;
      case 'bold': return styles.bold;
      case 'black': return styles.black;
      default: return styles.normal;
    }
  };

  return (
    <Text
      style={[
        getVariantStyle(),
        getWeightStyle(),
        { color: color || (variant === 'caption' ? mutedColor : defaultColor), textAlign },
        style
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: { fontSize: 32, lineHeight: 40 },
  h2: { fontSize: 24, lineHeight: 32 },
  h3: { fontSize: 20, lineHeight: 28 },
  body: { fontSize: 16, lineHeight: 24 },
  caption: { fontSize: 14, lineHeight: 20 },
  label: { fontSize: 12, lineHeight: 16, textTransform: 'uppercase', letterSpacing: 1 },
  normal: { fontWeight: '400' },
  semibold: { fontWeight: '600' },
  bold: { fontWeight: '700' },
  black: { fontWeight: '900' },
});
