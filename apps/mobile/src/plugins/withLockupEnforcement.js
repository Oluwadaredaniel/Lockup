const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = function withLockupEnforcement(config) {
  return withAndroidManifest(config, (config) => {
    const androidManifest = config.modResults.manifest;
    const mainApplication = androidManifest.application[0];

    // Register Accessibility Service
    if (!mainApplication.service) {
      mainApplication.service = [];
    }

    mainApplication.service.push({
      '$': {
        'android:name': 'expo.modules.lockupenforcement.LockupAccessibilityService',
        'android:permission': 'android.permission.BIND_ACCESSIBILITY_SERVICE',
        'android:exported': 'true'
      },
      'intent-filter': [
        {
          'action': {
            '$': {
              'android:name': 'android.accessibilityservice.AccessibilityService'
            }
          }
        }
      ],
      'meta-data': [
        {
          '$': {
            'android:name': 'android.accessibilityservice',
            'android:resource': '@xml/accessibility_service_config'
          }
        }
      ]
    });

    return config;
  });
};
