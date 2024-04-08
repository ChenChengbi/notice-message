import "./index.scss";
import * as TWEEN from '@tweenjs/tween.js';

const PROD_NAME = 'notice-message';
const UNIT_HTML_STR = `<div class="notice">
                           <div class="icon"></div>
                           <div class="text"></div>
                       </div>`;
const UNIT_BTN_CLOSE_STR = `<div class="btn-del"></div>`;

// @ts-ignore
import SVG_CLOSE_STR from './icons/close.svg?raw';

const DEFAULT_DURATION = 3000;
const DEFAULT_HEIGHT = 48;
const DEFAULT_FONT_SIZE = 16;

const group = new TWEEN.Group();

animate();

function animate() {
    requestAnimationFrame(animate);
    group.update();
}

class MessageUnit {
    /** 消息单元中需要显示的内容 */
    private content: string;
    /** 消息单元的类型，包括：默认，成功，警告，错误 */
    // @ts-ignore
    private type: 'default' | 'success' | 'warning' | 'error';
    /** 消息单元的显示时间，毫秒。设为 0 则不会自动关闭 */
    // @ts-ignore
    private duration: number;
    /** 消息单元的字体大小，像素 */
    // @ts-ignore
    private fontSize: number;
    /** 消息单元居中、居左或居右显示 */
    // @ts-ignore
    private align: 'left' | 'center' | 'right';
    /** 消息单元的关闭按钮是否显示 */
    // @ts-ignore
    private closable: boolean;
    /** 自定义类名 */
    private customClass: string[] = [];
    /** 关闭时的回调函数, 参数为被关闭的 MessageUnit 实例 */
    private _onClose?: (messageUnit: MessageUnit) => void;

    /** 消息主体框的高度 */
    private _height: number;
    /** 提示单元的 DOM */
    private _html: HTMLElement;
    /** 提示单元的当前位置(不断变化) */
    private _top: number = 0;
    /** 提示单元之间的间隙(本单元的上部间隙，第一个单元的上部缝隙为0) */
    private _gap: number = 0;
    /** 上滑隐藏的计时器 */
    private _tweenHide?: TWEEN.Tween<{ slideDistance: number; }>;

    public get html() { return this._html; }
    public get top() { return this._top; }
    public get height() { return this._height; }
    public get gap() { return this._gap; }

    public get onClose() { return this._onClose; }

    /** 完整高度 = 单元高度 + 上方间隙高度 */
    public get totalHeight() {
        return this._height + this._gap;
    }

    public set tweenHide(v: TWEEN.Tween<{ slideDistance: number; }>) { this._tweenHide = v; }

    constructor(params: {
        content: string,
        type: 'default' | 'success' | 'warning' | 'error',
        duration: number,
        fontSize: number,
        align: 'left' | 'center' | 'right',
        closable: boolean,
        height: number,
        customClass?: string | string[],
        onClose?: (messageUnit: MessageUnit) => void,
    }) {
        const {
            content,
            type,
            duration,
            fontSize,
            align,
            closable,
            height,
            customClass,
            onClose,
        } = params;

        this.content = content;
        this.type = type;
        this.duration = duration;
        this.fontSize = fontSize;
        this.align = align;
        this.closable = closable;
        this._onClose = onClose;

        this._height = height;

        this._html = getHtmlElementFromStr(UNIT_HTML_STR);

        this._html.classList.add(PROD_NAME);
        this._html.classList.add(type);

        const text = this._html.querySelector('.text');
        if (text) {
            (<HTMLElement>text).innerText = this.content /* + new Date().getTime() */;
            (<HTMLElement>text).style.fontSize = `${fontSize}px`;
            (<HTMLElement>text).style.lineHeight = `${fontSize}px`;
        }

        this._html.style.setProperty('height', `${this._height}px`);

        switch (align) {
            case 'left': {
                this._html.style.setProperty('left', '16px');
                break;
            }
            case 'center': {
                this._html.style.setProperty('left', '50%');
                this._html.style.setProperty('transform', 'translateX(-50%)');
                break;
            }
            case 'right': {
                this._html.style.setProperty('right', '16px');
                break;
            }
            default:
                break;
        }

        if (customClass) {
            if (Array.isArray(customClass)) {
                for (const className of customClass) {
                    if (typeof className === 'string')
                        this.addCustomClass(className);
                }
            } else if (typeof customClass === 'string') {
                this.addCustomClass(customClass);
            }
        }

        if (closable) {
            const btnDel = getHtmlElementFromStr(UNIT_BTN_CLOSE_STR);
            const iconSvgDel = getHtmlElementFromStr(SVG_CLOSE_STR);
            btnDel.appendChild(iconSvgDel);
            this._html.appendChild(btnDel);
            // @ts-ignore
            btnDel.addEventListener('click', ev => {
                this.close();
            });
        }
    }

