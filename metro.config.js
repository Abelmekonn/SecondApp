const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

module.exports = withNativeWind(getDefaultConfig(__dirname),
    {
        // Do not disable CSS support when using Tailwind.
        isCSSEnabled: true,
    }
);