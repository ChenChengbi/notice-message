import "./index.scss";
import * as TWEEN from '@tweenjs/tween.js';

const PROD_NAME = 'notice-message';
const UNIT_HTML_STR = `<div class="notice">
                           <div class="icon"></div>
                           <div class="text"></div>
                       </div>`;
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

    /** 提示单元的 DOM */
    private _html: HTMLElement;
    /** 提示单元的当前位置(不断变化) */
    private _top: number = 0;
    /** 提示单元的高度 */
    private _height: number;
    /** 提示单元之间的间隙 */
    private _gap: number;



    public get html() { return this._html; }
    public get top() { return this._top; }
    public get height() { return this._height; }
    public get gap() { return this._gap; }
    /** 完整高度 = 单元高度 + 间隙高度 */
    public get totalHeight() {
        return this._height + this._gap;
    }

    constructor(params: {
        content: string,
        height: number,
        gap: number,
        type?: 'default' | 'success' | 'warning' | 'error',
        fontSize?: number,
    }) {
        const { content, height, gap, type = 'default', fontSize = DEFAULT_FONT_SIZE } = params;

        this.content = content;
        this._height = height;
        this._gap = gap;

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
    }

    public setTop(v: number, isGradual: boolean = false) {
        this._top = v;
        // this._html.dataset['top'] = String(this._top);

        if (isGradual) {
            this._html.style.setProperty('top', `${this._top - this.totalHeight}px`);
            setTimeout(() => {
                this._html.style.setProperty('top', `${this._top}px`); // 用于渐变样式 transition: top 0.5s ease-out;
            }, 0);
        } else {
            this._html.style.setProperty('top', `${this._top}px`);
        }
    }


}

export class Notice {
    private static readonly gap: number = 16;
    private static readonly slideTime: number = 300;

    private static units: NoticeUnit[] = [];

    public static pop(params: {
        message: string,
        container?: HTMLElement,
        type?: 'default' | 'success' | 'warning' | 'error',
        duration?: number,
        height?: number,
        fontSize?: number,
        closable?: boolean,
    }) {
        const {
            message,
            container = document.body,
            type = 'default',
            duration = DEFAULT_DURATION,
            height = DEFAULT_HEIGHT,
            fontSize = DEFAULT_FONT_SIZE,
            closable = true,
        } = params;

        const noticeUnit = new NoticeUnit({
            content: message,
            height,
            gap: this.gap,
            type,
            fontSize,
        });

        container.appendChild(noticeUnit.html);

        // -------------------------------------------------

        if (closable) {
            const btnDel = getHtmlElementFromStr(`<div class="btn-del"></div>`);
            noticeUnit.html.appendChild(btnDel);
            btnDel.addEventListener('click', ev => {
                console.log('aaa');
            })
        }

        // -------------------------------------------------

        let noticeTop;
        let slideDistance;

        if (this.units.length > 0) {
            const lastUnit = this.units[this.units.length - 1]; // 上一个单元(如果有)
            noticeTop = lastUnit.top + lastUnit.totalHeight;
            slideDistance = lastUnit.totalHeight;
        } else {
            noticeTop = this.gap
            slideDistance = noticeUnit.height + this.gap;
        }

        noticeUnit.setTop(noticeTop, true);

        this.units.push(noticeUnit);

        // -------------------------------------------------

        this.setTweenHide({
            container, duration, slideDistance, noticeUnit
        });
    }

    private static setTweenHide(params: {
        container: HTMLElement,
        duration: number,
        slideDistance: number,
        noticeUnit: NoticeUnit,
    }) {
        const { container, duration, slideDistance, noticeUnit } = params;

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
                container.removeChild(noticeUnit.html);
            });

        tweenHide.start();
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