    /**
     * 设置位置
     * @internal
     * @param v 值
     * @param isGradual 是否渐变出场
     */
    public setTop(v: number, isGradual: boolean = false) {
        this._top = v;
        // this._html.dataset['top'] = String(this._top);

        if (isGradual) {
            // 下面写法在 Chrome 有效，但 Firefox 中无效，故换用 Tween.js 实现
            // this._html.style.setProperty('top', `${this._top - this.totalHeight}px`);
            // setTimeout(() => { this._html.style.setProperty('top', `${this._top}px`); }, 0); // 用于渐变样式 transition: top 0.2s ease-out;

            const top = this._top - this.totalHeight;
            const propsShow = { top };
            const tweenShow = new TWEEN.Tween(propsShow, group);

            // 滑动后出现
            tweenShow.to({ top: this._top }, 200);
            tweenShow
                .onUpdate(props => { this._html.style.setProperty('top', `${props.top}px`); })
                .onComplete(props => { this._html.style.setProperty('top', `${props.top}px`); });
            tweenShow.start();

        } else {
            this._html.style.setProperty('top', `${this._top}px`);
        }
    }

    /** 
     * 设置提示单元之间的间隙
     * @internal
     */
    public setGap(v: number) {
        this._gap = v;
    }

    /** 关闭提示单元 */
    public close() {
        if (this._tweenHide) {
            if (this._tweenHide.isPlaying()) {
                this._tweenHide.stop();
            }

            this._tweenHide.delay(0);
            this._tweenHide.start();
        }
    }

    /** 添加一个自定义类名 */
    private addCustomClass(className: string) {
        this._html.classList.add(className);
        this.customClass.push(className);
    }
}

export class Notice {
    /** 消息集距离窗口顶部的偏移量 */
    private static readonly offset: number = 20;
    /** 消息单元间的间隙 */
    private static readonly gap: number = 16;
    /** 消息单元滑动消失的时间 */
    private static readonly slideTime: number = 300;
    /** 存放提示单元集合 */
    private static readonly units: MessageUnit[] = [];
    /** 提示集的容器 */
    private static container: HTMLElement = document.body;

    public static setContainer(container: HTMLElement) {
        this.container = container;
    }

