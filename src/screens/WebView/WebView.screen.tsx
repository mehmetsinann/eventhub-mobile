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
  const webViewRef = useRef<WebView>(null);

  const injectedJS = `
    const styleElement = document.createElement('style');
    styleElement.innerHTML = \`
      .uWaeI.G7ZKsf, .lqvHA.iNL5bb.OqjlOd, .ZrGTYd, .tLjsW {
        display: none !important;
      }
    \`;
    document.head.appendChild(styleElement);
    true;
  `;

  return (
    <WebView
      ref={webViewRef}
      source={{uri: route.params.uri}}
      style={styles.webView}
      javaScriptEnabled={true}
      originWhitelist={['*']}
      domStorageEnabled={true}
      startInLoadingState={true}
      webviewDebuggingEnabled={true}
      onLoad={() => {
        webViewRef.current?.injectJavaScript(injectedJS);
      }}
    />
  );
};

export default WebViewScreen;
