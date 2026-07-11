package expo.modules.lockupenforcement

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.content.Context
import android.content.Intent
import android.provider.Settings
import android.net.Uri

class LockupEnforcementModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("LockupEnforcement")

    Function("isAccessibilityServiceEnabled") {
      val context = appContext.reactContext ?: return@Function false
      val expectedServiceName = "${context.packageName}/${LockupAccessibilityService::class.java.canonicalName}"
      val enabledServices = Settings.Secure.getString(context.contentResolver, Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES)
      enabledServices?.contains(expectedServiceName) == true
    }

    Function("openAccessibilitySettings") {
      val context = appContext.reactContext ?: return@Function
      val intent = Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)
      intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      context.startActivity(intent)
    }

    Function("canDrawOverlays") {
      val context = appContext.reactContext ?: return@Function false
      Settings.canDrawOverlays(context)
    }

    Function("openOverlaySettings") {
      val context = appContext.reactContext ?: return@Function
      val intent = Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:${context.packageName}"))
      intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      context.startActivity(intent)
    }
  }
}
