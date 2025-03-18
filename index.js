/**
 * @format
 */

import {AppRegistry, Text, TextInput} from 'react-native';
import App from './src/App'
import {name as appName} from './app.json';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

configureReanimatedLogger({
    level:ReanimatedLogLevel.warn,
    strict:false
})

if(Text.defautProps){
    Text.defautProps.allowFontScaling = false
}else{
    Text.defautProps = {}
    Text.defautProps.allowFontScaling = false
}

if(TextInput.defautProps){
    TextInput.defautProps.allowFontScaling = false
} else {
    TextInput.defautProps = {}
    TextInput.defautProps.allowFontScaling = {}
}

AppRegistry.registerComponent(appName, () => App);
