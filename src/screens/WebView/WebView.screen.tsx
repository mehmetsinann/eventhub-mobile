import {WebView} from 'react-native-webview';
import React, {useRef} from 'react';

import {styles} from './WebView.style';

type WebViewScreenProps = {
  route: {
    params: {
      uri: string;
    };
  };
};

const WebViewScreen = ({route}: WebViewScreenProps) => {
  const webViewRef = useRef(null);
  return (
    <WebView
      ref={webViewRef}
      source={{uri: route.params.uri}}
      style={styles.webView}
      javaScriptEnabled={true}
      originWhitelist={['*']}
      domStorageEnabled={true}
      startInLoadingState={true}
    />
  );
};

export default WebViewScreen;
