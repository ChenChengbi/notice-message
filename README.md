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
// 弹出一条消息
Notice.message({
  message: 'I am a message', // 需要显示的消息文字内容
  type: 'default', // 消息的类型，包括：默认，成功，警告，错误
  duration: 10000, // 消息的显示时间，毫秒。设为 0 则不会自动关闭。默认为 3000
  container: window.document.body, // 提示嵌入在哪个容器。默认为 window.document.body。若指定 body 以外的容器，请自行设置容器的样式 position 为 relative/absolute/fixed 并且设置 overflow 为 hidden/auto
  height: 64, // 消息框的高度尺寸，像素。默认为 48
  fontSize: 20, // 消息的字体大小，像素。默认为 16
  align: 'center', // 消息的位置是居中还是靠左或靠右，默认为居中即 'center'
  closable: true, // 消息的关闭按钮是否显示。默认为 false
  customClass: 'my-notice-message', // 消息的自定义类名
  onClose: (message) => { // 消息关闭时的回调函数
    console.log('message :>> ', message);
  }
});
```