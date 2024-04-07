import $ from "cash-dom";
import { Notice } from "./NoticeMessage/index";

import './main.scss';
import './scss/purple.scss';

// ui

const $bar0 = $('<div class="bar"></div>');
const $bar1 = $('<div class="bar"></div>');

$('#app').append($bar0);
$('#app').append($bar1);

const $btn00 = $('<button>默认</button>');
const $btn01 = $('<button>成功</button>');
const $btn02 = $('<button>警告</button>');
const $btn03 = $('<button>错误</button>');

$bar0.append($btn00);
$bar0.append($btn01);
$bar0.append($btn02);
$bar0.append($btn03);

const $btn10 = $('<button>随机时间</button>');
const $btn11 = $('<button>随机高度</button>');
const $btn12 = $('<button>不自动关闭</button>');
const $btn13 = $('<button>自定义类名</button>');
const $btn14 = $('<button>关闭事件回调</button>');

$bar1.append($btn10);
$bar1.append($btn11);
$bar1.append($btn12);
$bar1.append($btn13);
$bar1.append($btn14);

// -----------------------------------------------

// function

$btn00.on('click', () => {
  Notice.pop({ message: 'Notice Message show' });
});

$btn01.on('click', () => {
  Notice.pop({ message: 'Notice Message show', type: 'success' });
});

$btn02.on('click', () => {
  Notice.pop({ message: 'Notice Message show', type: 'warning' });
});

$btn03.on('click', () => {
  Notice.pop({ message: 'Notice Message show', type: 'error' });
});

$btn10.on('click', () => {
  const factor = randomIntInScope(2, 5);
  const duration = factor * 1000;
  const type = randomType();
  Notice.pop({ message: `Notice Message show ${factor} seconds`, type, duration });
});

$btn11.on('click', () => {
  const factor = randomIntInScope(6, 30);
  const height = factor * 8;
  const type = randomType();
  Notice.pop({ message: `Notice Message of ${height}px show`, type, height });
});

$btn12.on('click', () => {
  const factor = randomIntInScope(6, 12);
  const height = factor * 8;
  const type = randomType();
  Notice.pop({ message: `Notice Message of ${height}px show`, type, height, duration: 0, closable: true });
});

$btn13.on('click', () => {
  const classNames = ['purple'];
  Notice.pop({ message: 'Notice Purple Message show', type: 'default', customClass: classNames, duration: 3000 });
});

$btn14.on('click', () => {
  Notice.pop({
    message: 'Please click the close button', type: 'default', duration: 0, closable: true,
    onClose: (message: any) => {
      console.log('message :>> ', message);
    }
  });
});

function randomType(): 'default' | 'success' | 'warning' | 'error' {
  const factor = randomIntInScope(0, 3);
  const arr: Array<'default' | 'success' | 'warning' | 'error'> = ['default', 'success', 'warning', 'error'];
  return arr[factor];
}

function randomIntInScope(min: number, max: number) {
  return Math.round(randomInScope(min, max));
}

function randomInScope(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

