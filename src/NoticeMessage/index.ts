import "./index.scss";
import * as TWEEN from '@tweenjs/tween.js';

const PROD_NAME = 'notice-message';
const UNIT_HTML_STR = `<div class="notice">
                           <div class="icon"></div>
                           <div class="text"></div>
                       </div>`;
const UNIT_BTN_CLOSE_STR = `<div class="btn-del"></div>`;
const DEFAULT_DURATION = 3000;
const DEFAULT_HEIGHT = 48;
const DEFAULT_FONT_SIZE = 16;

const group = new TWEEN.Group();

animate();

function animate() {
    requestAnimationFrame(animate);
    group.update();
}

class NoticeUnit {
    /** 消息单元中需要显示的内容 */
    private content: string;
    /** 消息单元的类型，包括：默认，成功，警告，错误 */
    private type: 'default' | 'success' | 'warning' | 'error';
    /** 消息单元的显示时间，毫秒。设为 0 则不会自动关闭 */
    private duration: number;
    /** 消息单元的字体大小，像素 */
    private fontSize: number;
    /** 消息单元的关闭按钮是否显示 */
    private closable: boolean;

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
        closable: boolean,
        height: number,
    }) {
        const {
            content,
            type,
            duration,
            fontSize,
            closable,
            height,
        } = params;

        this.content = content;
        this.type = type;
        this.duration = duration;
        this.fontSize = fontSize;
        this.closable = closable;

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
        this._html.style.setProperty('left', '50%');
        this._html.style.setProperty('transform', 'translateX(-50%)');

        if (closable) {
            const btnDel = getHtmlElementFromStr(UNIT_BTN_CLOSE_STR);
            this._html.appendChild(btnDel);
            btnDel.addEventListener('click', ev => {
                this.close();
            });
        }
    }

    /**
     * 设置位置
     * @param v 值
     * @param isGradual 是否渐变出场
     */
    public setTop(v: number, isGradual: boolean = false) {
        this._top = v;
        // this._html.dataset['top'] = String(this._top);

        if (isGradual) {
            this._html.style.setProperty('top', `${this._top - this.totalHeight}px`);
            setTimeout(() => { this._html.style.setProperty('top', `${this._top}px`); }, 0); // 用于渐变样式 transition: top 0.5s ease-out;
        } else {
            this._html.style.setProperty('top', `${this._top}px`);
        }
    }

    public setGap(v: number) {
        this._gap = v;
    }

    public close() {
        if (this._tweenHide) {
            this._tweenHide.delay(0);
            this._tweenHide.start();
        }
    }
}

export class Notice {
    /** 消息集距离窗口顶部的偏移量 */
    private static readonly offset: number = 20;
    /** 消息单元间的间隙 */
    private static readonly gap: number = 16;
    /** 消息单元滑动消失的时间 */
    private static readonly slideTime: number = 300;

    private static readonly units: NoticeUnit[] = [];

    private static container: HTMLElement = document.body;

    public static setContainer(container: HTMLElement) {
        this.container = container;
    }

    /**
     * 弹出一条消息
     * @param params.message 消息单元中需要显示的文字内容 
     * @param params.type 消息的类型，包括：默认，成功，警告，错误
     * @param params.duration 消息的显示时间，毫秒。设为 0 则不会自动关闭。默认为 3000
     * @param params.height 消息主体框的高度，像素。默认为 48
     * @param params.fontSize 消息的字体大小，像素。默认为 16
     * @param params.closable 消息的关闭按钮是否显示。默认为 false
     */
    public static pop(params: {
        message: string,
        type?: 'default' | 'success' | 'warning' | 'error',
        duration?: number,
        height?: number,
        fontSize?: number,
        closable?: boolean,
    }) {
        const {
            message,
            type = 'default',
            duration = DEFAULT_DURATION,
            height = DEFAULT_HEIGHT,
            fontSize = DEFAULT_FONT_SIZE,
            closable = false,
        } = params;

        this.verifyPopParams({ duration, height, fontSize });

        const noticeUnit = new NoticeUnit({
            content: message,
            type,
            duration,
            fontSize,
            closable,
            height,
        });

        // -------------------------------------------------

        let unitTop;
        if (this.units.length > 0) {
            noticeUnit.setGap(this.gap);

            const lastUnit = this.units[this.units.length - 1]; // 上一个单元(如果有)
            unitTop = lastUnit.top + lastUnit.height + noticeUnit.gap;
        } else {
            noticeUnit.setGap(this.offset);

            unitTop = noticeUnit.gap;
        }

        this.container.appendChild(noticeUnit.html);
        noticeUnit.setTop(unitTop, true);

        this.units.push(noticeUnit);

        // -------------------------------------------------

        this.setTweenHide({ duration, noticeUnit });
    }

    private static verifyPopParams(params: {
        duration: number,
        height: number,
        fontSize: number,
    }) {
        const {
            duration,
            height,
            fontSize,
        } = params;

        if (duration < 0) throw new Error(`duration 不可小于0`);
        if (height < 1) throw new Error(`height 不可小于1`);
        if (fontSize < 12) throw new Error(`fontSize 不可小于12`);
    }

    private static setTweenHide(params: {
        duration: number,
        noticeUnit: NoticeUnit,
    }) {
        const { duration, noticeUnit } = params;
        const slideDistance = noticeUnit.totalHeight;

        const propsHide = { slideDistance };
        const tweenHide = new TWEEN.Tween(propsHide, group);

        tweenHide.delay(duration);

        // 滑动后消失
        tweenHide.to({
            slideDistance: 0
        }, Notice.slideTime); // NoticeMessage 在显示了一段时间后，开始移动到消失点

        let lastSlideDistance = slideDistance;

        tweenHide
            .onStart(props => { })
            .onUpdate(props => {
                const decrement = lastSlideDistance - props.slideDistance;
                lastSlideDistance = props.slideDistance;

                const i = Notice.units.findIndex(unit => unit === noticeUnit);
                const unitsAfter = Notice.units.slice(i);

                for (const unit of unitsAfter) {
                    unit.setTop(unit.top - decrement);
                }
            }).onComplete(props => {
                const i = Notice.units.findIndex(unit => unit === noticeUnit);
                Notice.units.splice(i, 1);
                this.container.removeChild(noticeUnit.html);
            });

        // if (duration > 3000) tweenHide.start(); // 测试用
        if (duration > 0) tweenHide.start();

        noticeUnit.tweenHide = tweenHide;
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