    /**
     * 弹出一条消息
     * @param params.message 需要显示的消息文字内容 
     * @param params.type 消息的类型，包括：默认，成功，警告，错误
     * @param params.duration 消息的显示时间，毫秒。设为 0 则不会自动关闭。默认为 3000
     * @param params.height 消息框的高度尺寸，像素。默认为 48
     * @param params.fontSize 消息的字体大小，像素。默认为 16
     * @param params.align 消息的位置是居中还是靠左或靠右，默认为居中即 'center'
     * @param params.closable 消息的关闭按钮是否显示。默认为 false
     * @param params.customClass 消息的自定义类名
     * @param params.onClose 消息关闭时的回调函数
     */
    public static message(params: {
        message: string,
        type?: 'default' | 'success' | 'warning' | 'error',
        duration?: number,
        height?: number,
        fontSize?: number,
        align?: 'left' | 'center' | 'right',
        closable?: boolean,
        customClass?: string | string[],
        onClose?: (messageUnit: MessageUnit) => void,
    }) {
        const {
            message,
            type = 'default',
            duration = DEFAULT_DURATION,
            height = DEFAULT_HEIGHT,
            fontSize = DEFAULT_FONT_SIZE,
            align = 'center',
            closable = false,
            customClass,
            onClose,
        } = params;

        this.verifyPopParams({ duration, height, fontSize, onClose });

        const messageUnit = new MessageUnit({
            content: message,
            type,
            duration,
            fontSize,
            align,
            closable,
            height,
            customClass,
            onClose,
        });

        // -------------------------------------------------

        let unitTop;
        if (this.units.length > 0) {
            messageUnit.setGap(this.gap);

            const lastUnit = this.units[this.units.length - 1]; // 上一个单元(如果有)
            unitTop = lastUnit.top + lastUnit.height + messageUnit.gap;
        } else {
            messageUnit.setGap(this.offset);

            unitTop = messageUnit.gap;
        }

        this.container.appendChild(messageUnit.html);
        messageUnit.setTop(unitTop, true);

        this.units.push(messageUnit);

        // -------------------------------------------------

        this.setTweenHide({ duration, messageUnit });
    }

    private static verifyPopParams(params: {
        duration: number,
        height: number,
        fontSize: number,
        onClose?: (messageUnit: MessageUnit) => void,
    }) {
        const {
            duration,
            height,
            fontSize,
            onClose,
        } = params;

        if (duration < 0) throw new Error(`duration 不可小于 0`);
        if (height < 1) throw new Error(`height 不可小于 1`);
        if (fontSize < 12) throw new Error(`fontSize 不可小于 12`);
        if (onClose && typeof onClose !== 'function') throw new Error(`onClose 必须为函数`);
    }

    private static setTweenHide(params: {
        duration: number,
        messageUnit: MessageUnit,
    }) {
        const { duration, messageUnit } = params;
        const slideDistance = messageUnit.totalHeight;

        const propsHide = { slideDistance };
        const tweenHide = new TWEEN.Tween(propsHide, group);

        // 滑动后消失
        tweenHide.to({
            slideDistance: 0
        }, Notice.slideTime); // NoticeMessage 在显示了一段时间后，开始移动到消失点

        let lastSlideDistance = slideDistance;

        tweenHide
            // @ts-ignore
            .onStart(props => {
                if (messageUnit.onClose) messageUnit.onClose(messageUnit);
            })
            .onUpdate(props => {
                // 每次 onStart 触发后，至少触发一次 onUpdate，哪怕 onStart 回调里调用了 Tween.pause() 或 Tween.stop()

                const decrement = lastSlideDistance - props.slideDistance;
                lastSlideDistance = props.slideDistance;

                const i = Notice.units.findIndex(unit => unit === messageUnit);
                const unitsAfter = Notice.units.slice(i);

                for (const unit of unitsAfter) {
                    unit.setTop(unit.top - decrement);
                }
            })
            // @ts-ignore
            .onComplete(props => {
                const i = Notice.units.findIndex(unit => unit === messageUnit);
                Notice.units.splice(i, 1);
                this.container.removeChild(messageUnit.html);
            });

        if (duration > 0) {
            tweenHide.delay(duration);
            // if (duration > 3000) tweenHide.start(); // 测试用
            tweenHide.start();
        }

        messageUnit.tweenHide = tweenHide;
    }
}

/**
 * 把 html 格式的字符串转换成 html 对象(只有单一根节点)
 * @param htmlStr html 格式的字符串
 * @returns html 对象
 */
function getHtmlElementFromStr(htmlStr: string): HTMLElement {
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(htmlStr, "text/html");
    return doc.body.firstElementChild as HTMLElement;
}
