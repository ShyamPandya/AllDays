/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {StorageChunkUpload} from 'amplify-s3-chunk-upload';
import {Credentials} from '@aws-amplify/core';

import Amplify, {Storage} from 'aws-amplify';
import config from './src/aws-exports';

Amplify.configure({...config, Analytics: {disabled: true}});
// Load StorageChunkUpload Plugin
const storagePlugin = new StorageChunkUpload({}, Credentials);
Storage.addPluggable(storagePlugin);
storagePlugin.configure(config);

AppRegistry.registerComponent(appName, () => App);
