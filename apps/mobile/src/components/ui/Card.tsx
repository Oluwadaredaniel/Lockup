import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface Props extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'flat';
  padding?: number;
}

export const Card: React.FC<Props> = ({
  variant = 'elevated',
  padding = 24,
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const bgColor = isDark ? '#0F172A' : '#FFFFFF';
  const borderColor = isDark ? '#1E293B' : '#E2E8F0';

  const getVariantStyle = () => {
    switch (variant) {
      case 'outlined': return styles.outlined;
      case 'flat': return styles.flat;
      default: return styles.elevated;
    }
  };

  return (
    <View
      style={[
        styles.base,
        getVariantStyle(),
        { backgroundColor: bgColor, borderColor, padding },
        style
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  elevated: {
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  outlined: {
    borderWidth: 1,
  },
  flat: {
    borderWidth: 0,
  },
});
