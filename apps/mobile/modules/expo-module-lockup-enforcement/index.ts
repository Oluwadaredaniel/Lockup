import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

const LockupEnforcement = NativeModulesProxy.LockupEnforcement;

export function isAccessibilityServiceEnabled(): boolean {
  return LockupEnforcement.isAccessibilityServiceEnabled();
}

export function openAccessibilitySettings(): void {
  return LockupEnforcement.openAccessibilitySettings();
}

export function canDrawOverlays(): boolean {
  return LockupEnforcement.canDrawOverlays();
}

export function openOverlaySettings(): void {
  return LockupEnforcement.openOverlaySettings();
}
