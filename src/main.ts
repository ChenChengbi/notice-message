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
const $btn14 = $('<button>可关闭</button>');

$bar1.append($btn10);
$bar1.append($btn11);
$bar1.append($btn12);
$bar1.append($btn13);
$bar1.append($btn14);

// -----------------------------------------------

const $area0 = $('<div class="area"></div>');
$area0.css('position', 'relative').css('overflow', 'auto');
$('#app').append($area0);

const $area_btn00 = $('<button>指定区域</button>');
$area0.append($area_btn00);

$area_btn00.on('click', () => {
  Notice.message({ message: 'Notice Message show', duration: 1000, container: $area0[0] as HTMLElement });
});

// -----------------------------------------------

// function

$btn00.on('click', () => {
  Notice.message({ message: 'Notice Message show' });
});

$btn01.on('click', () => {
  Notice.message({ message: 'Notice Message show', type: 'success' });
});

$btn02.on('click', () => {
  Notice.message({ message: 'Notice Message show', type: 'warning' });
});

$btn03.on('click', () => {
  Notice.message({ message: 'Notice Message show', type: 'error' });
});

$btn10.on('click', () => {
  const factor = randomIntInScope(2, 5);
  const duration = factor * 1000;
  const type = randomType();
  Notice.message({ message: `Notice Message show ${factor} seconds`, type, duration });
});

$btn11.on('click', () => {
  const factor = randomIntInScope(6, 30);
  const height = factor * 8;
  const type = randomType();
  Notice.message({ message: `Notice Message of ${height}px show`, type, height });
});

$btn12.on('click', () => {
  const factor = randomIntInScope(6, 12);
  const height = factor * 8;
  const type = randomType();
  Notice.message({ message: `Notice Message of ${height}px show`, type, height, duration: 0, closable: true });
});

$btn13.on('click', () => {
  const classNames = ['purple'];
  Notice.message({ message: 'Notice Purple Message show', type: 'default', customClass: classNames, duration: 3000 });
});

$btn14.on('click', () => {
  Notice.message({
    message: `Click the close button to close me immediately, otherwise I will close automatically after 5 seconds.`,
    type: 'default',
    duration: 5000,
    height: 64,
    closable: true,
    // @ts-ignore
    onClose: (message) => {
      // console.log('message :>> ', message);
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

