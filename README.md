# notice-message

> Components for notifications/alerts for system messages

> 系统消息的通知/提醒的组件

## 🌰 Demo 示例
https://chenchengbi.github.io/notice-message/

## 📦 Install 安装
``` bash
$ npm i notice-message
```

## 🔨 Usage 使用
```javascript
import { Notice } from "notice-message";

/* When something happens that the user needs to know about, notify the user by calling the method as follows. */

Notice.message({ message: "I am a pop-up message" });
```

## 🔠 Details 详细用法
```javascript
/**
 * Pop up a message
 * 弹出一条消息
 */
Notice.message({
  /**
   * Text content of the message
   * 需要显示的消息文字内容
   */
  message: 'I am a message',
  /**
   * Type of message, including: default, success, warning, error.
   * 消息的类型，包括：默认，成功，警告，错误
   */
  type: 'default',
  /**
   * The duration of the message in milliseconds. If set to 0 the message will not be closed automatically. The default value is 3000
   * 消息的显示时间，毫秒。设为 0 则不会自动关闭。默认为 3000
   */
  duration: 10000,
  /**
   * The container in which the message is embedded. The default is window.document.body. If you specify a container other than window.document.body, set the container's style yourself: set the position to one of relative/absolute/fixed and the overflow to one of hidden/auto.
   * 消息体嵌入在哪个容器。默认为 window.document.body。若指定 body 以外的容器，请自行设置容器的样式 position 为 relative/absolute/fixed 并且设置 overflow 为 hidden/auto
   */
  container: window.document.body,
  /**
   * The height dimension of the message box, in pixels. The default value is 48
   * 消息框的高度尺寸，像素。默认为 48
   */
  height: 64,
  /**
   * The font size of the message in pixels. The default value is 16
   * 消息的字体大小，像素。默认为 16
   */
  fontSize: 20,
  /**
   * Whether the position of the message is center or left or right, the default is 'center'.
   * 消息的位置是居中还是靠左或靠右，默认为居中即 'center'
   */
  align: 'center',
  /**
   * Whether or not the message's close button is displayed. Defaults to false
   * 消息的关闭按钮是否显示。默认为 false
   */
  closable: true,
  /**
   * The custom class name of the message
   * 消息的自定义类名
   */
  customClass: 'my-notice-message',
  /**
   * Callback function when the message is closed
   * 消息关闭时的回调函数
   */
  onClose: (message) => {
    console.log('message :>> ', message);
  }
});
```