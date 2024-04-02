import $ from "cash-dom";
import { Notice } from "./NoticeMessage/index";

import './main.scss'

// ui

const $bar0 = $('<div class="bar"></div>')
const $bar1 = $('<div class="bar"></div>')

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

$bar1.append($btn10);
$bar1.append($btn11);

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
  const r = Math.round(randomInScope(2, 5));
  const duration = r * 1000;
  Notice.pop({ message: `Notice Message show ${r} seconds`, duration });
});

$btn11.on('click', () => {
  const height = Math.round(randomInScope(48, 80));
  Notice.pop({ message: `Notice Message of ${height}px show`, height });
});

function randomInScope(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

