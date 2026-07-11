package expo.modules.lockupenforcement

import android.accessibilityservice.AccessibilityService
import android.view.accessibility.AccessibilityEvent
import android.content.Intent
import android.content.Context
import android.util.Log

class LockupAccessibilityService : AccessibilityService() {
    override fun onAccessibilityEvent(event: AccessibilityEvent) {
        if (event.eventType == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) {
            val packageName = event.packageName?.toString() ?: return
            
            val prefs = getSharedPreferences("LockupPrefs", Context.MODE_PRIVATE)
            val isSessionActive = prefs.getBoolean("isSessionActive", false)
            val blockedApps = prefs.getStringSet("blockedApps", emptySet()) ?: emptySet()

            if (isSessionActive && blockedApps.contains(packageName)) {
                Log.d("LockupEnforcement", "Blocking app: $packageName")
                
                // Launch the LockOverlayActivity or the React Native app's specific overlay state
                // For now, we launch the main activity which should handle the overlay state
                val launchIntent = packageManager.getLaunchIntentForPackage(applicationContext.packageName)
                launchIntent?.let {
                    it.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                    it.putExtra("blockedApp", packageName)
                    startActivity(it)
                }
            }
        }
    }

    override fun onInterrupt() {
        // Handle interruptions
    }
}
