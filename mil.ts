/**
 * Mil - Micro layout CSS-in-JS library (sketched rough code)
 *
 * MIT License
 *
 * Copyright (c) 2024 Hanakla (https://github.com/hanakla)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

type Mil = string & {
    get disableToStringCall(): void;
  
    get static(): Mil;
    get relative(): Mil;
    get absolute(): Mil;
    get fixed(): Mil;
    get sticky(): Mil;
  
    top(top: "auto" | number | string): Mil;
    right(right: "auto" | number | string): Mil;
    bottom(bottom: "auto" | number | string): Mil;
    left(left: "auto" | number | string): Mil;
  
    p(padding: number | string): Mil;
    pt(padding: number | string): Mil;
    pr(padding: number | string): Mil;
    pb(padding: number | string): Mil;
    pl(padding: number | string): Mil;
  
    m(margin: number | string): Mil;
    mt(margin: number | string): Mil;
    mr(margin: number | string): Mil;
    mb(margin: number | string): Mil;
    ml(margin: number | string): Mil;
  
    content(content: string): Mil;
    w(width: number | string): Mil;
    h(height: number | string): Mil;
  
    get block(): Mil;
    get inline(): Mil;
    get inlineBlock(): Mil;
    get contents(): Mil;
    flex(dir?: "row" | "column"): Mil;
    flexWrap(wrap?: "wrap" | "nowrap" | "reverse"): Mil;
  
    grid(cols: number): Mil;
    gap(gap: number | string): Mil;
  
    xs(mil: Mil): Mil;
    before(mil: Mil): Mil;
    after(mil: Mil): Mil;
    hover(mil: Mil): Mil;
    focus(mil: Mil): Mil;
  
    get toProps(): { className: string; style: Record<string, string> };
    get toStyle(): Record<string, string>;
    toCSSString(): string;
    valueOf(): string;
    toString(): string;
  };
  
  type StyleKeys =
    | "po"
    | "pt"
    | "pr"
    | "pb"
    | "pl"
    | "p"
    | "pt"
    | "pr"
    | "pb"
    | "pl"
    | "m"
    | "mt"
    | "mr"
    | "mb"
    | "ml"
    | "cn"
    | "w"
    | "h"
    | "d"
    | "ff"
    | "fw"
    | "gap"
    | "gtc";
  
  function num2str(num: number | string, unit: string) {
    return typeof num === "number" ? `${num}${unit}` : num;
  }
  
  function camelToKebab(str: string) {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  
  const insertedRules = new Set<string>();
  
  /**
   * Returns a hash code from a string
   * @param  {String} str The string to hash.
   * @return {Number}    A 32bit integer
   * @see http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
   */
  function hashCode(str: string) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
      let chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }
  
  export const mil = new Proxy(
    {},
    {
      get: (_, prop) => {
        return (_mil() as any)[prop];
      },
    }
  ) as Mil;
  
  let disableToStringCall: boolean;
  let styleEl: HTMLStyleElement | null = null;
  if (typeof window !== "undefined") {
    styleEl = document.createElement("style");
    styleEl.id = "mil-styles";
    document.head.appendChild(styleEl);
  }
  
  function _mil() {
    const s: Record<StyleKeys, any> = {} as any;
    const child: Record<
      "xs" | "hover" | "focus" | "before" | "after",
      Mil | null
    > = {
      xs: null,
      hover: null,
      focus: null,
      before: null,
      after: null,
    };
  
    function toCSSString() {
      const selfCss = self.toCSSString();
  
      return {
        _: selfCss,
        xs: child.xs?.toCSSString(),
        xsq: "@media (max-width: 600px)",
        hover: child.hover?.toCSSString(),
        focus: child.focus?.toCSSString(),
        before: child.before?.toCSSString(),
        after: child.after?.toCSSString(),
      };
    }
  
    const self: Mil = {
      get disableToStringCall() {
        disableToStringCall = true;
        return;
      },
  
      get static() {
        s.po = "static";
        return self;
      },
      get relative() {
        s.po = "relative";
        return self;
      },
      get absolute() {
        s.po = "absolute";
        return self;
      },
      get fixed() {
        s.po = "fixed";
        return self;
      },
      get sticky() {
        s.po = "sticky";
        return self;
      },
  
      top(top) {
        s.pt = num2str(top, "px");
        return self;
      },
      right(right) {
        s.pr = num2str(right, "px");
        return self;
      },
      bottom(bottom) {
        s.pb = num2str(bottom, "px");
        return self;
      },
      left(left) {
        s.pl = num2str(left, "px");
        return self;
      },
  
      p(padding) {
        s.p = num2str(padding, "px");
        return self;
      },
      pt(padding) {
        s.pt = num2str(padding, "px");
        return self;
      },
      pr(padding) {
        s.pr = num2str(padding, "px");
        return self;
      },
      pb(padding) {
        s.pb = num2str(padding, "px");
        return self;
      },
      pl(padding) {
        s.pl = num2str(padding, "px");
        return self;
      },
      m(margin) {
        s.m = num2str(margin, "px");
        return self;
      },
      mt(margin) {
        s.mt = num2str(margin, "px");
        return self;
      },
      mr(margin) {
        s.mr = num2str(margin, "px");
        return self;
      },
      mb(margin) {
        s.mb = num2str(margin, "px");
        return self;
      },
      ml(margin) {
        s.ml = num2str(margin, "px");
        return self;
      },
  
      content(content) {
        s.cn = content;
        return self;
      },
      w(width) {
        s.w = num2str(width, "px");
        return self;
      },
      h(height) {
        s.h = num2str(height, "px");
        return self;
      },
  
      get block() {
        s.d = "block";
        return self;
      },
      get inline() {
        s.d = "inline";
        return self;
      },
      get inlineBlock() {
        s.d = "inline-block";
        return self;
      },
      get contents() {
        s.d = "contents";
        return self;
      },
  
      flex(dir = "row") {
        s.d = "flex";
        s.ff = dir;
        return self;
      },
  
      grid(cols) {
        s.d = "grid";
        s.gtc = `repeat(${cols}, 1fr)`;
        return self;
      },
      gap(gap) {
        s.gap = num2str(gap, "px");
        return self;
      },
  
      flexWrap(wrap = "wrap") {
        s.fw = wrap;
        return self;
      },
  
      xs(mil) {
        child.xs = mil;
        return self;
      },
      before(mil) {
        child.before = mil;
        return self;
      },
      after(mil) {
        child.after = mil;
        return self;
      },
      hover(mil) {
        child.hover = mil;
        return self;
      },
      focus(mil) {
        child.focus = mil;
        return self;
      },
  
      get toProps() {
        return {
          className: self.toString(),
          style: self.toStyle,
        };
      },
      get toStyle() {
        const styles: Record<string, string> = {};
  
        s.po && (styles.position = s.po);
        s.pt && (styles.top = s.pt);
        s.pr && (styles.right = s.pr);
        s.pb && (styles.bottom = s.pb);
        s.pl && (styles.left = s.pl);
  
        s.p && (styles.padding = s.p);
        s.pt && (styles.paddingTop = s.pt);
        s.pr && (styles.paddingRight = s.pr);
        s.pb && (styles.paddingBottom = s.pb);
        s.pl && (styles.paddingLeft = s.pl);
  
        s.m && (styles.margin = s.m);
        s.mt && (styles.marginTop = s.mt);
        s.mr && (styles.marginRight = s.mr);
        s.mb && (styles.marginBottom = s.mb);
        s.ml && (styles.marginLeft = s.ml);
  
        s.cn && (styles.content = `"${s.cn}"`);
        s.w && (styles.width = s.w);
        s.h && (styles.height = s.h);
  
        s.d && (styles.display = s.d);
        s.ff && (styles.flexDirection = s.ff);
        s.fw && (styles.flexWrap = s.fw);
  
        s.gap && (styles.gap = s.gap);
        s.gtc && (styles.gridTemplateColumns = s.gtc);
  
        return styles;
      },
      toCSSString() {
        const styles = self.toStyle;
        return Object.entries(styles)
          .map(([key, value]) => `${camelToKebab(key)}:${value}`)
          .join(";");
      },
  
      toString() {
        if (disableToStringCall) {
          throw new Error("toString is disabled for mil");
        }
  
        const items = toCSSString();
        const str = [items._, items.xs && `${items.xsq}{${items.xs}}`].filter(
          Boolean
        ) as string[];
  
        const hash = hashCode(str.join("")).toString(36);
        const cls = `mil-${hash}`;
  
        if (typeof window !== "undefined") {
          if (insertedRules.has(cls)) return cls;
          insertedRules.add(cls);
  
          console.log(items);
  
          styleEl!.sheet!.insertRule(`.${cls}{${items._}}`, 0);
          items.xs &&
            styleEl!.sheet!.insertRule(`${items.xsq}{.${cls}{${items.xs}}}`, 1);
          items.hover &&
            styleEl!.sheet!.insertRule(`.${cls}:hover{${items.hover}}`, 2);
          items.focus &&
            styleEl!.sheet!.insertRule(`.${cls}:focus{${items.focus}}`, 2);
          items.before &&
            styleEl!.sheet!.insertRule(`.${cls}::before{${items.before}}`, 0);
          items.after &&
            styleEl!.sheet!.insertRule(`.${cls}::after{${items.after}}`, 0);
        }
  
        return cls;
      },
    };
  
    return self;
  }
  