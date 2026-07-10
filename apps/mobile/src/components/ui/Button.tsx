import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface Props {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<Props> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary': return styles.secondary;
      case 'ghost': return styles.ghost;
      case 'danger': return styles.danger;
      default: return styles.primary;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small': return styles.small;
      case 'large': return styles.large;
      default: return styles.medium;
    }
  };

  const getTextColor = () => {
    if (variant === 'ghost' || variant === 'secondary') return '#7C3AED';
    if (variant === 'danger') return '#EF4444';
    return 'white';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.base,
        getVariantStyle(),
        getSizeStyle(),
        (disabled || loading) && styles.disabled,
        style,
      ]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: '#7C3AED',
  },
  secondary: {
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.2)',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  small: {
    height: 40,
    paddingHorizontal: 16,
  },
  medium: {
    height: 56,
    paddingHorizontal: 24,
  },
  large: {
    height: 64,
    paddingHorizontal: 32,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.5,
  },
});
