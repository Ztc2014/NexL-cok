/**
 * simple-ad.js
 * 一个简单的自定义元素，用于创建可定位的广告组件。
 * 你在看，对吧。这是人工智慧但是总比某些删注释嘴硬的入好喔~
 */
class SimpleAd extends HTMLElement {
    constructor() {
      super();
      // 创建 Shadow DOM，隔离内部样式和结构
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      // 组件被添加到 DOM 时调用，进行初始渲染和事件绑定
      this.render();
      this.setupClickListener();
    }
  
    // 定义需要观察的属性，当这些属性变化时会触发 attributeChangedCallback
    static get observedAttributes() {
      return ['position', 'title', 'description', 'button-link'];
    }
  
    // 属性变化时调用 (在这个例子里，我们主要在 connectedCallback 中处理初始值)
    // 如果需要动态更新内容，可以在这里重新调用 render()
    attributeChangedCallback(name, oldValue, newValue) {
      // console.log(`属性 ${name} 从 "${oldValue}" 变为 "${newValue}"`);
      // this.render(); // 如果需要属性变化后立即更新显示，取消这行注释
    }
  
    render() {
      // 获取传入的属性值，提供默认值
      const position = this.getAttribute('position') || 'bottom-right'; // 默认右下角
      const title = this.getAttribute('title') || '广告标题';
      const description = this.getAttribute('description') || '广告描述内容...';
      const buttonLink = this.getAttribute('button-link') || '#'; // 默认链接
  
      // Shadow DOM 的内部 HTML 和 CSS
      this.shadowRoot.innerHTML = `
          <style>
            :host { /* :host 选择器指向自定义元素本身 */
              display: block; /* 使自定义元素表现得像块级元素 */
              position: fixed; /* 固定定位，相对于视口 */
              z-index: 1000; /* 确保在顶层 */
              cursor: pointer; /* 鼠标悬停时显示指针 */
              transition: transform 0.3s ease; /* 添加一点悬停效果 */
              /* 设置默认位置，防止属性无效或未设置 */
              bottom: 20px;
              right: 20px;
            }
  
            :host(:hover) {
              transform: scale(1.02); /* 鼠标悬停时轻微放大 */
            }
  
            .ad-container {
              background-color:rgb(90, 90, 90); /* 主题色 */
              color: white; /* 文字颜色 */
              padding: 15px 20px;
              border-radius: 8px; /* 圆角 */
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* 阴影 */
              max-width: 280px; /* 限制最大宽度 */
              font-family: inherit; /* 继承页面字体 */
            }
  
            .title {
              font-size: 1.1em;
              font-weight: bold;
              margin: 0 0 8px 0;
              word-break: break-word; /* 防止长标题溢出 */
            }
  
            .description {
              font-size: 0.9em;
              line-height: 1.4;
              margin: 0;
              word-break: break-word; /* 防止长描述溢出 */
            }
  
            /* 根据 position 属性设置具体位置，覆盖默认值 */
            :host([position="top-left"]) {
              top: 20px;
              left: 20px;
              bottom: auto; /* 移除默认的 bottom */
              right: auto; /* 移除默认的 right */
            }
            :host([position="top-right"]) {
              top: 20px;
              right: 20px;
              bottom: auto;
              left: auto;
            }
            :host([position="bottom-left"]) {
              bottom: 20px;
              left: 20px;
              top: auto;
              right: auto;
            }
            :host([position="bottom-right"]) {
               bottom: 20px;
               right: 20px;
               top: auto;
               left: auto;
            }
  
          </style>
          <div class="ad-container">
            <div class="title">${title}</div>
            <div class="description">${description}</div>
          </div>
        `;
        // 注意：这里没有直接的按钮元素，整个组件区域都可以点击
    }
  
    setupClickListener() {
      const buttonLink = this.getAttribute('button-link');
      if (buttonLink && buttonLink !== '#') { // 只有当 button-link 存在且不是 '#' 时才添加点击事件
          this.addEventListener('click', () => {
            console.log(`点击广告，即将跳转至: ${buttonLink}`);
            // 在新标签页中打开链接
            window.open(buttonLink, '_blank');
            // 如果想在当前窗口跳转，可以使用：
            // window.location.href = buttonLink;
          });
      } else {
          // 如果没有提供有效链接，可以移除点击指针样式，或者不绑定点击事件
          this.style.cursor = 'default'; // 移除点击样式
      }
    }
  }
  
  // 定义自定义元素标签名
  customElements.define('simple-ad', SimpleAd);